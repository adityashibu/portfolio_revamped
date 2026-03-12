import Link from "next/link";
import { Button } from "./ui/button";

// Components
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import RetroModeToggle from "./RetroModeToggle";

const Header = () => {
  return (
    <header className="mb-6 border-b border-accent/10 pb-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Prompt Style Logo */}
        <Link href="/" className="group">
          <div className="flex items-center gap-2 font-primary text-xl">
             <span className="text-accent">{'>'}</span>
             <span className="text-white group-hover:text-accent transition-all">[ADITYA_SHIBU]</span>
             <span className="w-2 h-5 bg-accent animate-pulse"></span>
          </div>
        </Link>

        {/* Desktop Nav as Tabs */}
        <div className="hidden xl:flex items-center gap-2">
          <Nav />
          <div className="ml-4 h-8 w-[1px] bg-accent/20 mr-2"></div>
          <RetroModeToggle />
        </div>

        {/* Mobile Nav */}
        <div className="xl:hidden flex items-center justify-between w-full">
          <RetroModeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
