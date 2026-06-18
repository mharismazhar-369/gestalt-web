"use client";
import { motion } from "motion/react";
import { Globe, Users, Laptop } from "lucide-react";

export default function Where() {
  const parameters = [
   // { icon: <Laptop className="h-5 w-5" />, title: "Active Sandbox Deployments", desc: "[Details regarding where applications or code frameworks are currently hosted during early demonstration states.]" },
    { icon: <Globe className="h-5 w-5" />, title: "Market Vector", desc: "Our targeted operational areas, industries, or regional scaling tracks across global nodes i.e. Pakistan, United States of America 🦅, Canada & Middle East" },
    { icon: <Users className="h-5 w-5" />, title: "Social Outreach", desc: "Drop Us an Email 📨" }
  ];

  return (
    <section id="where" className="py-24 bg-gray-50/50 px-6 border-y border-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs uppercase font-bold tracking-widest text-raspberry mb-3">Where We Operate</h2>
          <p className="text-3xl md:text-4xl font-bold tracking-tight text-charcoal">
             We Work Everywhere Virtually & Technically 🧙‍♀️
          </p>
        </div>

        <div className="space-y-6">
          {parameters.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="p-3 rounded-xl bg-raspberry/5 text-raspberry shrink-0">{item.icon}</div>
              <div>
                <h4 className="text-lg font-bold text-charcoal mb-1">{item.title}</h4>
                <p className="text-sm text-charcoal/70 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}