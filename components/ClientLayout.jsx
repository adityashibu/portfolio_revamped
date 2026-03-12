"use client";

import React, { useState, useEffect } from "react";
import { RetroModeProvider } from "@/components/RetroModeContext";
import TerminalWindow from "@/components/TerminalWindow";
import BootupScreen from "@/components/BootupScreen";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";

export default function ClientLayout({ children }) {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem("hasBooted");
    if (hasBooted) {
      setIsBooting(false);
    }
  }, []);

  const handleBootComplete = () => {
    setIsBooting(false);
    sessionStorage.setItem("hasBooted", "true");
  };

  return (
    <>
      {isBooting ? (
        <BootupScreen onComplete={handleBootComplete} />
      ) : (
        <RetroModeProvider>
          <TerminalWindow>
            <Header />
            <PageTransition>{children}</PageTransition>
          </TerminalWindow>
        </RetroModeProvider>
      )}
    </>
  );
}
