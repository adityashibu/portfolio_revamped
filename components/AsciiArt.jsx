"use client";

import { useEffect, useRef, useState } from "react";

// Every scene renders into a fixed character grid
const COLS = 64;
const ROWS = 26;
const FPS = 20;
const TAU = Math.PI * 2;

// JetBrains Mono glyph width relative to font size, and the line height used below
const CHAR_W = 0.6;
const LINE_H = 1.2;

// ---------- grid helpers ----------

const grid = () => Array.from({ length: ROWS }, () => Array(COLS).fill(" "));

const put = (g, x, y, ch) => {
  x = Math.round(x);
  y = Math.round(y);
  if (x >= 0 && x < COLS && y >= 0 && y < ROWS) g[y][x] = ch;
};

const get = (g, x, y) => {
  x = Math.round(x);
  y = Math.round(y);
  return x >= 0 && x < COLS && y >= 0 && y < ROWS ? g[y][x] : null;
};

const text = (g, x, y, s) => {
  for (let i = 0; i < s.length; i++) put(g, x + i, y, s[i]);
};

const box = (g, x0, y0, x1, y1) => {
  for (let x = x0 + 1; x < x1; x++) {
    put(g, x, y0, "-");
    put(g, x, y1, "-");
  }
  for (let y = y0 + 1; y < y1; y++) {
    put(g, x0, y, "|");
    put(g, x1, y, "|");
  }
  [[x0, y0], [x1, y0], [x0, y1], [x1, y1]].forEach(([x, y]) => put(g, x, y, "+"));
};

const clear = (g, x0, y0, x1, y1) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) put(g, x, y, " ");
};

const line = (g, x0, y0, x1, y1, ch) => {
  x0 = Math.round(x0);
  y0 = Math.round(y0);
  x1 = Math.round(x1);
  y1 = Math.round(y1);
  const dx = Math.abs(x1 - x0);
  const dy = -Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  for (;;) {
    if (get(g, x0, y0) === " ") put(g, x0, y0, ch);
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      x0 += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y0 += sy;
    }
  }
};

const toString = (g) => g.map((row) => row.join("")).join("\n");

// deterministic pseudo random, so scenes look the same on every load
const rng = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
  return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
};

const hash = (n) => {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
};

const ease = (s) => (s < 0.5 ? 2 * s * s : 1 - Math.pow(-2 * s + 2, 2) / 2);

const typed = (s, t, cps) => s.slice(0, Math.max(0, Math.floor(t * cps)));

const blink = (t) => (Math.floor(t * 3) % 2 ? "_" : " ");

// sample n points evenly along the perimeter of a closed polygon
const polygonPoints = (verts, n) => {
  const segs = verts.map((v, i) => {
    const w = verts[(i + 1) % verts.length];
    return { v, w, len: Math.hypot(w[0] - v[0], w[1] - v[1]) };
  });
  const total = segs.reduce((acc, s) => acc + s.len, 0);
  return Array.from({ length: n }, (_, i) => {
    let d = (i / n) * total;
    for (const s of segs) {
      if (d <= s.len) {
        const k = d / s.len;
        return [s.v[0] + (s.w[0] - s.v[0]) * k, s.v[1] + (s.w[1] - s.v[1]) * k];
      }
      d -= s.len;
    }
    return segs[0].v;
  });
};

// ---------- scenes ----------

