"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
          <div className="xl:h-[52%] order-2 xl:order-none">
            <form className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
              <h3 className="text-4xl text-accent">Let&#39;s get in touch</h3>
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
                  placeholder="+971543547825"
                  className="rounded-xl"
                />
              </div>

              {/* Textarea */}
              <Textarea
                className="h-[200px] rounded-xl outline-white/10"
                placeholder="Type your message here."
              />

              {/* Submit Button */}
              <Button type="submit" size="md" className="max-w-40">
                Submit
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => {
                return (
                  <li key={index} className="flex items-center gap-6">
                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-full flex items-center justify-center">
                      <div className="text-[28px]">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60">{item.title}</p>
                      <h3 className="text-xl">{item.description}</h3>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
