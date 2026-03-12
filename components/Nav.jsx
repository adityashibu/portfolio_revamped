"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Links = [
    {
        name: 'home',
        path: '/'
    },
    {
        name: "expertise",
        path: '/experience'
    },
    {
        name: "resume",
        path: '/resume'
    },
    {
        name: "projects",
        path: '/projects'
    },
    {
        name: "contact",
        path: '/contact'
    }
];

const Nav = () => {
    const pathname = usePathname();

    return (
        <nav className="flex gap-4">
            {Links.map((link, index) => {
                const isActive = link.path === pathname;
                return (
                    <Link 
                        href={link.path} 
                        key={index} 
                        className={`
                            ${isActive ? "bg-accent text-primary" : "text-accent border border-accent/30 hover:bg-accent/10"} 
                            px-3 py-1 text-xs md:text-sm font-primary transition-all flex items-center gap-1 uppercase tracking-tighter
                        `}
                    >
                        ./{link.name}{isActive ? "" : ".sh"}
                    </Link>
                );
            })}
        </nav>
    );
};

export default Nav