// LiZIP: rotating LiDAR scan with a sweeping beam
const LIDAR_POINTS = (() => {
  const pts = [];
  for (let r = 3; r <= 21; r += 1.5) {
    const n = Math.floor(r * 8);
    for (let k = 0; k < n; k++) {
      const a = (k / n) * TAU;
      pts.push([r * Math.cos(a), r * Math.sin(a), 0]);
    }
  }
  const objects = [
    [7, 4, 2, 4.5, 1.6],
    [-6, -8, 2, 4.5, 1.6],
    [-9, 6, 0.6, 0.6, 1.8],
    [12, -5, 1.5, 1.5, 2.5],
  ];
  for (const [bx, by, w, l, h] of objects) {
    for (let u = 0; u <= 1; u += 0.12) {
      for (let v = 0; v <= 1; v += 0.15) {
        pts.push(
          [bx - w / 2 + u * w, by - l / 2, v * h],
          [bx - w / 2 + u * w, by + l / 2, v * h],
          [bx - w / 2, by - l / 2 + u * l, v * h],
          [bx + w / 2, by - l / 2 + u * l, v * h]
        );
      }
    }
  }
  return pts;
})();

const lidar = (t) => {
  const g = grid();
  const zbuf = Array(ROWS * COLS).fill(Infinity);
  const ramp = ".:-=+*#%@";
  const yaw = t * 0.35;
  const pitch = 0.95;
  const D = 34;
  const f = 24;
  const cx = COLS / 2;
  const cy = ROWS / 2 + 1;
  const beam = (t * 2.2) % TAU;
  const [cy0, sy0, cp, sp] = [Math.cos(yaw), Math.sin(yaw), Math.cos(pitch), Math.sin(pitch)];

  const project = (x, y, z) => {
    const xr = x * cy0 - y * sy0;
    const yr = x * sy0 + y * cy0;
    const depth = D + yr * cp - z * sp;
    const up = yr * sp + z * cp;
    return [cx + ((xr * f) / depth) * 2, cy - (up * f) / depth, depth];
  };

  for (const [x, y, z] of LIDAR_POINTS) {
    const [sx, sy, depth] = project(x, y, z);
    const px = Math.round(sx);
    const py = Math.round(sy);
    if (px < 0 || px >= COLS || py < 2 || py >= ROWS - 2) continue;
    const i = py * COLS + px;
    if (depth >= zbuf[i]) continue;
    zbuf[i] = depth;

    let level = (1 - (depth - (D - 20)) / 40) * 5 + z * 1.2;
    const behindBeam = (beam - Math.atan2(y, x) + TAU * 2) % TAU;
    if (behindBeam < 0.7) level += 4 - behindBeam * 5;
    g[py][px] = ramp[Math.max(0, Math.min(ramp.length - 1, Math.floor(level)))];
  }

  const [ox, oy] = project(0, 0, 1);
  put(g, ox, oy, "@");

  const frame = String(Math.floor(t * 10) % 10000).padStart(4, "0");
  text(g, 0, 0, `LiZIP // nuScenes frame ${frame}`);
  text(g, COLS - 18, 0, "points: 34,720");
  text(g, 0, ROWS - 1, "payload 605 KB | err <0.017 mm | 16.7 ms/frame");
  return toString(g);
};

// SkySim: drone swarm morphing between formations on natural language commands
const SWARM = 20;
const STAR = Array.from({ length: 10 }, (_, i) => {
  const a = -Math.PI / 2 + (i / 10) * TAU;
  const r = i % 2 ? 0.42 : 1;
  return [Math.cos(a) * r, Math.sin(a) * r];
});
const FORMATIONS = [
  {
    cmd: "form a circle",
    pts: Array.from({ length: SWARM }, (_, i) => [
      Math.cos((i / SWARM) * TAU),
      Math.sin((i / SWARM) * TAU),
    ]),
  },
  {
    cmd: "arrange yourselves in a grid",
    pts: Array.from({ length: SWARM }, (_, i) => [(i % 5) / 2 - 1, Math.floor(i / 5) / 1.5 - 1]),
  },
  { cmd: "make a triangle", pts: polygonPoints([[0, -1], [1, 1], [-1, 1]], SWARM) },
  {
    cmd: "fly in a V formation",
    pts: Array.from({ length: SWARM }, (_, i) => {
      const k = Math.floor(i / 2) / (SWARM / 2);
      return [(i % 2 ? 1 : -1) * (1 - k), -1 + 2 * k];
    }),
  },
  { cmd: "now draw a star", pts: polygonPoints(STAR, SWARM) },
];

