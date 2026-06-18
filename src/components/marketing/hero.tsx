"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; 

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-primary/5 border border-primary/20 shadow-sm px-4 py-1.5 rounded-full mb-6"
        >
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Startup Stage 01</span>
        </motion.div>
        
        {/* HEADLINE */}
        <motion.h1 
          initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-black tracking-tight text-foreground mb-6 leading-[1.15]"
        >
          Gestalt Technologies <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 drop-shadow-sm">
            (Private) Limited
          </span>
        </motion.h1>

        {/* PARAGRAPH */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl font-medium text-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed bg-muted/50 p-5 rounded-2xl border border-border/50"
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