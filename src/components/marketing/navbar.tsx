"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../../../components/theme-toggle"; // Your correct path

export default function Navbar() {
  const links = [
    { name: "GTPL", href: "#home" },
    { name: "Services", href: "#services" }, // Fixed: Scroll to section, not new page
    { name: "Why", href: "#why" },
    { name: "What", href: "#what" },
    { name: "Where", href: "#where" },
    { name: "How", href: "#how" },
    { name: "Team", href: "#team" },
    { name: "Arcade", href: "#arcade" },
    { name: "Mr. Gestalt", href: "#pk-llm" },

  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="#home">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 cursor-pointer">
            <Image 
              src="/logo.png" 
              alt="Gestalt Technologies Logo" 
              width={180} 
              height={60} 
              className="h-12 w-auto object-contain transition-all"
              priority
            />
          </motion.div>
        </Link>
        
        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-bold tracking-wide text-foreground/80 hover:text-primary transition-colors duration-200 uppercase">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CONTROLS */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
            {/* Fixed: Wrapped in mailto link */}
            <a href="mailto:gestalttech.pltd@gmail.com"> 
              <Button className="rounded-full bg-primary text-primary-foreground hover:opacity-90 px-6 font-bold shadow-md transition-all">
                Contact Gestalt
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </header>
  );
}