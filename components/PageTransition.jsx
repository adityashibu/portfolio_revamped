"use client";

import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PageTransition = ({ children }) => {
    const pathname = usePathname();
    return (
        <AnimatePresence>
            <div key={pathname}>
                {children}
            </div>
        </AnimatePresence>
    )
}

export default PageTransition