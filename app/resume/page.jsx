"use client";

import { useEffect, useState } from "react";

import {
  SiTailwindcss,
  SiNextdotjs,
  SiVercel,
  SiPytorch,
  SiNumpy,
  SiPython,
  SiCplusplus,
  SiNvidia,
  SiReact,
  SiUbuntu,
  SiC,
  SiRos,
  SiOpencv,
  SiDocker,
} from "react-icons/si";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

import { motion } from "framer-motion";
import { fetchScholar } from "@/lib/scholar";

function calculateExperience(startDate) {
  const currentDate = new Date();
  const start = new Date(startDate);
  const timeDifference = currentDate - start;
  const yearsDifference = timeDifference / (1000 * 60 * 60 * 24 * 365.25);

  return Math.max(0, Math.floor(yearsDifference));
}

const startDate = "2023-09-01";
const experienceYears = calculateExperience(startDate);

// about data
const about = {
  title: "About Me",
  description:
    "I am a Computer Science with AI graduate from Heriot-Watt University with hands-on research experience across the full robotics stack: perception, planning, control, and edge deployment. I build real-time inference pipelines in C++, CUDA, and TensorRT on NVIDIA Jetson and L40s hardware, with two published conference papers and a journal preprint.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Aditya Shibu",
    },
    {
      fieldName: "Phone",
      fieldValue: "(+971) 54 354 7825",
    },
    {
      fieldName: "Experience",
      fieldValue: `Active Research & Industry`,
    },
    {
      fieldName: "Email",
      fieldValue: "adityashibuonline@gmail.com",
    },
    {
      fieldName: "Languages",
      fieldValue: "English",
    },
  ],
};

// experience data
const experience = {
  title: "My Work Experience",
  description:
    "Industrial and Research experience in Autonomous Systems and AI.",
  items: [
    {
      company: "CanopyAI",
      position: "Forward Deployed AI Engineer",
      duration: "Oct 2026 - Present",
    },
    {
      company: "LAIRR - Heriot-Watt",
      position: "Research Intern",
      duration: "Nov 2025 - Present",
    },
    {
      company: "AimBeyonD - Heriot-Watt",
      position: "Research Technician",
      duration: "Nov 2025 - Present",
    },
    {
      company: "NYU CAIR",
      position: "Research Collaborator",
      duration: "Dec 2025 - Feb 2026",
    },
    {
      company: "Atlas Racing FS",
      position: "Head of Driverless",
      duration: "May 2025 - July 2026",
    },
    {
      company: "Creed&Bear",
      position: "Quantum Computing Intern",
      duration: "Jan 2025 - June 2025",
    },
    {
      company: "Clarus24 IT Solutions",
      position: "Frontend Developer",
      duration: "Aug 2024 - Oct 2024",
    },
  ],
};

// skills data
const skills = {
  title: "My Tech Stack",
  description: "Advanced tools and frameworks for AI, Robotics, and Web.",
  skillList: [
    {
      icon: <SiPython />,
      name: "Python",
    },
    {
      icon: <SiCplusplus />,
      name: "C++",
    },
    {
      icon: <SiC />,
      name: "C",
    },
    {
      icon: <SiPytorch />,
      name: "PyTorch",
    },
    {
      icon: <SiRos />,
      name: "ROS 2",
    },
    {
      icon: <SiOpencv />,
      name: "OpenCV",
    },
    {
      icon: <SiNvidia />,
      name: "TensorRT / CUDA",
    },
    {
      icon: <SiUbuntu />,
      name: "Ubuntu/Linux",
    },
    {
      icon: <SiDocker />,
      name: "Docker",
    },
    {
      icon: <SiReact />,
      name: "React.js",
    },
    {
      icon: <SiNextdotjs />,
      name: "Next.js",
    },
    {
      icon: <SiTailwindcss />,
      name: "Tailwind CSS",
    },
    {
      icon: <SiNumpy />,
      name: "Numpy",
    },
  ],
};

// education data
const education = {
  title: "My Education",
  description:
    "Academic background focused on Computer Science and AI.",
  items: [
    {
      institution: "Heriot-Watt University",
      degree: "BSc (Hons) CS with AI (First Class, GPA 4.0/4.0)",
      duration: "Sept 2023 - July 2026",
    },
    {
      institution: "Indian High School, Dubai",
      degree: "High School",
      duration: "April 2011 - March 2023",
    },
  ],
};

// publications data
// s2Id is the Semantic Scholar paper id, used to match live citation counts
const publications = {
  title: "Research & Publications",
  items: [
    {
      title: "LiZIP: A Deep Learning Model for Compression of LiDAR Point Clouds",
      venue: "Heriot-Watt University // Target: RA-L",
      status: "Preprint",
      s2Id: "731f018567efd5e8dcd6ae83b4205e460520c860",
    },
    {
      title: "SkySim: Natural Language Control of Drone Swarms using LLMs",
      venue: "International Conference on Drones and Unmanned Systems (DAUS)",
      status: "Published // Feb 2026",
      s2Id: "229a6cbbaef6055c16aab81cb47231441807c280",
    },
    {
      title: "Simulating an Autonomous System in CARLA Using ROS2",
      venue: "Int. Conference on Signal Processing and Information Security (ICSPIS)",
      status: "Published // Nov 2025",
      s2Id: "9cc2a14b3fcd143e0ca7279663a0cf64e9df192e",
    },
  ],
};

