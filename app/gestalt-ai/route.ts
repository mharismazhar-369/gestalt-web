import { NextResponse } from 'next/server';
import { GESTALT_MEMORY } from '@/src/components/marketing/gestaltMemory'; 

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