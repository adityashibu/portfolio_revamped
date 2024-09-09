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
  return <div>projects page</div>;
};

export default Projects;
