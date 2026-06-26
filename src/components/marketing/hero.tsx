"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; 
// 1. Import localFont
import localFont from 'next/font/local';

// 2. Point directly to the public folder using a forward slash
const companyFont = localFont({ 
  src: '/Spaceage.ttf', 
  display: 'swap',
});

export default function Hero() {
  return (
    <section id="home" className="min-h-[85vh] flex items-center justify-center px-6 relative bg-background transition-colors duration-500">
      
      <div className="max-w-5xl mx-auto text-center z-10 relative mt-10">
        
        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <div className="p-4 bg-background rounded-3xl border border-border/50 shadow-xl">
            <Image 
              src="/logo.png" 
              alt="Gestalt Technologies Logo" 
              width={220} 
              height={220} 
              className="w-48 md:w-56 h-auto object-contain drop-shadow-sm transition-all"
              priority 
            />
          </div>
        </motion.div>

        {/* BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          Services & Solutions
        </motion.div>
        
        {/* HEADLINE WITH CUSTOM FONT */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-foreground drop-shadow-sm">
          <br className="hidden md:block" />
          {/* THE FIX: Added style={companyFont.style} and font-normal */}
          <span 
            style={companyFont.style}
            className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-500 to-purple-600 font-normal tracking-normal"
          >
            Gestalt Technologies
          </span>
        </h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed bg-muted/50 p-5 rounded-2xl border border-border/50"
        >
          Your chaos, our code. From enterprise SaaS to workflow consulting, we serve up structurally perfect digital solutions on a single platter. Cause we understand Market Psychology.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="#what">
              <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:opacity-90 px-8 font-bold shadow-lg shadow-primary/30 border-none transition-all">
                Explore Ecosystem <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {/* Now points to the services section */}
            <Link href="#services">
              <Button size="lg" variant="outline" className="rounded-full border-border bg-background text-foreground hover:bg-muted px-8 font-bold transition-all">
                Services Overview
              </Button>
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}