const swarm = (t) => {
  const g = grid();
  const hold = 3.5;
  const move = 1.5;
  const period = hold + move;

  const positionsAt = (time) => {
    const phase = ((time % (period * FORMATIONS.length)) + period * FORMATIONS.length) % (period * FORMATIONS.length);
    const k = Math.floor(phase / period);
    const local = phase % period;
    const from = FORMATIONS[k].pts;
    const to = FORMATIONS[(k + 1) % FORMATIONS.length].pts;
    const s = local < hold ? 0 : ease((local - hold) / move);
    return from.map(([x, y], i) => [
      32 + (x + (to[i][0] - x) * s) * 20 + Math.sin(time * 3 + i) * 0.3,
      12 + (y + (to[i][1] - y) * s) * 8 + Math.cos(time * 2.5 + i * 1.7) * 0.2,
    ]);
  };

  // OptiTrack arena corners
  for (const [x, y, dx, dy] of [[4, 2, 1, 1], [59, 2, -1, 1], [4, 22, 1, -1], [59, 22, -1, -1]]) {
    put(g, x, y, "+");
    put(g, x + dx, y, "-");
    put(g, x + dx * 2, y, "-");
    put(g, x, y + dy, "|");
  }

  for (const lag of [0.16, 0.08]) {
    positionsAt(t - lag).forEach(([x, y]) => put(g, x, y, "."));
  }
  positionsAt(t).forEach(([x, y]) => put(g, x, y, "x"));

  const phase = t % (period * FORMATIONS.length);
  const k = Math.floor(phase / period);
  const local = phase % period;
  const next = FORMATIONS[(k + 1) % FORMATIONS.length];
  let prompt;
  if (local < 1.5) prompt = `> ${FORMATIONS[k].cmd}   [done]`;
  else if (local < hold) prompt = `> ${typed(next.cmd, local - 1.5, 16)}${blink(t)}`;
  else prompt = `> ${next.cmd}   [APF path planning...]`;

  text(g, 0, 0, "SkySim // ROS 2 Jazzy + Gazebo");
  text(g, COLS - 18, 0, `drones: ${SWARM} online`);
  text(g, 0, ROWS - 1, prompt);
  return toString(g);
};

