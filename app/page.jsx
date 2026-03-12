"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiDownload } from "react-icons/fi";
import Social from "@/components/Social";

const MatrixEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const columns = Math.floor(width / 20);
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const charArray = characters.split("");
    const drops = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#00FF41"; // Classic Matrix Green
      ctx.font = "15pt monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-50 pointer-events-none opacity-40" />;
};

const TrackVisualization = () => {
  const [pos, setPos] = useState(0);
  const trackWidth = 40;
  const path = [
    { x: 5, y: 2 }, { x: 10, y: 1 }, { x: 20, y: 1 }, { x: 30, y: 2 },
    { x: 35, y: 5 }, { x: 30, y: 8 }, { x: 20, y: 9 }, { x: 10, y: 8 },
    { x: 5, y: 5 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPos((prev) => (prev + 1) % path.length);
    }, 200);
    return () => clearInterval(interval);
  }, [path.length]);

  const grid = Array(11).fill(0).map(() => Array(trackWidth).fill(" "));
  
  // Draw Track Border
  for(let i=0; i<trackWidth; i++) { grid[0][i] = "-"; grid[10][i] = "-"; }
  for(let i=0; i<11; i++) { grid[i][0] = "|"; grid[i][trackWidth-1] = "|"; }

  // Draw Path
  path.forEach((p, i) => {
    if (grid[p.y] && grid[p.y][p.x]) grid[p.y][p.x] = ".";
  });

  // Draw Vehicle
  const v = path[pos];
  if (grid[v.y] && grid[v.y][v.x]) grid[v.y][v.x] = "V";

  return (
    <div className="font-mono text-accent leading-none mt-4">
      <div className="mb-2 uppercase text-[10px] opacity-50">Path Planning Simulation // Algorithm: Pure Pursuit</div>
      {grid.map((row, i) => (
        <div key={i}>{row.join("")}</div>
      ))}
      <div className="mt-2 text-[10px] uppercase">
        Vehicle_Coord: X:{v.x} Y:{v.y} | Velocity: 5.2m/s | Status: Tracking
      </div>
    </div>
  );
};

