"use client";

import {
  FaHtml5,
  FaJs,
  FaCss3Alt,
  FaReact,
  FaPython,
  FaGitAlt,
  FaJava,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiVercel,
  SiNetlify,
  SiMongodb,
  SiExpress,
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
    "I am a third-year Computer Science student at Heriot-Watt University, Dubai Campus, with a specialization in Artificial Intelligence. My academic journey has fostered a deep interest in the fields of web development, AL and ML.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Aditya S",
    },
    {
      fieldName: "Phone",
      fieldValue: "(+971) 54 354 7825",
    },
    {
      fieldName: "Experience",
      fieldValue: `${experienceYears}+ years`,
    },
    {
      fieldName: "Email",
      fieldValue: "as2397@hw.ac.uk",
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
    "The below are my relevant work experiences in the field of web development and automation.",
  items: [
    {
      company: "ULink Technologies",
      position: "Founder and Developer",
      duration: "June 2023 - Present",
    },
    {
      company: "Clarus24",
      position: "Frontend Developer Intern",
      duration: "July 2024 - September 2024",
    },
    {
      company: "Fincasa Capital",
      position: "AI and Automation Intern",
      duration: "May 2024 - July 2024",
    },
    {
      company: "JP Morgan Chase",
      position: "SE Intern",
      duration: "June 2024 - June 2024",
    },
  ],
};

// skills data
const skills = {
  title: "My Skills",
  description: "Explore the technologies and tools I am proficient in.",
  skillList: [
    {
      icon: <FaHtml5 />,
      name: "HTML 5",
    },
    {
      icon: <FaCss3Alt />,
      name: "CSS 3",
    },
    {
      icon: <FaJs />,
      name: "Javascript",
    },
    {
      icon: <FaReact />,
      name: "React",
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
      icon: <FaNodeJs />,
      name: "Node.js",
    },
    {
      icon: <SiExpress />,
      name: "Express.js",
    },
    {
      icon: <SiMongodb />,
      name: "MongoDB",
    },
    {
      icon: <FaPython />,
      name: "Python",
    },
    {
      icon: <FaJava />,
      name: "Java",
    },
    {
      icon: <FaGitAlt />,
      name: "Git",
    },
    {
      icon: <SiVercel />,
      name: "Vercel",
    },
    {
      icon: <SiNetlify />,
      name: "Netlify",
    },
  ],
};

// education data
const education = {
  title: "My Education",
  description:
    "Learn more about my academic journey and the courses I have completed.",
  items: [
    {
      institution: "Heriot Watt University",
      degree: "BSc (Hons) CS",
      duration: "September 2023 - Present",
    },
    {
      institution: "freeCodeCamp & Microsoft",
      degree: "Foundational C#",
      duration: "June 2024 - July 2024",
    },
    {
      institution: "Harvard University",
      degree: "CS50P: Intro to Python",
      duration: "May 2023 - July 2023",
    },
    {
      institution: "Indian High School, Dubai",
      degree: "High School",
      duration: "April 2011 - March 2023",
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
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="about"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          {/* Content */}
          <div className="min-h-[70vh] w-full">
            {/* About */}
            <TabsContent
              value="about"
              className="w-full text-center xl:text-left"
            >
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {about.description}
                </p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                  {about.info.map((info, index) => {
                    return (
                      <li
                        key={index}
                        className="flex items-center justify-between xl:justify-start gap-x-12 sm:gap-4"
                      >
                        <span className="text-accent">{info.fieldName}</span>
                        <span className="text-xl">{info.fieldValue}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>

            {/* Education */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{education.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {education.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid gird-cols-1 lg:grid-cols-2 gap-[30px]">
                    {education.items.map((education, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">
                            {education.duration}
                          </span>
                          <h3 className="text-2xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                            {education.institution}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{education.degree}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* Experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {experience.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid gird-cols-1 lg:grid-cols-2 gap-[30px]">
                    {experience.items.map((experience, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">
                            {experience.duration}
                          </span>
                          <h3 className="text-2xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                            {experience.company}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">
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
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <div>
                  <h3 className="text-4xl font-bold">{skills.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                    {skills.description}
                  </p>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-4 xl:gap-[30px] gap-4">
                  {skills.skillList.map((skill, index) => {
                    return (
                      <li key={index}>
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                              <div className="text-7xl group-hover:text-accent transition-all duration-300">
                                {skill.icon}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="capitalize">{skill.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
