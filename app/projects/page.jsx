"use client";

import { animate, motion } from "framer-motion";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";

import { FaReact, FaNodeJs } from "react-icons/fa";
import { FiFramer } from "react-icons/fi";
import {
  SiNextdotjs,
  SiVite,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
} from "react-icons/si";
import { TbBrandThreejs } from "react-icons/tb";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import WorkSliderBtns from "@/components/WorkSliderBtns";

const projects = [
  {
    num: "01",
    category: "Frontend",
    title: "Personal Portfolio",
    description:
      "The current website you're viewing, built using React, TailwindCSS, Framer and NextJS",
    tech: [
      { name: "React", icon: <FaReact /> },
      { name: "Framer", icon: <FiFramer /> },
      { name: "TailwindCSS", icon: <SiTailwindcss /> },
      { name: "NextJS", icon: <SiNextdotjs /> },
    ],
    image: "/assets/work/thumb1.png",
    live: "https://adityashibu.vercel.app",
    github: "https://github.com/adityashibu/portfolio_revamped",
  },
  {
    num: "02",
    category: "Frontend",
    title: "Personal Portfolio V1",
    description:
      "My previous personal portfolio, built using React, TailwindCSS, Framer, ThreeJS and Vite",
    tech: [
      { name: "React", icon: <FaReact /> },
      { name: "Framer", icon: <FiFramer /> },
      { name: "TailwindCSS", icon: <SiTailwindcss /> },
      { name: "ThreeJS", icon: <TbBrandThreejs /> },
      { name: "Vite", icon: <SiVite /> },
    ],
    image: "/assets/work/thumb2.png",
    live: "https://adityashibu-portfolio-v1.vercel.app/",
    github: "https://github.com/adityashibu/personalportfolio",
  },
  {
    num: "03",
    category: "Fullstack",
    title: "Heriot Hive Chat App",
    description:
      "A full stack chat app built using React, TailwindCSS, NodeJS, ExpressJS, MongoDB and Socket.io, in essence using MERN stack",
    tech: [
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "ExpressJS", icon: <SiExpress /> },
      { name: "React", icon: <FaReact /> },
      { name: "NodeJS", icon: <FaNodeJs /> },
      { name: "TailwindCSS", icon: <SiTailwindcss /> },
      { name: "Vite", icon: <SiVite /> },
    ],
    image: "/assets/work/thumb1.png",
    live: "https://adityashibu.vercel.app",
    github: "https://github.com/adityashibu/portfolio_revamped",
  },
];

const Projects = () => {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    // get current slide index
    const currentIndex = swiper.activeIndex;

    // update project state based on current slide index
    setProject(projects[currentIndex]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              {/* Project Number */}
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>

              {/* Project Category */}
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {project.category} Project
              </h2>

              {/* Project Description */}
              <p className="text-white/60">{project.description}</p>

              {/* Project Tech Stack */}
              <ul className="flex gap-4 pt-2">
                {project.tech.map((tech, index) => {
                  return (
                    <div key={index} className="">
                      <li className="flex flex-col xl:flex-row text-accent">
                        {tech.name}
                        {index !== project.tech.length - 1 && ","}
                      </li>
                    </div>
                  );
                })}
              </ul>

              {/* Border */}
              <div className="border border-white/20"></div>

              {/* Buttons */}
              <div className="flex items-center gap-4">
                {/* Live Project */}
                <Link href={project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-accent transform transition-transform duration-300 group-hover:rotate-45" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live Project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>

                {/* GitHub Project */}
                <Link href={project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-white text-3xl group group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github Repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                      {/* Overlay */}
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/20 z-10"></div>

                      {/* Image */}
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          fill
                          className="object-cover"
                          alt=""
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              {/* Pagination */}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all "
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
