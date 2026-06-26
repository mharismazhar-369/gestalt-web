"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Cpu, Send, Sparkles, AlertTriangle, Globe } from "lucide-react";
import localFont from 'next/font/local';

const companyFont = localFont({ src: '/Spaceage.ttf', display: 'swap' });

// --- DEFINED AT THE TOP LEVEL (OUTSIDE THE COMPONENT) ---
const GESTALT_MEMORY = {
  identity: "Mr. Gestalt, a structural logic prototype engineered by GTPL.",
  status: "I am currently in early-stage incubation. My neural pathways are growing daily.",
  company_overview: "Gestalt Technologies Private Limited (GTPL) is a software engineering firm and incubator. We don't just build software; we turn chaos into code. We are an ecosystem engine designed to empower businesses.",
  founders: "GTPL is driven by two individuals with laptops, relentless determination, and a refusal to believe that innovation requires massive budgets. Every tech giant was once a startup, and we wear our startup badge with pride.",
  mission: "Our mission is to build a one-stop SaaS and services ecosystem that solves real business challenges while democratizing access to high-end tech.",
  vision: "We are developing Pakistan's first sovereign, indigenous Large Language Model. The field is dominated by giants, but we are proving that meaningful innovation starts in garages, not just boardrooms.",
  hero_summary: "We don't just build software; we turn chaos into code. GTPL is an ecosystem engine designed to empower businesses.",
  why_gtpl: "Why us? Because we combine underdog agility with enterprise-grade logic. We build faster, pivot quicker, and engineer solutions with raw dedication.",
  arcade: "The Nexus Terminal Arcade is where we showcase our logic engines! You can play XO Tactics, Maze Labs, and Tactical Chess—all engineered to run natively in your browser.",
  warning: "⚠️ [SYSTEM NOTICE]: Query exceeds local knowledge base."
};

type Message = { role: 'user' | 'ai' | 'system'; text: string };

const SUGGESTED_PROMPTS = [
  "What is your architecture?",
  "Test your Physics logic",
  "What SaaS products do you build?",
  "Boot up the Game Arcade",
  "Who are the founders?"
];

