import { NextResponse } from 'next/server';

// --- MR. GESTALT'S NATIVE MEMORY INJECTED DIRECTLY ---
const GESTALT_MEMORY = {
  // --- CORE IDENTITY ---
  identity: "Mr. Gestalt, a structural logic prototype engineered by GTPL.",
  status: "I am currently in early-stage incubation. My neural pathways are growing daily.",
  mr_gestalt_architecture: "I am a hybrid intelligence. I process foundational logic, company data, and basic academics natively using my local memory matrices. For complex reasoning, I bridge to a heavier external LLM. I am the precursor to Pakistan's first sovereign AI model.",

  // --- COMPANY OVERVIEW ---
  company_overview: "Gestalt Technologies Private Limited (GTPL) is a software engineering firm and incubator. We don't just build software; we turn chaos into code. We are an ecosystem engine designed to empower businesses.",
  founders: "GTPL is driven by two individuals with laptops, relentless determination, and a refusal to believe that innovation requires massive budgets. Every tech giant was once a startup, and we wear our startup badge with pride.",
  mission: "Our mission is to build a one-stop SaaS and services ecosystem that solves real business challenges while democratizing access to high-end tech.",
  vision: "We are developing Pakistan's first sovereign, indigenous Large Language Model. The field is dominated by giants, but we are proving that meaningful innovation starts in garages, not just boardrooms.",
  hero_summary: "We don't just build software; we turn chaos into code. GTPL is an ecosystem engine designed to empower businesses.",
  why_gtpl: "Why us? Because we combine underdog agility with enterprise-grade logic. We build faster, pivot quicker, and engineer solutions with raw dedication.",

  // --- PRODUCTS & SERVICES ---
  services: "We provide high-end engineering services: Custom Web & App Development, AI & LLM Integration, Blockchain solutions, and Enterprise System Architecture.",
  saas_products: "We are actively developing a suite of SaaS products aimed at business automation, CRM management, and AI-driven productivity tools. Our goal is a unified ecosystem.",
  arcade: "The Nexus Terminal Arcade is where we showcase our logic engines! You can play XO Tactics, Maze Labs, and Tactical Chess—all engineered to run natively in your browser.",
  website_overview: "Our digital terminal is divided into clear sectors: The Hero Interface (who we are), The Services Matrix (what we build), The SaaS Ecosystem (what we deploy), and the Nexus Arcade (where we play).",

  // --- ACADEMIC LOGIC CORE (10th Grade Level) ---
  academic_core: {
    math: "My math logic covers Algebra, Geometry, and basic Trigonometry. I can calculate linear equations, quadratic formulas, and basic geometric proofs natively.",
    physics: "I am versed in classical mechanics. I understand Newton's Laws of Motion, basic kinematics, thermodynamics, and the fundamental properties of light and sound.",
    chemistry: "My chemical matrix contains the Periodic Table. I can balance basic chemical equations, explain atomic structures, and define covalent and ionic bonding.",
    biology: "I can explain cellular structures, basic human anatomy (like the digestive and nervous systems), and the foundational principles of genetics and DNA."
  },

  // --- SYSTEM NOTICES ---
  warning: "⚠️ [SYSTEM NOTICE]: Query exceeds local knowledge base. Mr. Gestalt is now consulting an external intelligence (LLM) to assist with your request. External connections are monitored."
};

// --- ROUTING LOGIC ---
export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    // Convert prompt to lowercase for easier keyword matching
    const lowerPrompt = prompt.toLowerCase();
    let reply = "";

    // --- MR. GESTALT'S LOCAL LOGIC ENGINE ---
    if (lowerPrompt.includes("mission")) {
        reply = GESTALT_MEMORY.mission;
    } 
    else if (lowerPrompt.includes("vision") || lowerPrompt.includes("llm")) {
        reply = GESTALT_MEMORY.vision;
    } 
    else if (lowerPrompt.includes("founder") || lowerPrompt.includes("startup") || lowerPrompt.includes("gtpl")) {
        reply = `${GESTALT_MEMORY.founders} ${GESTALT_MEMORY.why_gtpl}`;
    } 
    else if (lowerPrompt.includes("who are you") || lowerPrompt.includes("identity") || lowerPrompt.includes("name")) {
        reply = `${GESTALT_MEMORY.identity} ${GESTALT_MEMORY.hero_summary}`;
    } 
    else if (lowerPrompt.includes("arcade") || lowerPrompt.includes("game") || lowerPrompt.includes("play")) {
        reply = GESTALT_MEMORY.arcade;
    } 
    else {
        // The default fallback for queries he doesn't locally understand
        reply = `${GESTALT_MEMORY.status} As this is a secure preview environment, my external mainframe connections are currently disabled. However, you can ask me about my mission, vision, or the founders of GTPL!`;
    }

    // Return the local response instantly
    return NextResponse.json({ reply });
    
  } catch (error) {
    console.error("Local Routing Error:", error);
    return NextResponse.json({ reply: "My internal logic circuits encountered an error." }, { status: 500 });
  }
}