"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const RetroModeContext = createContext();

export const RetroModeProvider = ({ children }) => {
  const [isRetro, setIsRetro] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("retro-mode");
    if (saved !== null) {
      setIsRetro(JSON.parse(saved));
    }
  }, []);

  const toggleRetro = () => {
    const newValue = !isRetro;
    setIsRetro(newValue);
    localStorage.setItem("retro-mode", JSON.stringify(newValue));
  };

  return (
    <RetroModeContext.Provider value={{ isRetro, toggleRetro }}>
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
