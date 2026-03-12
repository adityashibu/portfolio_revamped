"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const RetroModeContext = createContext();

export const ACCENT_COLORS = [
  { name: "Amber", primary: "#FFB000", hover: "#FFD700" },
  { name: "Matrix", primary: "#00FF41", hover: "#008F11" },
  { name: "Cyan", primary: "#00c5ff", hover: "#0099cc" },
  { name: "Rose", primary: "#ff007f", hover: "#cc005c" },
  { name: "Violet", primary: "#bc13fe", hover: "#8b00ff" },
];

export const RetroModeProvider = ({ children }) => {
  const [isRetro, setIsRetro] = useState(false);
  const [accentColor, setAccentColor] = useState(ACCENT_COLORS[0]);

  useEffect(() => {
    const savedRetro = localStorage.getItem("retro-mode");
    if (savedRetro !== null) {
      setIsRetro(JSON.parse(savedRetro));
    }

    const savedColor = localStorage.getItem("accent-color");
    if (savedColor !== null) {
      const color = JSON.parse(savedColor);
      setAccentColor(color);
      updateRootStyles(color);
    }
  }, []);

  const updateRootStyles = (color) => {
    document.documentElement.style.setProperty("--accent", color.primary);
    document.documentElement.style.setProperty("--accent-hover", color.hover);
  };

  const toggleRetro = () => {
    const newValue = !isRetro;
    setIsRetro(newValue);
    localStorage.setItem("retro-mode", JSON.stringify(newValue));
  };

  const changeAccentColor = (color) => {
    setAccentColor(color);
    updateRootStyles(color);
    localStorage.setItem("accent-color", JSON.stringify(color));
  };

  return (
    <RetroModeContext.Provider value={{ isRetro, toggleRetro, accentColor, changeAccentColor }}>
      <div className={isRetro ? "retro-flicker" : ""}>
        {isRetro && <div className="scanlines" />}
        {children}
      </div>
    </RetroModeContext.Provider>
  );
};

export const useRetroMode = () => {
  const context = useContext(RetroModeContext);
  if (context === undefined) {
    throw new Error("useRetroMode must be used within a RetroModeProvider");
  }
  return context;
};
