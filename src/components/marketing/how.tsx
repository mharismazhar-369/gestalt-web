"use client";
import { motion } from "motion/react";
import localFont from 'next/font/local';

const companyFont = localFont({ src: '/Spaceage.ttf', display: 'swap' });

export default function How() {
  const steps = [
    { 
      phase: "Phase 01", 
      title: "Initiatives & Incorporation of Idea", 
      desc: "An idea sparked our core initiative, laying down the strategic foundation for Gestalt Technologies. We successfully incorporated our startup to begin turning our product pipeline into reality." 
    },
    { 
      phase: "Phase 02", 
      title: "Registrations with Governing Bodies", 
      desc: "Securing our legal structure and operational presence by completing official compliance registrations with all relevant regulatory and governing corporate bodies." 
    },
    { 
      phase: "Phase 03", 
      title: "Development of Website", 
      desc: "Architecting and engineering the core infrastructure of our central website, designing a interface to act as the companies ecosystem's staging hub." 
    },
    { 
      phase: "Phase 04", 
      title: "Prototyping on LLM 'Mr. Gestalt'", 
      desc: "Incubating our standalone logic engine and sovereign context layers, paving the way for Pakistan's first independent, indigenous corporate Large Language Model." 
    },
    { 
      phase: "Phase 05", 
      title: "Prototype Test launch of SaaS Ecosystem", 
      desc: "Initiating the live beta deployment of our core SaaS ecosystem into a controlled testing environment. This critical phase allows us to stress-test our infrastructure, optimize module interconnectivity, and refine performance using real-time data." 
    },
    { 
      phase: "Phase 06", 
      title: "Social Media & Global Reach Expansion", 
      desc: "Deploying our cross-channel digital communication network to amplify our community outreach, establish ecosystem trust, and coordinate virtual expansion nodes." 
    },
    { 
      phase: "Phase 07", 
      title: "Business Ecosystem Expansion & Strategic Partnerships", 
      desc: "Creating & Developing strategic alliances. We aim to interconnect services, driving sustained growth and collaborative innovation. We are open for creative collaborations" 
    },
    { 
      phase: "Phase 08", 
      title: "Business Development & Services Expansion", 
      desc: "Leveraging our core technical infrastructure to provide IT-enabled consulting and targeted business development. We deliver actionable operational strategies designed to scale enterprise efficiency." 
    }
  ];

  return (
    /* Aligned with Where.tsx background theme and border settings */
    <section id="how" className="py-24 bg-muted/30 px-6 border-y border-border transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Content matching text-primary logic */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-xs uppercase font-bold tracking-widest text-primary mb-3">How We Build</h2>
          <p className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Strategic Roadmap Timeline
          </p>
        </div>

        {/* Kept your original beautiful vertical timeline structure intact */}
        <div className="relative border-l border-border ml-3 md:ml-32 space-y-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-8"
            >
              {/* Outer timeline circle dot using text-primary settings */}
              <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              </div>
              
              {/* Left Side Label for larger screens matching core settings */}
              <div className="hidden md:block absolute -left-32 top-0.5 w-24 text-right text-xs font-bold uppercase tracking-wider text-primary">
                {step.phase}
              </div>

              {/* Original clean timeline box element styling */}
              <div className="bg-card border border-border p-6 rounded-2xl hover:bg-muted transition-colors duration-200 shadow-sm">
                <span className="inline-block md:hidden text-xs font-bold uppercase tracking-wider text-primary mb-1">
                  {step.phase}
                </span>
                <h4 className="text-lg font-bold text-foreground mb-2">{step.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed text-justify">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}