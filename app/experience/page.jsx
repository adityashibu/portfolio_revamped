"use client";

import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";

import { motion } from "framer-motion";

const experiences = [
  {
    num: "01",
    title: "Autonomous Systems",
    description:
      "Expertise in end-to-end simulation pipelines (CARLA, Gazebo), perception systems (YOLO, DBSCAN), and path planning (Pure Pursuit, MPC). Led Driverless development for 1st place award-winning teams.",
  },
  {
    num: "02",
    title: "AI & Deep Learning",
    description:
      "Advanced research in Conditional Imitation Learning (CILRS), LiDAR point cloud compression (LiZIP), and real-time Natural Language drone control using Small Language Models (SLMs).",
  },
  {
    num: "03",
    title: "Robotics & Perception",
    description:
      "Implementing ROS 2 Humble nodes for drone coordination, sensor fusion with ZED2i stereo cameras and RoboSense Helios LiDAR, and optimizing inference with TensorRT.",
  },
  {
    num: "04",
    title: "Quantum Computing",
    description:
      "Developing and optimizing machine learning models to run on quantum circuits for real-life prediction and analysis during industrial internship.",
  },
];

const Experience = () => {
  return (
    <section className="h-full flex flex-col justify-center py-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {experiences.map((experience, index) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-start gap-2 p-4 border border-accent/10 hover:border-accent/30 transition-all bg-[#0d0d0f]"
              >
                <div className="flex items-center gap-2">
                   <span className="text-accent font-bold text-sm">[0{index + 1}]</span>
                   <h2 className="text-lg font-bold text-white uppercase tracking-tight">
                     {experience.title}
                   </h2>
                </div>
                
                <p className="text-white/70 leading-snug text-[13px]">
                   {experience.description}
                </p>

                <div className="text-[9px] text-accent/40 font-primary mt-2">
                   STATUS: COMPLETED // SECTOR: {experience.title.split(' ')[0]}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
