"use client";
import { motion } from "motion/react";

export default function How() {
  const steps = [
    { phase: "Phase 01", title: "Inception & Incorporation", desc: "At Phase 1 we had an idea and a plan which gave birth to Gestalt Technologies" },
    { phase: "Phase 02", title: "Service & Solutions", desc: "Providing operational consultations & services." },
    { phase: "Phase 03", title: "Service Campaigns", desc: "Initiating communication and operational client consultation programs directly across enterprise channels." },
    { phase: "Phase 04", title: "SaaS Development & Deployment", desc: "Bridging the product pipeline into production modules hosted alongside commercial networks." },
    { phase: "Phase 05", title: "Games & Utilities Dev & Dep", desc: "Injecting interactive gaming and utilities properties and modules straight into the ecosystem layout structure." }
  ];

  return (
    <section id="how" className="py-24 bg-background px-6 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-xs uppercase font-bold tracking-widest text-raspberry mb-3">How We Build</h2>
          <p className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Strategic Roadmap Timeline
          </p>
        </div>

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
              {/* Outer circle dot */}
              <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-raspberry bg-background flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-raspberry" />
              </div>
              
              {/* Left Side Label for larger screens */}
              <div className="hidden md:block absolute -left-32 top-0.5 w-24 text-right text-xs font-bold uppercase tracking-wider text-raspberry">
                {step.phase}
              </div>

              <div className="bg-card border border-border p-6 rounded-2xl hover:bg-muted transition-colors duration-200 shadow-sm">
                <span className="inline-block md:hidden text-xs font-bold uppercase tracking-wider text-raspberry mb-1">
                  {step.phase}
                </span>
                <h4 className="text-lg font-bold text-foreground mb-2">{step.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}