// FS-AI: pseudo-3D track with cone detections
const fsai = (t) => {
  const g = grid();
  const horizon = 8;
  const speed = 14;
  const curve = Math.sin(t * 0.35);
  const shift = curve * 10;

  const ridge = (x) =>
    Math.floor(4 + 1.6 * Math.sin((x + shift) * 0.15) + Math.sin((x + shift) * 0.37 + 1));
  for (let x = 0; x < COLS; x++) {
    const [l, m, r] = [ridge(x - 1), ridge(x), ridge(x + 1)];
    const ch = l > m && r > m ? "^" : r < m ? "/" : l < m ? "\\" : "_";
    put(g, x, m, ch);
    for (let y = m + 1; y < horizon; y++) if (hash(x * 31 + y) > 0.75) put(g, x, y, ".");
    put(g, x, horizon, "-");
  }

  const edgeAt = (y) => {
    const p = (y - horizon) / (ROWS - horizon);
    const center = 32 + curve * 24 * Math.pow(1 - p, 2);
    const half = 2 + p * 30;
    return { p, d: 4 / p, center, left: center - half, right: center + half };
  };

  let labelled = false;
  for (let y = horizon + 1; y < ROWS; y++) {
    const { p, d, center, left, right } = edgeAt(y);
    const band = Math.floor((d + t * speed) / 3) % 2;
    for (let x = 0; x < COLS; x++) {
      if (x < left || x > right) {
        if (band && hash(x * 13 + y) > 0.55) put(g, x, y, ".");
      } else if (Math.abs(x - center) < 0.5 && band) {
        put(g, x, y, ":");
      }
    }
    put(g, left, y, "/");
    put(g, right, y, "\\");

    const prev = edgeAt(y - 1);
    if (y > horizon + 1 && Math.floor((d + t * speed) / 6) !== Math.floor((prev.d + t * speed) / 6)) {
      const cone = p < 0.3 ? "." : p < 0.6 ? "^" : "A";
      for (const cxp of [left - 2, right + 2]) {
        put(g, cxp, y, cone);
        if (p > 0.35 && y < ROWS - 5) {
          put(g, cxp - 1, y, "[");
          put(g, cxp + 1, y, "]");
        }
      }
      if (!labelled && p > 0.35 && y < ROWS - 5) {
        text(g, right + 4, y, `cone .${90 + Math.floor(hash(Math.floor(t)) * 9)}`);
        labelled = true;
      }
    }
  }

  const carX = Math.round(27 - curve * 2);
  const car = ["  ____  ", "_/____\\_", "|o====o|", "(_)  (_)"];
  car.forEach((row, i) => {
    clear(g, carX, ROWS - 4 + i, carX + row.length - 1, ROWS - 4 + i);
    text(g, carX, ROWS - 4 + i, row);
  });

  clear(g, 0, 0, COLS - 1, 0);
  text(g, 0, 0, "FS-AI // ZED2i + Helios16 // YOLO+TRT 16ms");
  const steer = (-curve * 0.3).toFixed(2);
  text(g, COLS - 13, 1, `steer ${steer.startsWith("-") ? steer : "+" + steer}`);
  return toString(g);
};

// CogWaters: USV scanning debris on waves, with the Dubai skyline behind
const DEBRIS_ITEMS = [
  { x: 6, y: 14, ch: "[=]", vx: 1.2, conf: 94 },
  { x: 30, y: 19, ch: "o", vx: -0.8, conf: 88 },
  { x: 48, y: 12, ch: "%%", vx: 0.6, conf: 91 },
  { x: 18, y: 22, ch: "<=>", vx: 1.0, conf: 86 },
];

const cogwaters = (t) => {
  const g = grid();
  const horizon = 9;

  for (let x = 0; x < COLS; x++) {
    const h = Math.floor(hash(Math.floor(x / 3) + 7) * 3);
    for (let y = horizon - h; y < horizon; y++) put(g, x, y, x % 3 === 1 ? ":" : "|");
  }
  for (let y = 2; y < horizon; y++) put(g, 44, y, "|");
  put(g, 44, 1, ".");
  put(g, 43, 6, "/");
  put(g, 45, 6, "\\");

  const ramp = " .-~=";
  for (let y = horizon + 1; y < ROWS; y++) {
    const p = (y - horizon) / (ROWS - horizon);
    for (let x = 0; x < COLS; x++) {
      const h =
        Math.sin(x * (0.12 + p * 0.2) + t * 1.8 + y * 1.3) +
        0.5 * Math.sin(x * 0.11 - t * 1.1 + y * 2.1);
      put(g, x, y, ramp[Math.max(0, Math.min(4, Math.floor(((h + 1.5) / 3) * 5 * (0.6 + p * 0.4))))]);
    }
  }

  const bx = Math.floor((t * 4) % 90) - 13;
  ["  _|>_  ", "\\______/"].forEach((row, i) => text(g, bx, horizon - 1 + i, row));

  for (const item of DEBRIS_ITEMS) {
    const w = item.ch.length;
    const x = ((Math.round(item.x + t * item.vx) % (COLS + 10)) + COLS + 10) % (COLS + 10) - 5;
    const y = Math.round(item.y + Math.sin(t * 1.5 + item.x) * 0.6);
    clear(g, x - 1, y - 1, x + w, y + 1);
    box(g, x - 1, y - 1, x + w, y + 1);
    text(g, x, y, item.ch);
    text(g, x + w + 1, y - 1, `debris .${item.conf}`);
  }

  clear(g, 0, 0, COLS - 1, 0);
  text(g, 0, 0, "CogWaters USV // YOLOv8 + TensorRT");
  text(g, COLS - 13, 0, `objects: ${DEBRIS_ITEMS.length}`);
  return toString(g);
};

