"use client";
import { motion } from "motion/react";
import { Shield, LayoutGrid, Gamepad2 } from "lucide-react";

export default function What() {
  return (
    <section id="what" className="py-24 bg-background px-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs uppercase font-bold tracking-widest text-raspberry mb-3">What We Offer</h2>
          <p className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Our Offerings & Ecosystem Engine
          </p>
        </div>

        {/* Bento Grid Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* SaaS Solutions Card */}
          <div className="bg-card p-8 rounded-3xl border border-border flex flex-col justify-between h-full shadow-sm">
            <div className="p-3 bg-background rounded-2xl w-fit shadow-sm text-raspberry"><Shield className="h-6 w-6" /></div>
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">SaaS Solutions</h3>
              <p className="text-muted-foreground text-sm text-justify">The Company is engaged in the research, design, development, and commercialization of proprietary software platforms, SaaS applications, and technology-enabled business solutions. These solutions may support areas including workflow automation, payroll administration, procurement management, document control, reporting, and other operational functions. The Company may develop, license, market, export, and provide support services for such software products and related technologies to clients in Pakistan and abroad.</p>
            </div>
          </div>

          {/* Consulting Services Card */}
          <div className="bg-card p-8 rounded-3xl border border-border flex flex-col justify-between h-full shadow-sm">
            <div className="p-3 bg-background rounded-2xl w-fit shadow-sm text-raspberry"><Shield className="h-6 w-6" /></div>
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">Consulting Services</h3>
              <p className="text-muted-foreground text-sm text-justify">We provide technology-enabled business support, consulting, and outsourced operational services designed to help organizations establish, streamline, and scale their operations efficiently. By combining modern digital tools, process automation, and structured management practices, we assist businesses in improving operational visibility, strengthening internal processes, and reducing administrative burden.

Our services cover company formation and business setup, technology consulting, SaaS implementation, HR and workforce solutions, workflow automation, document management systems, digital recordkeeping, compliance support, and business process optimization. We also assist organizations in implementing ERP and enterprise software solutions, establishing effective reporting frameworks, and improving coordination across departments.

In addition to technology-enabled business services, we provide consultancy, project support, and export-oriented professional services to clients in local and international markets. Our approach is focused on delivering practical, scalable, and sustainable solutions that enable organizations to operate more effectively, adapt to changing business requirements, and achieve long-term growth.</p>
            </div>
          </div>

          {/* POLYGEM NEXUS TEASER CARD */}
          <div className="md:col-span-2 bg-gradient-to-br from-charcoal to-neutral-900 text-white p-10 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-charcoal/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-raspberry/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-xl space-y-4">
              <div className="inline-flex items-center gap-2 bg-raspberry px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                <Gamepad2 className="h-3.5 w-3.5" /> Gaming & Utilities
              </div>
              <h3 className="text-3xl font-extrabold tracking-tight">Future Interactive Gaming & Utilities Hub</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Gestalt Technologies showroom will soon natively scale to house immersive entertainment, games and Utilities.
              </p>
            </div>
            
            <div className="w-full md:w-auto shrink-0 z-10">
              <div className="bg-white/5 border border-white/10 backdrop-blur-md px-6 py-4 rounded-2xl text-center">
                <span className="block text-2xl font-bold text-raspberry animate-pulse">In Development</span>
                <span className="text-xs text-white/50 tracking-wide">Nexolith | The Briefcase</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}