// awards data
const awards = {
  title: "Awards & Certifications",
  description: "Recognitions and certifications in Robotics and Engineering.",
  items: [
    {
      title: "SIMULINK / MATLAB Onramp",
      issuer: "Mathworks",
      date: "March 2026",
    },
    {
      title: "Guide to Autonomous Robots",
      issuer: "NVIDIA",
      date: "March 2026",
    },
    {
      title: "FS-AI Overall Statics Winner",
      issuer: "IMechE",
      date: "July 2025",
    },
    {
      title: "FS-AI Real World Award",
      issuer: "IMechE",
      date: "July 2025",
    },
    {
      title: "Deep Learning Essentials",
      issuer: "IBM",
      date: "Jan 2025",
    },
    {
      title: "GitHub Foundations",
      issuer: "GitHub",
      date: "Dec 2024",
    },
    {
      title: "Foundational C#",
      issuer: "Microsoft",
      date: "June 2024",
    },
    {
      title: "CS50P - Python Intro",
      issuer: "Harvard/edX",
      date: "July 2023",
    },
  ],
};

const Resume = () => {
  // live research metrics from Semantic Scholar
  const [scholar, setScholar] = useState({ status: "loading", stats: null, papers: {} });

  useEffect(() => {
    const loadScholar = async () => {
      try {
        const data = await fetchScholar();

        const papers = {};
        data.papers.forEach((paper) => {
          papers[paper.id] = { citations: paper.citations, url: paper.url };
        });

        setScholar({ status: "live", stats: data.stats, papers });
      } catch (error) {
        console.error("Error fetching Semantic Scholar data:", error);
        setScholar({ status: "offline", stats: null, papers: {} });
      }
    };

    loadScholar();
  }, []);

  const scholarStats = [
    { label: "CITATIONS", value: scholar.stats?.citations },
    { label: "H_INDEX", value: scholar.stats?.hIndex },
    { label: "PAPERS", value: scholar.stats?.papers },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="h-full flex items-center justify-center py-2 overflow-hidden"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="about"
          className="flex flex-col xl:flex-row gap-8"
        >
          <TabsList className="flex flex-col w-full max-w-[200px] mx-auto xl:mx-0 gap-3">
            <TabsTrigger value="about" className="text-xs py-2">About</TabsTrigger>
            <TabsTrigger value="education" className="text-xs py-2">Education</TabsTrigger>
            <TabsTrigger value="experience" className="text-xs py-2">Experience</TabsTrigger>
            <TabsTrigger value="skills" className="text-xs py-2">Skills</TabsTrigger>
            <TabsTrigger value="research" className="text-xs py-2">Research</TabsTrigger>
            <TabsTrigger value="awards" className="text-xs py-2">Awards</TabsTrigger>
          </TabsList>

          {/* Content */}
          <div className="h-[450px] w-full">
            {/* About */}
            <TabsContent
              value="about"
              className="w-full text-left"
            >
              <div className="flex flex-col gap-4 border border-accent/20 p-4 bg-[#0d0d0f]">
                <h3 className="text-xl font-bold text-accent uppercase tracking-tighter">{'>'} BIOGRAPHICAL_DATA</h3>
                <p className="max-w-[800px] text-white/70 text-xs leading-relaxed">
                  {about.description}
                </p>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-2 gap-x-8 mt-2 border-t border-accent/10 pt-4">
                  {about.info.map((info, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 text-[11px]"
                      >
                        <span className="text-accent font-bold w-20">[{info.fieldName}]</span>
                        <span className="text-white/90">{info.fieldValue}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            {/* Education */}
            <TabsContent value="education" className="w-full h-full">
              <div className="flex flex-col gap-4 text-left h-full">
                <h3 className="text-xl font-bold text-accent uppercase tracking-tighter">{'>'} ACADEMIC_RECORDS</h3>
                <ScrollArea className="flex-1">
                  <ul className="flex flex-col gap-3 pr-4">
                    {education.items.map((education, index) => {
                      return (
                        <li
                          key={index}
                          className="border border-accent/10 p-4 bg-[#0d0d0f] hover:border-accent/40 transition-all"
                        >
                          <div className="flex justify-between items-start mb-1">
                             <span className="text-accent text-[10px] font-bold uppercase tracking-widest">
                               {education.duration}
                             </span>
                             <span className="text-[9px] text-white/20">LOG_ID: {index + 102}</span>
                          </div>
                          <h3 className="text-md font-bold text-white mb-0.5 uppercase">
                            {education.institution}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-accent text-xs">»</span>
                            <p className="text-white/60 text-[11px] font-primary">{education.degree}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* Experience */}
            <TabsContent value="experience" className="w-full h-full">
              <div className="flex flex-col gap-4 text-left h-full">
                <h3 className="text-xl font-bold text-accent uppercase tracking-tighter">{'>'} DEPLOYMENT_HISTORY</h3>
                <ScrollArea className="flex-1">
                  <ul className="flex flex-col gap-3 pr-4">
                    {experience.items.map((experience, index) => {
                      return (
                        <li
                          key={index}
                          className="border border-accent/10 p-4 bg-[#0d0d0f] hover:border-accent/40 transition-all"
                        >
                          <div className="flex justify-between items-start mb-1">
                             <span className="text-accent text-[10px] font-bold uppercase tracking-widest">
                               {experience.duration}
                             </span>
                             <span className="text-[9px] text-white/20">PROC_ID: {index + 201}</span>
                          </div>
                          <h3 className="text-md font-bold text-white mb-0.5 uppercase">
                            {experience.company}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-accent text-xs">»</span>
                            <p className="text-white/60 text-[11px] font-primary">
                              {experience.position}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* Skills */}
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-4 text-left h-full">
                <h3 className="text-xl font-bold text-accent uppercase tracking-tighter">{'>'} TECHNICAL_ASSETS</h3>

                <ScrollArea className="flex-1">
                  <ul className="grid grid-cols-2 sm:grid-cols-5 gap-3 pr-4">
                    {skills.skillList.map((skill, index) => (
                      <li key={index}>
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className="w-full h-20 border border-accent/10 bg-[#0d0d0f] flex flex-col justify-center items-center gap-1 group hover:border-accent/50 transition-all">
                              <div className="text-2xl group-hover:text-accent transition-all duration-300">
                                {skill.icon}
                              </div>
                              <span className="text-[9px] uppercase text-white/40 group-hover:text-accent font-primary">
                                {skill.name}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="capitalize text-[10px]">{skill.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* Research */}
            <TabsContent value="research" className="w-full h-full">
              <div className="flex flex-col gap-4 text-left h-full">
                <h3 className="text-xl font-bold text-accent uppercase tracking-tighter">{'>'} RESEARCH_LOG</h3>

                {/* Live Metrics */}
                <div className="border border-accent/20 p-3 bg-[#0d0d0f]">
                  <div className="flex justify-between items-center mb-2 text-[9px] uppercase tracking-widest">
                    <span className="text-white/40">SOURCE: Semantic Scholar</span>
                    <span className={scholar.status === "offline" ? "text-red-500" : "text-accent"}>
                      {scholar.status === "live" && "● LIVE"}
                      {scholar.status === "loading" && "FETCHING..."}
                      {scholar.status === "offline" && "!! FEED OFFLINE"}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {scholarStats.map((stat) => (
                      <div key={stat.label} className="flex flex-col border-l border-accent/30 pl-3">
                        <span className="text-2xl font-bold text-accent terminal-glow">
                          {stat.value ?? "--"}
                        </span>
                        <span className="text-[9px] text-white/50 tracking-widest">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Papers: compact grid of 3, sized to content so it fits without scrolling */}
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-0 overflow-y-auto md:overflow-visible">
                  {publications.items.map((paper, index) => {
                    const live = scholar.papers[paper.s2Id];
                    return (
                      <li
                        key={index}
                        className="flex flex-col justify-between gap-3 border border-accent/10 p-4 bg-[#0d0d0f] hover:border-accent/40 transition-all"
                      >
                        <div className="flex flex-col gap-3">
                          <span className="text-accent text-[10px] font-bold uppercase tracking-widest">
                            {paper.status}
                          </span>
                          <h3 className="text-sm font-bold text-white uppercase leading-snug">
                            {live?.url ? (
                              <a href={live.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-all">
                                {paper.title}
                              </a>
                            ) : (
                              paper.title
                            )}
                          </h3>
                          <div className="flex items-start gap-2">
                            <span className="text-accent text-xs">»</span>
                            <p className="text-white/60 text-[11px] font-primary leading-snug">
                              {paper.venue}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-end justify-between border-t border-accent/10 pt-3">
                          <span className="text-[9px] text-white/40 uppercase tracking-widest">CITED_BY</span>
                          <span className="text-3xl font-bold text-accent terminal-glow leading-none">
                            {live ? live.citations : "--"}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>

            {/* Awards */}
            <TabsContent value="awards" className="w-full h-full">
              <div className="flex flex-col gap-4 text-left h-full">
                <h3 className="text-xl font-bold text-accent uppercase tracking-tighter">{'>'} MERIT_BADGES</h3>
                <ScrollArea className="flex-1">
                  <ul className="flex flex-col gap-3 pr-4">
                    {awards.items.map((award, index) => {
                      return (
                        <li
                          key={index}
                          className="border border-accent/10 p-4 bg-[#0d0d0f] hover:border-accent/40 transition-all"
                        >
                          <div className="flex justify-between items-start mb-1">
                             <span className="text-accent text-[10px] font-bold uppercase tracking-widest">
                               {award.date}
                             </span>
                             <span className="text-[9px] text-white/20">VAL_ID: {index + 505}</span>
                          </div>
                          <h3 className="text-md font-bold text-white mb-0.5 uppercase leading-tight">
                            {award.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-accent text-xs">»</span>
                            <p className="text-white/60 text-[11px] font-primary">
                              {award.issuer}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
