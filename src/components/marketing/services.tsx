"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { 
  Target, Zap, Brain, ShieldCheck, Calculator, FileText, 
  BookOpen, Users, BarChart3, Settings, Workflow, CheckCircle, 
  Globe, Briefcase 
} from "lucide-react";

// 1. ADD YOUR IMAGE PATHS HERE
const slides = [
  "/slide-1.jpg", 
  "/slide-2.jpg",
  "/slide-3.jpg",
  "/slide-4.jpg",
];

// 2. EDIT YOUR SERVICES HERE. Every card is now explicit.
const servicesData = [
  { id: "01", title: "Accounting", desc: "Professional bookkeeping services.", icon: <Calculator /> },
  { id: "02", title: "AR & AP", desc: "Accounts receivable & payable management.", icon: <BarChart3 /> },
  { id: "03", title: "Company Setup", desc: "End-to-end new company incorporation.", icon: <Briefcase /> },
  { id: "04", title: "Internal Audit", desc: "Rigorous internal audit processes.", icon: <ShieldCheck /> },
  { id: "05", title: "Clean Up", desc: "Expert accounting cleanup projects.", icon: <FileText /> },
  { id: "06", title: "Payroll", desc: "Automated payroll administration.", icon: <Users /> },
  { id: "07", title: "Closing", desc: "Monthly & annual closing cycles.", icon: <Target /> },
  { id: "08", title: "Virt. Accountant", desc: "Dedicated virtual accounting support.", icon: <BookOpen /> },
  { id: "09", title: "Virt. C-Suit", desc: "High-level controller oversight & services.", icon: <Brain /> },
  { id: "10", title: "Tax", desc: "Compliance & tax filings.", icon: <CheckCircle /> },
  { id: "11", title: "Backend Ops", desc: "Virtual backend management.", icon: <Settings /> },
  { id: "12", title: "SaaS Impl.", desc: "Strategic SaaS implementation.", icon: <Zap /> },
  { id: "13", title: "Workflow Auto.", desc: "Seamless workflow automation.", icon: <Workflow /> },
  { id: "14", title: "Compliance", desc: "Full operational compliance.", icon: <Globe /> },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Operational Ecosystem</h2>
          <p className="text-4xl md:text-5xl font-black text-foreground">Our Capabilities</p>
        </div>

        {/* 14 CARDS GRID - Now fully editable */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-24">
          {servicesData.map((node) => (
            <motion.div 
              key={node.id} 
              whileHover={{ y: -5 }}
              className="p-5 rounded-3xl border border-border/50 bg-muted/30 shadow-sm flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold opacity-60">Node {node.id}</span>
                <div className="text-primary">{node.icon}</div>
              </div>
              <h3 className="text-sm font-bold text-foreground leading-snug mb-1">{node.title}</h3>
              <p className="text-[10px] text-foreground/60">{node.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* SLIDESHOW AREA - Placeholder remains for your image gallery */}
        <div className="rounded-3xl overflow-hidden border border-border bg-muted shadow-xl h-[400px] flex items-center justify-center">
            <span className="text-foreground/50">Slideshow / Visual Showcase Area</span>
        </div>
      </div>
    </section>
  );
}