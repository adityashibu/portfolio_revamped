"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const info = [
  { icon: <FaPhoneAlt />, title: "Phone", description: "+971 54 354 7825" },
  { icon: <FaEnvelope />, title: "Email", description: "adityashibuonline@gmail.com" },
  { icon: <FaMapMarkerAlt />, title: "Address", description: "Dubai, UAE" },
];

const Contact = () => {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_lryu59d",
        "template_rqtjcnn",
        form.current,
        "rungmrWT6EQ0rOGAx"
      )
      .then(
        () => {
          setSent(true);
          setLoading(false);
          form.current.reset();
        },                                                    
        (error) => {
          console.error("FAILED...", error);
          setLoading(false);
        }                                                 
      );
  };                                                                                                                                                        

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: "easeIn" } }}
      className="h-full flex items-center py-2 overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Form */}
          <div className="xl:w-[65%] order-2 xl:order-none">
            <form
              ref={form}
              onSubmit={sendEmail}
              className="flex flex-col gap-3 p-6 bg-[#121216] border border-accent/20 h-full"
            >
              <h3 className="text-2xl text-accent font-primary uppercase tracking-tighter">
                {'>'} ESTABLISH_CONTACT
              </h3>
              <p className="text-white/60 font-primary text-xs">
                Enter telemetry data to initiate communication.
              </p>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="flex flex-col gap-1">
                  <span className="text-accent text-[9px] font-primary px-1">FIRST_NAME</span>
                  <Input name="firstname" type="text" placeholder="John" required className="h-8 text-xs px-3" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-accent text-[9px] font-primary px-1">LAST_NAME</span>
                  <Input name="lastname" type="text" placeholder="Doe" required className="h-8 text-xs px-3" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-accent text-[9px] font-primary px-1">EMAIL_ADDR</span>
                  <Input name="email" type="email" placeholder="johndoe@gmail.com" required className="h-8 text-xs px-3" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-accent text-[9px] font-primary px-1">TEL_NUM</span>
                  <Input name="phone" type="tel" placeholder="+971543547825" className="h-8 text-xs px-3" />
                </div>
              </div>

              {/* Textarea */}
              <div className="flex flex-col gap-1 mt-1">
                <span className="text-accent text-[9px] font-primary px-1">MESSAGE_DATA</span>
                <Textarea name="message" className="h-24 text-xs px-3 py-2 outline-white/10" placeholder="Type your message here." required />
              </div>

              {/* Submit Button */}
              <Button type="submit" size="sm" className="max-w-32 font-primary text-[10px] mt-2 py-1" disabled={loading}>
                {loading ? "SENDING..." : sent ? "SENT!" : "INITIATE"}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex-1 flex flex-col justify-center gap-6 order-1 xl:order-none">
            <ul className="flex flex-col gap-4">
              {info.map((item, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#121216] border border-accent/20 text-accent flex items-center justify-center">
                    <div className="text-lg">{item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white/40 text-[9px] uppercase font-primary">{item.title}</p>
                    <h3 className="text-xs text-white/90 font-primary">{item.description}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
