"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "+971 54 354 7825",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "as2397@hw.ac.uk",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    description: "Dubai, UAE",
  },
];

const Contact = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          {/* Form */}
          <div className="xl:h-[54%] order-2 xl:order-none">
            <form className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
              <h3 className="text-4xl text-accent">Let's get in touch</h3>
              <p className="text-white/60 ">
                Fill in the below form or contact me directly using any of the
                provided information, I would love to get in touch
              </p>
              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="firstname"
                  placeholder="John"
                  className="rounded-xl"
                />
                <Input
                  type="lastname"
                  placeholder="Doe"
                  className="rounded-xl"
                />
                <Input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  className="rounded-xl"
                />
                <Input
                  type="phone"
                  placeholder="+971 54 354 7825"
                  className="rounded-xl"
                />
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            info
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
