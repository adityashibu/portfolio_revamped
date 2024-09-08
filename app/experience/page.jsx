"use client";

import { BsArrowDownRight } from 'react-icons/bs';
import Link from 'next/link';

import { motion } from 'framer-motion';

const experiences = [
    {
        num: '01',
        title: 'React Frontend Developer',
        description: 'I am a React Web Developer with around 5 months of experience. I have worked on multiple projects including corporate as well as personal projects and have a good understanding of React and its ecosystem.',
    },
    {
        num: '02',
        title: 'Python Developer',
        description: 'I have worked on multiple projects with around 2 years of experience using Python and its libraries. I have experience in web scraping, data analysis, and automation using Python.',
    },
    {
        num: '03',
        title: 'Embedded Systems and IoT',
        description: 'I have worked on and developed multiple projects using Raspberry Pi and C, with hands-on experience in IoT and Embedded Systems. I have developed multiple projects including a arcade game using RPi 3 Model B and C.',
    },
    {
        num: '04',
        title: 'Photography and Videography',
        description: 'I have been doing photography and videography for around 3 years, working on multiple projects including coverage of academic as well as external events. and have a good understanding of camera settings and editing.',
    }
]

const Experience = () => {
    return (
        <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' } }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
                >
                    {experiences.map((experience, index) => {
                        return (
                            <div key={index} className="flex-1 flex flex-col justify-center gap-6 group">
                                {/* Top */}
                                <div className="w-full flex justify-between items-center">
                                    <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                                        {experience.num}
                                    </div>
                                    <Link href="/projects" className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45">
                                        <BsArrowDownRight className="text-primary text-3xl group-hover:text-white" />
                                    </Link>
                                </div>

                                {/* Title */}
                                <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">{experience.title}</h2>
                                {/* Description */}
                                <p>{experience.description}</p>

                                {/* Border */}
                                <div className="border-b-2 border-accent/50 w-full">

                                </div>
                            </div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}

export default Experience