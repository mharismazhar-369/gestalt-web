"use client";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Crown, Eye, Sparkles, Sword, Target } from "lucide-react";

export default function Why() {
  const pillars = [
    { icon: <Sword className="h-6 w-6 text-raspberry" />, title: "VENI: Disruptive Presence", desc: "We don't wait for invitations or market validation." },
    { icon: <Eye className="h-6 w-6 text-raspberry" />, title: "VIDI: Radical Clarity", desc: "We look straight through your operational nightmares. Where standard corporate agencies see a 'complex problem to log billable hours,' we see simple structural flaws waiting to be vaporized by clean code and human-first logic" },
    { icon: <Crown className="h-6 w-6 text-raspberry" />, title: "VICI: Absolute Conquest", desc: "Execution is our only metric." }
  ];

  return (
    <section id="why" className="py-24 bg-muted/30 px-6 border-y border-border transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs uppercase font-bold tracking-widest text-raspberry mb-3">Why Gestalt</h2>
          <p className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            The Philosophy Driving Our Services & Solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="border border-border shadow-sm bg-card rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-8 flex flex-col items-start">
                  <div className="p-3 rounded-2xl bg-raspberry/5 mb-6">{pillar.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{pillar.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm text-justify">{pillar.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}