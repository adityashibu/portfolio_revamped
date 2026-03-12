"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootMessages = [
  "INITIALIZING SYSTEM KERNEL V1.0.0...",
  "LOADING HARDWARE ABSTRACTION LAYER...",
  "CONNECTING TO ROBOSENSE HELIOS 16 LIDAR... [ OK ]",
  "SYNCING ZED2I STEREO CAMERAS... [ OK ]",
  "CALIBRATING IMU/GNSS SENSORS... [ OK ]",
  "LOADING NEURAL PERCEPTION ENGINE (LIZIP)... [ OK ]",
  "ESTABLISHING SLM CONTROL LINK (SKYSIM)... [ OK ]",
  "PERCEPTION SYSTEMS: NOMINAL",
  "AUTONOMOUS SYSTEMS: READY",
  "WELCOME USER.",
];

const BootupScreen = ({ onComplete }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    if (currentMessageIndex < bootMessages.length) {
      const timeout = setTimeout(() => {
        setCurrentMessageIndex((prev) => prev + 1);
      }, 250); // Faster messages
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setShowLogo(true), 500);
    }
  }, [currentMessageIndex]);

  useEffect(() => {
    if (showLogo) {
      setTimeout(() => onComplete(), 3000); // Hold logo for 3s
    }
  }, [showLogo, onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center font-primary p-4">
      <AnimatePresence mode="wait">
        {!showLogo ? (
          <motion.div
            key="messages"
            className="w-full max-w-[600px] text-left space-y-1"
            exit={{ opacity: 0 }}
          >
            {bootMessages.slice(0, currentMessageIndex).map((msg, i) => (
              <div key={i} className="text-accent text-xs md:text-sm tracking-widest">
                <span className="mr-2">{'>'}</span>
                {msg}
              </div>
            ))}
            {currentMessageIndex < bootMessages.length && (
              <motion.div
                animate={{ opacity: [0, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="inline-block w-2 h-4 bg-accent align-middle ml-1"
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="logo"
            className="flex items-center justify-center text-6xl md:text-8xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.span
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-accent"
            >
              [
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-white mx-2"
            >
              A
            </motion.span>
            <motion.span
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-accent"
            >
              ]
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BootupScreen;
