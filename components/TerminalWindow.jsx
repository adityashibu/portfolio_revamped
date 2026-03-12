"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

const TerminalWindow = ({ children }) => {
  const pathname = usePathname();
  const title = `adityashibu@portfolio: ${pathname === "/" ? "~" : pathname.replace("/", "~/")}`;

  return (
    <div className="h-screen w-screen flex items-center justify-center p-0 md:p-2 bg-black overflow-hidden selection:bg-accent selection:text-primary">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[1400px] h-full max-h-screen md:max-h-[95vh] flex flex-col border border-accent/30 rounded-none md:rounded-lg shadow-2xl terminal-border-glow bg-primary relative overflow-hidden"
      >
        
        {/* Title Bar */}
        <div className="h-10 bg-[#1a1a1e] border-b border-accent/20 flex items-center px-4 justify-between rounded-t-lg">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="text-white/40 font-primary text-xs tracking-wider absolute left-1/2 -translate-x-1/2">
            {title}
          </div>
          <div className="flex gap-4 text-white/20 font-primary text-[10px] hidden md:flex">
             <span>TERMINAL_V1.0.4</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8 custom-scrollbar">
          {children}
        </div>

        {/* Bottom Bar / Status */}
        <div className="h-6 bg-[#1a1a1e] border-t border-accent/10 flex items-center px-4 justify-between text-[10px] font-primary text-accent/40 uppercase tracking-widest rounded-b-lg">
          <div className="flex gap-4">
             <span>READY</span>
             <span>UTF-8</span>
          </div>
          <div className="flex gap-4">
             <span>Ln 1, Col 1</span>
             <span>(C) 2026 ADITYA_SHIBU</span>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default TerminalWindow;