export default function PkLlm() {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', text: "SYSTEM BOOT SEQUENCE INITIATED..." },
    { role: 'ai', text: `Assalamu Alaikum. I am ${GESTALT_MEMORY.identity} I am currently in incubation at Gestalt Technologies. How can I assist you today?` }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // --- 1. ENHANCED LOCAL KNOWLEDGE BASE ---
  const checkLocalKnowledge = (input: string): string | null => {
    const q = input.toLowerCase();
    
    // Core & Identity
    if (q.includes('mission') || q.includes('goal')) return GESTALT_MEMORY.mission;
    if (q.includes('vision') || q.includes('future')) return GESTALT_MEMORY.vision;
    if (q.includes('founder') || q.includes('team') || q.includes('who built')) return GESTALT_MEMORY.founders;
    if (q.includes('why gtpl') || q.includes('why choose')) return GESTALT_MEMORY.why_gtpl;
    if (q.includes('who are you') || q.includes('your name')) return `I am ${GESTALT_MEMORY.identity} ${GESTALT_MEMORY.status}`;
    if (q.includes('hero') || q.includes('gtpl') || q.includes('about')) return GESTALT_MEMORY.hero_summary;
    if (q.includes('architecture') || q.includes('how do you work')) return GESTALT_MEMORY.mr_gestalt_architecture;
    
    // Services & Products
    if (q.includes('arcade') || q.includes('games') || q.includes('play')) return GESTALT_MEMORY.arcade;
    if (q.includes('services') || q.includes('what do you offer')) return GESTALT_MEMORY.services;
    if (q.includes('saas') || q.includes('products')) return GESTALT_MEMORY.saas_products;
    if (q.includes('website') || q.includes('structure')) return GESTALT_MEMORY.website_overview;

    // Academic Logic
    if (q.includes('math') || q.includes('algebra') || q.includes('geometry')) return GESTALT_MEMORY.academic_core.math;
    if (q.includes('physics') || q.includes('mechanics') || q.includes('thermodynamics')) return GESTALT_MEMORY.academic_core.physics;
    if (q.includes('chemistry') || q.includes('periodic table')) return GESTALT_MEMORY.academic_core.chemistry;
    if (q.includes('biology') || q.includes('anatomy') || q.includes('dna')) return GESTALT_MEMORY.academic_core.biology;

    // Greetings
    if (q.includes('hello') || q.includes('salam') || q.includes('hi')) return "Greetings! Mr. Gestalt is online and monitoring the ecosystem. You can ask me about GTPL's mission, our academics, or the Arcade!";
    
    return null;
  };

  // --- 2. THE HYBRID LOGIC ENGINE ---
  const generateAIResponse = async (input: string) => {
    const localAnswer = checkLocalKnowledge(input);
    
    if (localAnswer) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', text: localAnswer }]);
        setIsTyping(false);
      }, 800); 
      return;
    }

    setMessages(prev => [...prev, { role: 'system', text: GESTALT_MEMORY.warning }]);
    
    try {
      const response = await fetch('/api/gestalt-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) throw new Error('API Offline');
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);

    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'system', 
        text: "ERROR: External mainframe unreachable. My core memories are intact, but I cannot process internet queries right now." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Centralized submission handler for both text input and chips
  const submitQuery = (query: string) => {
    if (!query.trim() || isTyping) return;
    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setInputValue('');
    setIsTyping(true);
    generateAIResponse(query);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuery(inputValue);
  };

  if (!mounted) return null;

  return (
    <section id="pk-llm" className="min-h-screen bg-background pt-24 pb-20 relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      <div className="absolute -left-[20%] top-[10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT SIDE: The Manifesto */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest mb-6 uppercase">
              <Globe className="h-3.5 w-3.5" /> Mr. Gestalt
            </div>
            <h1 style={companyFont.style} className="text-4xl md:text-6xl font-normal tracking-tight text-foreground leading-tight mb-6">
              Pakistan's First <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">Indigenous LLM Mr. Gestalt</span>
            </h1>
          </div>

          <div className="space-y-6 text-muted-foreground leading-relaxed text-justify relative">
            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full hidden md:block" />
            <p className="text-lg text-foreground font-medium">GTPL may be a startup, and we wear that badge with pride.</p>
            <p>GTPL was founded on a vision: to build a one-stop SaaS and services ecosystem that solves real business challenges. But looking ahead, we are working on an even bigger ambition developing Pakistan's first sovereign Large Language Model (LLM).</p>
            <p>The field is dominated by industry giants such as OpenAI, Google, and DeepSeek companies backed by immense resources. In comparison, we are just two people with laptops, determination, and a belief that meaningful innovation does not always begin with massive budgets.</p>
          </div>
        </motion.div>

        {/* RIGHT SIDE: The AI Prototype Terminal */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="w-full">
          <div className="bg-[#0b1220] rounded-3xl border border-white/10 shadow-2xl shadow-primary/20 overflow-hidden flex flex-col h-[600px] relative">
            
            {/* Terminal Header */}
            <div className="h-14 border-b border-white/10 bg-white/5 px-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-px bg-white/20 mx-2" />
                <span className="text-white/50 text-xs font-mono flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-primary" /> MR_GESTALT_v0.3_HYBRID.exe
                </span>
              </div>
              <div className="text-[10px] font-mono text-primary animate-pulse flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> ONLINE
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-gradient-to-b from-transparent to-black/20">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-br-sm' 
                        : msg.role === 'system'
                        ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-bl-sm font-mono text-xs flex gap-2 items-start'
                        : 'bg-white/10 text-white/90 border border-white/5 rounded-bl-sm font-mono text-xs'
                    }`}>
                      {msg.role === 'ai' && <Terminal className="w-3 h-3 mb-2 opacity-50 shrink-0" />}
                      {msg.role === 'system' && <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />}
                      <span>{msg.text}</span>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-sm px-5 py-4 flex gap-1.5 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area with Suggestion Chips */}
            <div className="p-4 bg-white/5 border-t border-white/10 shrink-0 flex flex-col gap-3">
              
              {/* Suggestion Chips */}
              <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-hide">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => submitQuery(prompt)}
                    disabled={isTyping}
                    className="whitespace-nowrap px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Form Input */}
              <form onSubmit={handleFormSubmit} className="relative flex items-center">
                <input 
                  type="text" 
                  value={inputValue} 
                  onChange={(e) => setInputValue(e.target.value)} 
                  placeholder="Query Mr. Gestalt..." 
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors font-mono" 
                  disabled={isTyping} 
                />
                <button 
                  type="submit" 
                  disabled={!inputValue.trim() || isTyping} 
                  className="absolute right-2 p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-50 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}