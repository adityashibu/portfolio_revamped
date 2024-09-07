"use client";

/* eslint-disable react/no-unescaped-entities */
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import Typed from "typed.js";

// components
import Social from "@/components/Social";
import Photo from "@/components/Photo";

const Home = () => {
  const typedElementRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: ['Student Developer', 'Python Developer', 'Frontend Developer', 'AI/ML Enthusiast'],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 300,
      loop: true,
    };

    const typed = new Typed(typedElementRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">


          {/* Text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span ref={typedElementRef} className="text-[18px] md:text-[24px]"></span>
            <h1 className="h1 mb-6">
              Hello, I'm <br />
              <span className="text-accent">Aditya S</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80 text-sm md:text:mg lg:text-lg">
              I'm a third year Computer Science student with a passion for the fields of AI and ML. Currently delving into Frontend Development
            </p>

            {/* Button and Socials */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button variant="outline" size="lg" className="uppercase flex items-center gap-2">
                <span>Download CV</span>
                <FiDownload className="text-xl" />
              </Button>
              <div className="mb-8 xl:mb-0">
                <Social containerStyles="flex gap-6" iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500" />
              </div>
            </div>
          </div>

          {/* Photo */}
          <div className="order-1 xl:order-none mb-12 xl:mb-0 mt-12 xl:mt-0">
            <Photo />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home