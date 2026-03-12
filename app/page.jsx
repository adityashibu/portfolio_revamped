"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiDownload } from "react-icons/fi";
import Social from "@/components/Social";

const Home = () => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [pendingAction, setPendingAction] = useState(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  const sectionOverviews = {
    expertise: "Specialized in Autonomous Systems, AI Research, and Robotics. Proficient in CARLA/Gazebo simulation, ROS2 coordination, and deep learning for perception.",
    projects: "Showcasing SkySim (LLM Drone Control), Hydrakon (Autonomous Racing), LiZIP (Neural LiDAR Compression), and more.",
    resume: "Academic background: BSc CS w/ AI @ Heriot-Watt (GPA 4.0). Experience: NYU CAIR, AimBeyonD, Atlas Racing FS.",
    contact: "Available for research collaborations and industrial opportunities. Reach out via Email, LinkedIn, or the system bridge.",
  };

  const commands = {
    help: "Available commands: [about, skills, projects, expertise, resume, contact, neofetch, clear, ls, fetch_cv]",
    about: "Identity: Aditya Shibu. BSc (Hons) CS w/ AI @ Heriot-Watt (GPA 4.0). Specializing in Autonomous Systems.",
    skills: "Core: PyTorch, ROS2, CUDA, TensorRT, C++, Python, Next.js, TailwindCSS.",
    ls: "expertise.sh  projects.sh  resume.sh  contact.sh  fetch_cv.bin",
    fetch_cv: "Initiating download... [https://github.com/adityashibu/CV/releases/latest/download/cv.pdf]",
  };

  const neofetchData = `
ADITYA SHIBU // PORTFOLIO_V1.0.4
--------------------------------
    _    ____  ___ _____ __   __ _      ____  _   _ ___ ____  _   _ 
   / \\  |  _ \\|_ _|_   _\\ \\ / / / \\    / ___|| | | |_ _| __ )| | | |
  / _ \\ | | | || |  | |   \\ V / / _ \\   \\___ \\| |_| || ||  _ \\| | | |
 / ___ \\| |_| || |  | |    | | / ___ \\   ___) |  _  || || |_) | |_| |
/_/   \\_\\____/|___| |_|    |_|/_/   \\_\\ |____/|_| |_|___|____/ \\___/ 

IDENTITY: Aditya Shibu
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
    setHistory([{ type: "output", content: neofetchData }, { type: "output", content: 'Welcome to Aditya\'s Portfolio Terminal. Type "help" to see available commands.' }]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: "input", content: input }];

      if (pendingAction) {
        if (cmd === "y" || cmd === "yes") {
          newHistory.push({ type: "output", content: `Redirecting to ${pendingAction.path}...` });
          setHistory(newHistory);
          setTimeout(() => router.push(pendingAction.path), 500);
        } else {
          newHistory.push({ type: "output", content: "Action cancelled." });
          setHistory(newHistory);
          setPendingAction(null);
        }
        setInput("");
        return;
      }

      if (cmd === "clear") {
        setHistory([]);
      } else if (cmd === "neofetch") {
        newHistory.push({ type: "output", content: neofetchData });
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

      setInput("");
    }
  };

  return (
    <section 
      className="h-full font-primary overflow-hidden flex flex-col" 
      onClick={() => inputRef.current?.focus()}
    >
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar px-4 md:px-8 py-2 text-xs md:text-sm lg:text-base whitespace-pre-wrap"
      >
        {history.map((entry, i) => (
          <div key={i} className="mb-1">
            {entry.type === "input" ? (
              <div className="flex gap-2">
                <span className="text-accent font-bold">aditya@hw-node-01:~$</span>
                <span>{entry.content}</span>
              </div>
            ) : (
              <div className={entry.content.includes("___") ? "text-accent font-bold leading-none hidden md:block" : entry.content.includes("ADITYA SHIBU //") ? "text-accent font-bold block" : "text-white/80"}>
                {entry.content}
              </div>
            )}
          </div>
        ))}

        <div className="flex gap-2 items-center">
          <span className="text-accent font-bold">
            {pendingAction ? `confirm_${pendingAction.section}? [y/n]:` : "aditya@hw-node-01:~$"}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="bg-transparent border-none outline-none flex-1 text-white"
            autoFocus
          />
        </div>
      </div>

      {/* Quick Links Footer */}
      <div className="px-4 md:px-8 py-4 border-t border-accent/10 flex flex-wrap items-center gap-6 bg-[#0a0a0b]/50">
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