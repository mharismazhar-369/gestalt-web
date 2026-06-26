"use client";

import React, { useState } from 'react';
import XOLabs from '@/src/components/games/xo';
import SnakeLab from '@/src/components/games/snake';
import Maze from '@/src/components/games/maze';
import Chess from '@/src/components/games/chess';

type GameId = 'xo' | 'snake' | 'void' | 'maze' | 'chess' | 'velocity';

const GAMES = [
  { id: 'xo', name: 'Retro Xo', status: 'LIVE' },
  { id: 'snake', name: 'Retro Snake', status: 'LIVE' },
  { id: 'void', name: 'Void Breaker', status: 'OFFLINE' },
  { id: 'maze', name: 'Retro Maze', status: 'Live' },
  { id: 'chess', name: 'Tactical Chess', status: 'Live' },
  { id: 'velocity', name: 'Neon Velocity', status: 'OFFLINE' },
] as const;

// Restored THEMES object for matching active glows
const THEMES: Record<string, { border: string, bg: string, shadow: string }> = {
  xo: { border: 'border-blue-500', bg: 'bg-blue-600', shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.6)]' },
  snake: { border: 'border-emerald-500', bg: 'bg-emerald-600', shadow: 'shadow-[0_0_15px_rgba(16,185,129,0.6)]' },
  void: { border: 'border-fuchsia-500', bg: 'bg-fuchsia-600', shadow: 'shadow-[0_0_15px_rgba(217,70,239,0.6)]' },
  maze: { border: 'border-cyan-500', bg: 'bg-cyan-600', shadow: 'shadow-[0_0_15px_rgba(6,182,212,0.6)]' },
  chess: { border: 'border-amber-500', bg: 'bg-amber-600', shadow: 'shadow-[0_0_15px_rgba(245,158,11,0.6)]' },
  velocity: { border: 'border-pink-500', bg: 'bg-pink-600', shadow: 'shadow-[0_0_15px_rgba(236,72,153,0.6)]' },
};

export default function GamesUtility() {
  const [activeGame, setActiveGame] = useState<GameId>('xo');
  const [globalScore, setGlobalScore] = useState<number>(0);

  const addScore = (points: number) => setGlobalScore(prev => prev + points);

  return (
    <div id="arcade" className="min-h-screen bg-neutral-950 text-slate-200 flex flex-col items-center p-4 md:p-8 font-sans">
      {/* ADDED id="arcade" HERE SO THE NAVBAR LINK CAN FIND IT */}
      
      {/* Header Panel */}
      <div className="w-full max-w-4xl mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black italic tracking-widest text-white">
            GESTALT <span className="text-blue-500">Arcade</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 bg-neutral-900 border border-white/10 px-6 py-2 rounded-lg">
          <span className="text-xs text-slate-500 font-bold uppercase">Session Score</span>
          <span className="font-mono text-2xl font-bold text-amber-500">{globalScore}</span>
        </div>
      </div>

      {/* Game Selector Menu */}
      <div className="w-full max-w-4xl flex flex-wrap justify-center gap-3 mb-8">
        {GAMES.map(game => {
          const isActive = activeGame === game.id;
          const theme = THEMES[game.id];
          const isLive = game.status.toLowerCase() === 'live';

          return (
            <button
              key={game.id}
              onClick={() => setActiveGame(game.id as GameId)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-bold tracking-widest uppercase rounded-lg border transition-all duration-300
                ${isActive 
                  ? `${theme.bg} ${theme.border} text-white ${theme.shadow} scale-105` 
                  : `bg-neutral-900 border-white/5 text-slate-400 hover:bg-neutral-800 hover:border-white/10`
                }`}
            >
              {/* Restored Colored Status Dot */}
              <span 
                className={`w-2 h-2 rounded-full ${
                  isLive 
                    ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' 
                    : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                }`} 
              />
              
              {game.name} 
              
              {!isLive && <span className="ml-1 text-[9px] opacity-50 border border-slate-600 px-1 rounded">OFF</span>}
            </button>
          );
        })}
      </div>

      {/* Game Render Area */}
      <div className="w-full max-w-4xl flex-1 flex flex-col">
        {activeGame === 'xo' && <XOLabs onScore={addScore} />}
        {activeGame === 'snake' && <SnakeLab onScore={addScore} />}
        {activeGame === 'maze' && <Maze onScore={addScore} />}
        {activeGame === 'chess' && <Chess onScore={addScore} />}
        
        {/* Offline Fallback for modules not yet connected */}
        {activeGame !== 'xo' && activeGame !== 'snake' && activeGame !== 'maze' && activeGame !== 'chess' && (
          <div className="flex-1 flex items-center justify-center border border-white/5 bg-neutral-900/50 rounded-xl">
            <span className="text-slate-500 font-bold tracking-widest uppercase flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              Module Offline
            </span>
          </div>
        )}
      </div>
      
    </div>
  );
}