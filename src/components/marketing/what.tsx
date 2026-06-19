"use client";
import { motion } from "motion/react";
import { Shield, LayoutGrid, Gamepad2 } from "lucide-react";

export default function What() {
  return (
    <section id="what" className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs uppercase font-bold tracking-widest text-raspberry mb-3">What We Offer</h2>
          <p className="text-3xl md:text-4xl font-bold tracking-tight text-charcoal">
            Our Offerings & Ecosystem Engine
          </p>
        </div>

        {/* Bento Grid Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* SaaS Solutions Card */}
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col justify-between h-full">
            <div className="p-3 bg-white rounded-2xl w-fit shadow-sm text-raspberry"><LayoutGrid className="h-6 w-6" /></div>
            <div className="mt-6">
              <h3 className="text-2xl font-bold mb-2">SaaS Solutions</h3>
              <p className="text-charcoal/70 text-sm max-w-md">We are currently engineering a proprietary, stealth-mode ecosystem of cloud-native architectures designed to automate the high-friction realities of enterprise management. Forged directly from decades of cross-functional operational command and complex financial forensics, this upcoming platform orchestrates intelligent payroll, automated procurement, and predictive controllership into a single, seamless digital engine. We are not merely building software; we are constructing the core technological infrastructure required to capture massive B2B inefficiencies and scale premium recurring value. While the architecture remains secure under wrap during its final high-yield development phase, the framework is engineered from day zero to maximize enterprise unit economics and redefine operational margins in a volatile global market.</p>
            </div>
          </div>

          {/* Consulting Services Card */}
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col justify-between h-full">
            <div className="p-3 bg-white rounded-2xl w-fit shadow-sm text-raspberry"><Shield className="h-6 w-6" /></div>
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">Consulting Services</h3>
              <p className="text-charcoal/70 text-sm">We orchestrate a disruptive suite of elite, tech-enabled advisory and automated backend operations engineered to dismantle the legacy bottlenecks of corporate growth. By fusing advanced operational software scaling with rigorous, digitized financial command, we transform chaotic administration into precise mathematical leverage. From day-zero corporate setups and SaaS-powered HR integrations to cross-functional workflow automation, aggressive AR/AP optimization, and ironclad, tech-driven internal control frameworks, our virtual controllership ecosystem leaves no room for inefficiency. We offer far more than automated bookkeeping, digital payroll deployment, and cloud-based FBR tax compliance; we deliver an unyielding, battle-tested digital and financial architecture. Whether securing complex ERF bank borrowings, deploying international ERP enterprise software, or engineering strict digital document control protocols, we provide the ruthless technological execution and infrastructure essential for hyper-scale market dominance</p>
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