// KITE: Python being translated to a CUDA kernel
const PY_SRC = [
  "def add(a, b):",
  "    out = []",
  "    for i in range(len(a)):",
  "        out.append(a[i]+b[i])",
  "    return out",
];
const CU_SRC = [
  "__global__ void add(",
  "    const float* a,",
  "    const float* b,",
  "    float* out, int n) {",
  "  int i = blockIdx.x",
  "        * blockDim.x",
  "        + threadIdx.x;",
  "  if (i < n)",
  "    out[i] = a[i] + b[i];",
  "}",
];

const kite = (t) => {
  const g = grid();
  const cycle = 10;
  const local = t % cycle;

  box(g, 0, 1, 30, 20);
  box(g, 33, 1, 63, 20);
  text(g, 2, 1, " slow.py ");
  text(g, 35, 1, " kernel.cu ");
  PY_SRC.forEach((l, i) => text(g, 2, 3 + i, l));

  const total = CU_SRC.join("\n").length;
  const progress = Math.min(1, Math.max(0, (local - 1) / 6));
  let remaining = Math.floor(progress * total);
  let cursor = [35, 3];
  CU_SRC.forEach((l, i) => {
    const shown = l.slice(0, Math.max(0, remaining));
    text(g, 35, 3 + i, shown);
    if (remaining > 0) cursor = [35 + shown.length, 3 + i];
    remaining -= l.length + 1;
  });
  if (progress < 1) put(g, cursor[0], cursor[1], blink(t));

  // tokens flowing between the panes
  for (let k = 0; k < 3; k++) {
    if (progress > 0 && progress < 1) put(g, 31 + ((Math.floor(t * 6) + k) % 2), 6 + k * 3, ">");
  }

  const bar = 24;
  const filled = Math.round(progress * bar);
  text(g, 0, 22, `KITE  [${"#".repeat(filled)}${".".repeat(bar - filled)}] ${String(Math.round(progress * 100)).padStart(3)}%`);
  text(g, 0, 24, progress < 1 ? "> fine-tuned SLM generating kernel..." : "> compiled with nvcc | speedup: 38.4x");
  return toString(g);
};

// Space debris: shaded rotating Earth with tracked orbiting debris
const STARS = (() => {
  const r = rng(42);
  return Array.from({ length: 50 }, () => [Math.floor(r() * COLS), 1 + Math.floor(r() * (ROWS - 2))]);
})();
const ORBITS = (() => {
  const r = rng(7);
  return Array.from({ length: 14 }, () => {
    const a = 10 + r() * 5;
    return { a, inc: (r() - 0.5) * 1.2, phase: r() * TAU, speed: 0.6 * Math.pow(10 / a, 1.5) };
  });
})();

