/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">


          {/* Text */}
          <div className="text-center xl:text-left">
            <span className="text-xl">Student Developer</span>
            <h1 className="h1 mb-6">
              Hello, I'm <br />
              <span className="text-accent">Aditya S</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80 ">
              I'm a third year Computer Science student with a passion for the fields of AI and ML. Currently delving into Frontend Development
            </p>
          </div>

          {/* Button and Socials */}
          <Button variant="outline" size="lg" className="uppercase flex items-center gap-2">
            <span>Download CV</span>
            <FiDownload className="text-xl" />
          </Button>

          {/* Photo */}
          <div>Photo</div>
        </div>
      </div>
    </section>
  )
}

export default Home