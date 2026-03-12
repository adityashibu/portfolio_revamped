"use client";

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
} from "react-icons/si";
import { FaCode } from "react-icons/fa";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

import { motion } from "framer-motion";

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
    "I am a Computer Science student at Heriot-Watt University specializing in AI. My work focuses on Autonomous Systems, Robotics, and Deep Learning, with experience spanning across NYU CAIR, Atlas Racing, and several research labs.",
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
      company: "NYU CAIR",
      position: "Research Collaborator",
      duration: "Dec 2025 - Present",
    },
    {
      company: "AimBeyonD",
      position: "Research Intern",
      duration: "Nov 2025 - Present",
    },
    {
      company: "Atlas Racing FS",
      position: "Head of Driverless",
      duration: "May 2025 - Present",
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
      icon: <SiPytorch />,
      name: "PyTorch",
    },
    {
      icon: <FaCode />,
      name: "ROS 2",
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
      degree: "BSc (Hons) CS with AI (GPA 4.0/4.0)",
      duration: "Sept 2023 - Present",
    },
    {
      institution: "Indian High School, Dubai",
      degree: "High School",
      duration: "April 2011 - March 2023",
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