const spaceDebris = (t) => {
  const g = grid();
  const cx = 32;
  const cy = 13;
  const R = 8;

  STARS.forEach(([x, y], i) => put(g, x, y, hash(i + Math.floor(t * 2)) > 0.85 ? "+" : "."));

  const ramp = " .,:;=+*#%@";
  for (let y = cy - R; y <= cy + R; y++) {
    for (let x = cx - R * 2; x <= cx + R * 2; x++) {
      const dx = (x - cx) / (R * 2);
      const dy = (y - cy) / R;
      const r2 = dx * dx + dy * dy;
      if (r2 > 1) continue;
      const nz = Math.sqrt(1 - r2);
      const light = Math.max(0, -0.5 * dx - 0.4 * dy + 0.77 * nz);
      const lon = Math.atan2(dx, nz) + t * 0.25;
      const lat = Math.asin(dy);
      const land = Math.sin(lon * 2 + 1) * Math.cos(lat * 3) + 0.5 * Math.sin(lon * 5 + lat * 4) > 0.45;
      const idx = light < 0.08 ? 1 : Math.floor(light * 6) + (land ? 4 : 0);
      put(g, x, y, ramp[Math.min(ramp.length - 1, idx)]);
    }
  }

  const tilt = 0.35;
  const orbitPos = (o, theta) => {
    const ox = o.a * Math.cos(theta);
    const oz = o.a * Math.sin(theta);
    const y1 = -oz * Math.sin(o.inc);
    const z1 = oz * Math.cos(o.inc);
    const Y = y1 * Math.cos(tilt) - z1 * Math.sin(tilt);
    const depth = z1 * Math.cos(tilt) + y1 * Math.sin(tilt);
    const sx = cx + ox * 2;
    const sy = cy + Y * 0.8;
    const onDisk = Math.pow((sx - cx) / (R * 2), 2) + Math.pow((sy - cy) / R, 2) < 1;
    return { sx, sy, hidden: depth < 0 && onDisk };
  };

  ORBITS.forEach((o, i) => {
    const theta = o.phase + t * o.speed;
    for (let k = 3; k >= 1; k--) {
      const p = orbitPos(o, theta - k * 0.07);
      if (!p.hidden && get(g, p.sx, p.sy) === " ") put(g, p.sx, p.sy, ".");
    }
    const p = orbitPos(o, theta);
    if (p.hidden) return;
    put(g, p.sx, p.sy, i % 4 === 0 ? "#" : "*");
    if (i === 1) {
      put(g, p.sx - 1, p.sy, "[");
      put(g, p.sx + 1, p.sy, "]");
      text(g, Math.min(p.sx + 2, COLS - 11), p.sy - 1, `DEBRIS .${88 + Math.floor(hash(Math.floor(t)) * 10)}`);
    }
  });

  clear(g, 0, 0, COLS - 1, 0);
  text(g, 0, 0, "Space Debris // YOLO classification");
  text(g, COLS - 13, 0, `tracked: ${ORBITS.length}`);
  return toString(g);
};

// VaultApp: query point moving through an embedding space, retrieving neighbours
const EMBEDDINGS = (() => {
  const r = rng(3);
  return Array.from({ length: 40 }, () => [3 + r() * 57, 3 + r() * 16]);
})();
const QUERIES = [
  "what were the key findings in my notes?",
  "summarise the lecture on transformers",
  "which docs mention the budget?",
];