const Home = () => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [pendingAction, setPendingAction] = useState(null);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [isTrackMode, setIsTrackMode] = useState(false);
  const [githubStats, setGithubStats] = useState({ repos: 0, commits: 0, prs: 0 });
  
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  const allCommands = [
    "help", "about", "skills", "projects", "expertise", "resume", "contact", 
    "neofetch", "clear", "ls", "fetch_cv", "expertise.sh", "projects.sh", 
    "resume.sh", "contact.sh", "fetch_cv.bin", "matrix", "sudo", "socials", "whoami", "htop", "nvidia-smi",
    "telemetry", "lidar", "track"
  ];

  const sectionOverviews = {
    expertise: "Specialized in Autonomous Systems, AI Research, and Robotics. Proficient in CARLA/Gazebo simulation, ROS2 coordination, and deep learning for perception.",
    projects: "Showcasing SkySim (LLM Drone Control), Hydrakon (Autonomous Racing), LiZIP (Neural LiDAR Compression), and more.",
    resume: "Academic background: BSc CS w/ AI @ Heriot-Watt (GPA 4.0). Experience: NYU CAIR, AimBeyonD, Atlas Racing FS.",
    contact: "Available for research collaborations and industrial opportunities. Reach out via Email, LinkedIn, or the system bridge.",
  };

  const commands = {
    help: "Available commands: [about, skills, projects, expertise, resume, contact, neofetch, clear, ls, fetch_cv, matrix, sudo, socials, whoami, htop, nvidia-smi, telemetry, lidar, track]",
    about: "Identity: Aditya Shibu. BSc (Hons) CS w/ AI @ Heriot-Watt (GPA 4.0). Specializing in Autonomous Systems.",
    skills: "Core: PyTorch, ROS2, CUDA, TensorRT, C++, Python, Next.js, TailwindCSS.",
    ls: "expertise.sh  projects.sh  resume.sh  contact.sh  fetch_cv.bin  socials.sh",
    fetch_cv: "Initiating download... [https://github.com/adityashibu/CV/releases/latest/download/cv.pdf]",
    sudo: "Error: User is not in the sudoers file. This incident will be reported.",
    whoami: "aditya@portfolio: Autonomous Systems Developer // AI Researcher // Human",
    socials: "/home/aditya/socials\n├── github.lnk -> https://github.com/adityashibu\n├── linkedin.lnk -> https://linkedin.com/in/adityashibu\n├── instagram.lnk -> https://instagram.com/adityashibuu/\n└── email.bin -> adityashibuonline@gmail.com",
    telemetry: "Fetching live telemetry from Atlas-Racing-FS node...\n[LIVE] Velocity: 42.5 km/h\n[LIVE] Steering: 2.4°\n[LIVE] LiDAR: Scanning (1024 pts/sec)\n[LIVE] Perception: Detected 4 objects (cones)\n[LIVE] GPS: 25.09°N, 55.15°E",
    lidar: `
    .      .      .      .      .
      .   .   .   .   .   .   .
        .  .  .  .  .  .  .
          . . . . . . .
            . . . . .
              [CAR]
            . . . . .
          . . . . . . .
        .  .  .  .  .  .  .
      .   .   .   .   .   .   .
    .      .      .      .      .
    [LiDAR Sweep Complete: Frame 0xAF23]
    `,
    track: "Initializing Path Planning Visualization Node...",
  };

  const getNvidiaSmiOutput = () => {
    const date = new Date().toLocaleString();
    return `
${date}
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 999.99                 Driver Version: 999.99         CUDA Version: 15.0     |
+-----------------------------------------+------------------------+----------------------+
| GPU  Name                  Driver-Model | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |               MIG M. |
|=========================================+========================+======================|
|   0  NVIDIA GeForce RTX 6090 Ti  WDDM   |   00000000:01:00.0  On |                  N/A |
|  0%   32C    P0             45W /  650W |   24576MiB /  49152MiB |      0%      Default |
|                                         |                        |                  N/A |
+-----------------------------------------+------------------------+----------------------+

+-----------------------------------------------------------------------------------------+
| Processes:                                                                              |
|  GPU   GI   CI              PID   Type   Process name                        GPU Memory |
|        ID   ID                                                               Usage      |
|=========================================================================================|
|    0   N/A  N/A            1337    C+G   ./brain --train --gpu                2048MiB   |
|    0   N/A  N/A            2048    C+G   ./ros2_humble --launch                256MiB   |
|    0   N/A  N/A            4096    C+G   ./nextjs_v14 --serve                  128MiB   |
+-----------------------------------------------------------------------------------------+
`;
  };

  const getHtopOutput = () => {
    const createBar = (val, max) => {
      const percent = Math.min(Math.floor((val / max) * 100), 100);
      const filled = Math.floor(percent / 5);
      const empty = 20 - filled;
      return `[${"|".repeat(filled)}${" ".repeat(empty)}] ${percent}%`;
    };

    return `
  1  ${createBar(85, 100)}  Tasks: ${githubStats.repos} repos
  2  ${createBar(100, 100)}  Load average: 4.0 4.0 4.0
  Mem${createBar(4.0, 4.0)}  Uptime: 3 years
  Swp${createBar(githubStats.commits, 1000)}  GitHub Commits: ${githubStats.commits}

  PID USER      PRI  NI  VIRT   RES   SHR S[%CPU] %MEM     TIME+  Command
 1337 aditya     20   0  1.2G  4.0G  512M S  85.4  4.0   12:42.40  ./brain --train --gpu
 2048 aditya     20   0  512M  2.0G  256M S  45.1  2.0   08:15.20  ./ros2_humble --launch
 4096 aditya     20   0  256M  1.0G  128M S  12.8  1.0   04:30.10  ./nextjs_v14 --serve
    `;
  };

  const neofetchData = `
ADITYA SHIBU // PORTFOLIO_V1.0.0
--------------------------------
    _    ____  ___ _____ __   __ _      ____  _   _ ___ ____  _   _ 
   / \\  |  _ \\|_ _|_   _\\ \\ / / / \\    / ___|| | | |_ _| __ )| | | |
  / _ \\ | | | || |  | |  \\ V / / _ \\   \\___ \\| |_| || ||  _ \\| | | |
 / ___ \\| |_| || |  | |   | | / ___ \\   ___) |  _  || || |_) | |_| |
/_/   \\_\\____/|___| |_|   |_|/_/   \\_\\ |____/|_| |_|___|____/ \\___/ 

\nIDENTITY: Aditya Shibu
STATUS:   Autonomous Systems Developer
ACADEMIC: BSc (Hons) Computer Science w/ AI (4.0/4.0)
EXPERTISE: Autonomous Systems | Perception | Robotics
CURRENT:  Research @ NYU CAIR | Head of Driverless @ Atlas Racing
CORE_LIBS: PyTorch, ROS2, CUDA, TensorRT, C++
RESEARCH: LiZIP (Neural LiDAR Compression @ NeurIPS Track)
AWARDS:   1st Place FS-AI UK | FS-AI Real World AI Award
  `;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setHistory([]);
    
    // Fetch GitHub Stats
    const fetchStats = async () => {
      try {
        const userRes = await fetch("https://api.github.com/users/adityashibu");
        const userData = await userRes.json();
        
        const reposRes = await fetch("https://api.github.com/users/adityashibu/repos?per_page=100");
        const reposData = await reposRes.json();
        
        let totalCommits = 0;
        // Optimization: Only fetch first 5 repos for commits to avoid rate limit issues in demo
        for (let i = 0; i < Math.min(reposData.length, 5); i++) {
          const cRes = await fetch(`https://api.github.com/repos/adityashibu/${reposData[i].name}/commits?per_page=1`);
          const link = cRes.headers.get("Link");
          if (link) {
            const match = link.match(/&page=(\d+)>; rel="last"/);
            if (match) totalCommits += parseInt(match[1]);
          }
        }

        setGithubStats({
          repos: userData.public_repos || 0,
          commits: totalCommits || 450, // Fallback if calculation fails
          prs: 12
        });
      } catch (e) {
        console.error("Stats fetch failed", e);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (input.trim() === "" || pendingAction) {
      setSuggestion("");
      return;
    }

    const match = allCommands.find(cmd => cmd.startsWith(input.toLowerCase()));
    setSuggestion(match ? match.slice(input.length) : "");
  }, [input, pendingAction]);

  const handleCommand = (e) => {
    if (e.key === "Tab" || e.key === "ArrowRight") {
      if (suggestion) {
        e.preventDefault();
        setInput(input + suggestion);
        setSuggestion("");
      }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
        }
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }

    if (e.key === "Enter") {
      let cmd = input.trim().toLowerCase();
      const rawInput = input;
      
      if (cmd !== "") {
        setCommandHistory(prev => [...prev, rawInput]);
      }
      
      setInput("");
      setSuggestion("");
      setHistoryIndex(-1);

      // Support 'cd' and './' prefixes
      if (cmd.startsWith("cd ")) {
        cmd = cmd.replace("cd ", "").trim();
      } else if (cmd.startsWith("./")) {
        cmd = cmd.replace("./", "").trim();
      }

      // Flush history for every new command
      let newHistory = [{ type: "input", content: rawInput }];
      setIsTrackMode(false); // Exit track mode on any new command

      if (pendingAction) {
        if (cmd === "y" || cmd === "yes") {
          if (pendingAction.path === "INTERNAL_TRACK") {
            setIsTrackMode(true);
            newHistory.push({ type: "output", content: "Launching Path Planning Visualization..." });
            setPendingAction(null);
          } else {
            newHistory.push({ type: "output", content: `Redirecting to ${pendingAction.path}...` });
            setHistory(newHistory);
            setTimeout(() => router.push(pendingAction.path), 500);
            return;
          }
        } else {
          newHistory.push({ type: "output", content: "Action cancelled." });
          setPendingAction(null);
        }
        setHistory(newHistory);
        return;
      }

      if (cmd === "clear") {
        setHistory([]);
      } else if (cmd === "matrix") {
        setIsMatrixMode(!isMatrixMode);
        newHistory.push({ type: "output", content: isMatrixMode ? "Exiting Matrix mode..." : "Entering Matrix mode..." });
        setHistory(newHistory);
      } else if (cmd === "htop") {
        newHistory.push({ type: "output", content: getHtopOutput() });
        setHistory(newHistory);
      } else if (cmd === "nvidia-smi") {
        if (window.innerWidth < 768) {
          newHistory.push({ type: "output", content: "nvidia-smi: Error: Display width insufficient for table rendering. Please use a desktop device." });
        } else {
          newHistory.push({ type: "output", content: getNvidiaSmiOutput() });
        }
        setHistory(newHistory);
      } else if (cmd === "track" || cmd === "track --visualize") {
        if (cmd === "track --visualize") {
          setIsTrackMode(!isTrackMode);
          newHistory.push({ type: "output", content: isTrackMode ? "Closing visualization..." : "Launching Path Planning Visualization..." });
          setHistory(newHistory);
        } else {
          newHistory.push({ type: "output", content: "Autonomous Racing Path Planning node. Visualizes Pure Pursuit trajectory tracking." });
          newHistory.push({ type: "output", content: `Do you want to visualize? [y/n]` });
          setHistory(newHistory);
          setPendingAction({ section: "track", path: "INTERNAL_TRACK" });
        }
      } else if (cmd === "neofetch") {
        // Reset command area
        setHistory([]);
      } else if (cmd === "help") {
        let helpText = commands.help;
        if (window.innerWidth < 768) {
          helpText = helpText.replace(", nvidia-smi", "");
        }
        newHistory.push({ type: "output", content: helpText });
        setHistory(newHistory);
      } else if (["expertise", "expertise.sh", "projects", "projects.sh", "resume", "resume.sh", "contact", "contact.sh"].includes(cmd)) {
        const section = cmd.split(".")[0];
        const path = section === "expertise" ? "/experience" : `/${section}`;
        newHistory.push({ type: "output", content: sectionOverviews[section] });
        newHistory.push({ type: "output", content: `Do you want to see more? [y/n]` });
        setHistory(newHistory);
        setPendingAction({ section, path });
      } else if (cmd === "fetch_cv" || cmd === "fetch_cv.bin") {
        newHistory.push({ type: "output", content: commands.fetch_cv });
        setHistory(newHistory);
        window.open("https://github.com/adityashibu/CV/releases/latest/download/cv.pdf", "_blank");
      } else if (commands[cmd]) {
        newHistory.push({ type: "output", content: commands[cmd] });
        setHistory(newHistory);
      } else if (cmd !== "") {
        newHistory.push({ type: "output", content: `Command not found: ${cmd}. Type "help" for a list of commands.` });
        setHistory(newHistory);
      } else {
        setHistory(newHistory);
      }
    }
  };

  const renderContent = (content, isBanner = false) => {
    return content.split("\n").map((line, lineIdx) => {
      if (line.trim() === "" && lineIdx > 0) {
        return <div key={lineIdx} className="h-4"></div>;
      }

      // 1. Detect Stat Lines (e.g., "IDENTITY: Aditya Shibu")
      // Logic: Starts with uppercase words followed by a colon
      const statMatch = line.match(/^([A-Z_\\s]+):(.*)$/);
      
      if (statMatch && !line.includes("http") && !line.includes("---")) {
        const [, key, value] = statMatch;
        return (
          <div key={lineIdx} className="flex flex-row items-start leading-relaxed">
            <span className="text-accent font-bold min-w-[110px] shrink-0">{key}:</span>
            <span className="text-white/80 font-normal">{value.trim()}</span>
          </div>
        );
      }

      // 2. Handle ASCII Banner & Tables
      const isLargeBanner = isBanner && line.includes("_") && line.length > 50;
      const isMobileTitle = isBanner && line.includes("ADITYA SHIBU //");
      
      return (
        <div 
          key={lineIdx} 
          className={`
            ${isLargeBanner ? "text-accent font-bold leading-none hidden md:block" : ""}
            ${isMobileTitle ? "text-accent font-bold block mb-2" : ""}
            ${!isLargeBanner && !isMobileTitle && !statMatch ? "text-white/80 font-normal" : ""}
          `}
        >
          {line}
        </div>
      );
    });
  };

  return (
    <section 
      className="h-full font-primary overflow-hidden flex flex-col relative" 
      onClick={() => inputRef.current?.focus()}
    >
      {isMatrixMode && <MatrixEffect />}
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar px-4 md:px-8 py-2 text-xs md:text-sm lg:text-base whitespace-pre-wrap z-10"
      >
        {/* Persistent Header: ASCII & Identity */}
        <div className="mb-6">
          {renderContent(neofetchData, true)}
        </div>

        {/* Dynamic Interactive Body */}
        <div className="mb-4">
          {isTrackMode ? (
            <TrackVisualization />
          ) : history.length === 0 ? (
            <div className="text-white/80 animate-pulse">
              Welcome to Aditya's Portfolio Terminal. Type "help" to see available commands.
            </div>
          ) : (
            history.map((entry, i) => (
              <div key={i} className="mb-2">
                {entry.type === "input" ? (
                  <div className="flex gap-2 text-white">
                    <span className="text-accent font-bold">aditya@hw-node-01:~$</span>
                    <span>{entry.content}</span>
                  </div>
                ) : (
                  <div className="text-white/80">
                    {renderContent(entry.content)}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Input Prompt */}
        <div className="flex gap-2 items-center relative">
          <span className="text-accent font-bold">
            {pendingAction ? `confirm_${pendingAction.section}? [y/n]:` : "aditya@hw-node-01:~$"}
          </span>
          <div className="flex-1 relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="bg-transparent border-none outline-none w-full text-white z-10"
              autoFocus
            />
            {suggestion && (
              <span className="absolute left-0 text-white/20 pointer-events-none z-0">
                {input}{suggestion}
              </span>
            )}
          </div>
        </div>
      </div>


      {/* Quick Links Footer */}
      <div className="px-4 md:px-8 py-4 border-t border-accent/10 flex flex-wrap items-center gap-6 bg-[#0a0a0b]/50 z-10">
        <div className="flex gap-2">
           {[...Array(6)].map((_, i) => (
             <div key={i} className={`w-4 h-3 bg-white/${(i+1)*10} border border-white/5`}></div>
           ))}
           <div className="w-4 h-3 bg-accent"></div>
        </div>
        <Social containerStyles="flex gap-4" iconStyles="text-lg text-accent hover:text-white transition-all" />
        <span className="text-[10px] text-white/20 uppercase tracking-widest hidden md:inline">
          Terminal Session Active // {isMounted ? new Date().toLocaleTimeString() : ""}
        </span>
      </div>
    </section>
  );
};

export default Home;
