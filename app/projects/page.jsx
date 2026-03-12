"use client";

import { motion } from "framer-motion";
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

import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import WorkSliderBtns from "@/components/WorkSliderBtns";
import { Button } from "@/components/ui/button";

const projects = [

  {
    category: "Autonomous Systems / LLMs",
    title: "SkySim",
    description:
      "ROS 2 Jazzy based simulation environment on Gazebo for Natural Language Control of Drone Swarms using Large Language Models.",
    tech: [
      { name: "ROS2 Jazzy" },
      { name: "Gazebo" },
      { name: "Python" },
      { name: "LLMs" },
    ],
    image: "/assets/projects/thumb1.jpeg",
    live: "",
    github: "https://github.com/adityashibu",
  },
  {
    category: "Autonomous Racing",
    title: "Hydrakon V1 and V2",
    description:
      "Worked with a team of 9 to build an autonomous racing car (Simulation and Hardware Integration) for Formula Student UK.",
    tech: [
      { name: "CARLA" },
      { name: "YOLO" },
      { name: "ROS2" },
      { name: "Cartographer" },
      { name: "C++" },
    ],
    image: "/assets/projects/FS-AI-Carla.jpeg",
    live: "",
    github: "https://github.com/Atlas-Racing",
  },
  {
    category: "Deep Learning",
    title: "LiZIP",
    description:
      "A Deep Learning Model for Compression of LiDAR point clouds. Ongoing research project targeting NeurIPS.",
    tech: [
      { name: "PyTorch" },
      { name: "LiDAR" },
      { name: "C++" },
      { name: "AVX2" },
    ],
    image: "/assets/projects/spaceDebris.jpeg",
    live: "",
    github: "https://github.com/adityashibu",
  },
  {
    category: "Fullstack / IoT",
    title: "PowerHouse",
    description:
      "Developed a fully-fledged all-in-one smart home application with simulations of smart home devices to control devices over Wi-Fi.",
    tech: [
      { name: "ReactJS" },
      { name: "Firebase" },
      { name: "Python" },
      { name: "FastAPI" },
    ],
    image: "/assets/projects/powerhouse.jpeg",
    live: "",
    github: "https://github.com/PowerHouse-Project",
  },
  {
    category: "LLMs / RAG",
    title: "Local RAG",
    description:
      "Developed a fully local RAG with Ollama and LangChain, allowing users to query their own documents using LLMs without any internet connection.",
    tech: [
      { name: "Ollama" },
      { name: "Langchain" },
      { name: "ChromaDB" },
      { name: "Python" },
    ],
    image: "/assets/projects/localRAG.jpeg",
    live: "https://vaultapp.streamlit.app/",
    github: "https://github.com/jonathanjthomas/GDG-RAG-Demo",
  },
  {
    category: "YOLO and CV",
    title: "Space Debris Classification",
    description:
      "Developed a space debris classification model using YOLO, enhancing training data by combining datasets from Roboflow for broader coverage.",
    tech: [
      { name: "YOLO" },
      { name: "OpenCV" },
      { name: "Python" },
    ],
    image: "/assets/projects/spaceDebrisRAW.jpg",
    live: "",
    github: "https://github.com/adityashibu/spaceDebrisDetection/",
  },
  {
    category: "Frontend",
    title: "Personal Portfolio",
    description:
      "The current website you're viewing, revamped with a terminal-themed UI, built using React, TailwindCSS, and NextJS.",
    tech: [
      { name: "React" },
      { name: "TailwindCSS" },
      { name: "NextJS" },
      { name: "Framer Motion" },
    ],
    image: "/assets/projects/thumb2.jpeg",
    live: "https://adityashibu.vercel.app",
    github: "https://github.com/adityashibu/portfolio_revamped",
  },
];


const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = projects[activeIndex];

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' },
      }}
      className="h-full flex flex-col justify-center py-4 xl:px-0 overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-8 items-center">
          {/* Project Info */}
          <div className="w-full xl:w-[45%] flex flex-col order-2 xl:order-none">
            <div className="flex flex-col gap-3">
              {/* Project Number */}
              <div className="text-xl font-bold font-primary text-accent">
                {'>'} PROJECT_ID: {String(activeIndex + 1).padStart(2, '0')}
              </div>

              {/* Project Title */}
              <h2 className="text-2xl font-bold leading-tight text-white uppercase tracking-tighter">
                {project.title}
              </h2>

              <div className="text-[10px] text-accent/60 font-primary uppercase tracking-widest bg-accent/5 px-2 py-0.5 w-max border border-accent/10">
                {project.category}
              </div>

              {/* Project Description */}
              <p className="text-white/70 text-[13px] leading-snug max-w-[400px]">{project.description}</p>
              {project.note && <strong className="text-red-500 text-[10px] uppercase">!! {project.note}</strong>}

              {/* Tech Stack */}
              <ul className="flex gap-1.5 pt-1 flex-wrap">
                {project.tech.map((tech, index) => (
                  <li
                    key={index}
                    className="text-[9px] bg-accent/10 text-accent px-1.5 py-0.5 border border-accent/20"
                  >
                    {tech.name}
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                {project.live && (
                  <Link href={project.live} target="_blank">
                    <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-primary transition-all text-[10px] font-primary px-2 py-1">
                      ./OPEN_LIVE
                    </Button>
                  </Link>
                )}

                <Link href={project.github} target="_blank">
                  <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-primary transition-all text-[10px] font-primary px-2 py-1">
                    ./GIT_REPO
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Project Image Slider */}
          <div className="w-full xl:w-[55%]">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              className="h-[300px] xl:h-[380px] mb-4"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => (
                <SwiperSlide key={index} className="w-full">
                  <div className="h-full relative group flex justify-center items-center bg-[#0d0d0f]">
                    {/* Overlay */}
                    <div className="absolute top-0 bottom-0 w-full h-full bg-black/40 z-10"></div>

                    {/* Image */}
                    <div className="relative w-full h-full">
                      <Image
                        src={project.image}
                        fill
                        className="object-cover border border-accent/10"
                        alt={project.title}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* Slider Buttons */}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-2 bottom-2 z-20"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-sm w-8 h-8 flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