const rag = (t) => {
  const g = grid();
  box(g, 0, 1, 63, 21);
  text(g, 2, 1, " embedding space (chromadb) ");

  const pts = EMBEDDINGS.map(([x, y], i) => [
    x + Math.sin(t * 0.5 + i) * 1.2,
    y + Math.cos(t * 0.4 + i * 1.3) * 0.6,
  ]);
  const qx = 32 + Math.sin(t * 0.37) * 22;
  const qy = 11 + Math.sin(t * 0.53 + 1) * 6;

  const nearest = pts
    .map(([x, y], i) => ({ i, x, y, d: Math.hypot((x - qx) / 2, y - qy) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 3);

  pts.forEach(([x, y]) => put(g, x, y, "o"));
  nearest.forEach(({ x, y }) => line(g, qx, qy, x, y, "."));
  nearest.forEach(({ i, x, y }) => {
    put(g, x, y, "@");
    text(g, Math.min(x + 2, 55), y, `doc_${i}`);
  });
  put(g, qx, qy, "Q");

  const q = QUERIES[Math.floor(t / 6) % QUERIES.length];
  text(g, 0, 23, `> ${typed(q, t % 6, 14)}${blink(t)}`);
  text(g, 0, 25, `retrieved: ${nearest.map((n) => `doc_${n.i}`).join(" ")} | llama3 (offline)`);
  return toString(g);
};

// PowerHouse: smart home with lights toggling and a live device panel
const ROOMS = [
  { name: "living", x: 13, y: 14 },
  { name: "kitchen", x: 25, y: 14 },
  { name: "bedroom", x: 13, y: 18 },
  { name: "study", x: 25, y: 18 },
];

const powerhouse = (t) => {
  const g = grid();
  const apex = 21;
  const roofTop = 5;

  for (let k = 0; k < 6; k++) {
    const age = (t * 0.8 + k / 6) % 1;
    put(g, 28 + age * 4 + Math.sin(age * 6 + k) * 0.8, 4 - age * 4, age < 0.5 ? "o" : ".");
  }
  text(g, 27, 4, "___");
  for (let y = 5; y <= 7; y++) {
    put(g, 27, y, "|");
    put(g, 29, y, "|");
  }

  for (let r = 0; r < 7; r++) {
    const y = roofTop + r;
    clear(g, apex - 2 * r, y, apex + 2 * r, y);
    text(g, apex - 2 * r - 2, y, "//");
    text(g, apex + 2 * r + 1, y, "\\\\");
  }
  for (let x = apex - 11; x <= apex + 11; x++) put(g, x, roofTop + 6, "_");
  for (let y = roofTop + 7; y <= 22; y++) {
    put(g, 9, y, "|");
    put(g, 33, y, "|");
  }

  const states = ROOMS.map((_, i) => hash(i * 7 + Math.floor(t * 0.7 + i * 0.3)) > 0.4);
  ROOMS.forEach((room, i) => {
    box(g, room.x - 1, room.y - 1, room.x + 5, room.y + 2);
    for (let y = room.y; y <= room.y + 1; y++) {
      for (let x = room.x; x <= room.x + 4; x++) put(g, x, y, states[i] ? "#" : " ");
    }
  });
  for (let y = 19; y <= 22; y++) {
    put(g, 20, y, "|");
    put(g, 22, y, "|");
  }
  put(g, 21, 18, "_");
  for (let x = 0; x < COLS; x++) put(g, x, 23, "=");

  box(g, 39, 6, 63, 19);
  text(g, 41, 6, " PowerHouse hub ");
  ROOMS.forEach((room, i) => {
    text(g, 41, 8 + i, `${room.name.padEnd(9)}[${states[i] ? "ON " : "OFF"}]`);
  });
  text(g, 41, 13, `thermo   ${(22 + Math.sin(t * 0.3) * 0.8).toFixed(1)} C`);
  text(g, 41, 14, `energy   ${(1.2 + (t % 60) * 0.013).toFixed(2)} kWh`);
  text(g, 41, 16, `fastapi  ${Math.floor(t * 2) % 2 ? "o" : " "} live`);
  text(g, 41, 17, `devices  ${states.filter(Boolean).length}/4 active`);

  text(g, 0, 0, "PowerHouse // smart home simulation");
  return toString(g);
};

// Websites: browser window with a skeleton page loading in
const web = (t, { url = "localhost:3000", heading = "Hello, world" } = {}) => {
  const g = grid();
  box(g, 0, 0, 63, 25);
  text(g, 2, 1, "o o o");
  box(g, 9, 0, 61, 2);
  text(g, 11, 1, url.slice(0, 50));
  for (let x = 1; x < 63; x++) put(g, x, 3, "-");

  text(g, 3, 5, "[logo]");
  text(g, 32, 5, "home  about  work  contact");

  const local = t % 8;
  text(g, 3, 8, typed(heading, local, 12));
  if (local * 12 < heading.length + 4) put(g, 3 + Math.min(heading.length, Math.floor(local * 12)), 8, blink(t));
  text(g, 3, 10, "=".repeat(40));
  text(g, 3, 11, "=".repeat(28));
  text(g, 3, 13, "[ get in touch ]");

  [3, 23, 43].forEach((x, i) => {
    box(g, x, 15, x + 17, 22);
    for (let r = 0; r < 4; r++) text(g, x + 2, 17 + r, "-".repeat(13 - ((r + i) % 3) * 3));
  });

  const band = ((t * 30) % 120) - 30;
  for (let y = 9; y <= 22; y++) {
    for (let x = 1; x < 63; x++) {
      const ch = g[y][x];
      if ((ch === "=" || ch === "-") && Math.abs(x - band - (y - 9) * 0.5) < 3) g[y][x] = "#";
    }
  }

  const cx = 32 + Math.sin(t * 0.6) * 22;
  const cy = 14 + Math.sin(t * 0.9) * 6;
  put(g, cx, cy, "^");
  return toString(g);
};

// Heriot Hive: chat messages arriving in bubbles
const MESSAGES = [
  { u: "sam", m: "anyone finished the coursework?" },
  { u: "aditya", m: "yeah, pushing to the repo tonight", me: true },
  { u: "lina", m: "socket.io keeps disconnecting :(" },
  { u: "aditya", m: "check the cors origin on express", me: true },
  { u: "lina", m: "that fixed it, legend" },
  { u: "sam", m: "mongo atlas is up btw" },
  { u: "aditya", m: "shipping it", me: true },
];

const chat = (t) => {
  const g = grid();
  box(g, 0, 0, 63, 25);
  text(g, 2, 1, "# heriot-hive / general");
  text(g, 50, 1, "3 online");
  for (let x = 1; x < 63; x++) {
    put(g, x, 2, "-");
    put(g, x, 23, "-");
  }

  const step = 1.6;
  const cycle = t % (MESSAGES.length * step + 3);
  const shown = Math.min(MESSAGES.length, Math.floor(cycle / step) + 1);
  const visible = MESSAGES.slice(0, shown).slice(-6);

  let y = 22 - visible.length * 3;
  for (const msg of visible) {
    const w = Math.max(msg.m.length, msg.u.length + 3) + 3;
    const x0 = msg.me ? 61 - w : 2;
    box(g, x0, y, x0 + w, y + 2);
    text(g, x0 + 2, y, ` ${msg.u} `);
    text(g, x0 + 2, y + 1, msg.m);
    y += 3;
  }

  const next = MESSAGES[shown];
  if (next && !next.me) text(g, 2, 22, `${next.u} is typing${".".repeat(Math.floor(t * 3) % 4)}`);
  text(g, 2, 24, `> message #general${blink(t)}`);
  return toString(g);
};

export const scenes = { lidar, swarm, fsai, cogwaters, kite, spaceDebris, rag, powerhouse, web, chat };

// ---------- component ----------

const AsciiArt = ({ scene, options, active = true, label }) => {
  const wrapRef = useRef(null);
  const preRef = useRef(null);
  const [fontSize, setFontSize] = useState(10);

  // scale the font so the whole grid fits the container
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setFontSize(Math.min(width / (COLS * CHAR_W), height / (ROWS * LINE_H)));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const render = scenes[scene];
    const pre = preRef.current;
    if (!render || !pre) return;

    const draw = (t) => {
      pre.textContent = render(t, options);
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!active || reduceMotion) {
      draw(4);
      return;
    }

    let frame;
    let last = 0;
    const start = performance.now();
    const loop = (now) => {
      frame = requestAnimationFrame(loop);
      if (now - last < 1000 / FPS) return;
      last = now;
      draw((now - start) / 1000);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [scene, options, active]);

  return (
    <div ref={wrapRef} className="w-full h-full flex justify-center items-center overflow-hidden">
      <pre
        ref={preRef}
        role="img"
        aria-label={label}
        className="font-primary text-accent terminal-glow select-none m-0"
        style={{ fontSize: `${fontSize}px`, lineHeight: LINE_H }}
      />
    </div>
  );
};

export default AsciiArt;
