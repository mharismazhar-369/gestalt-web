"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

const GRID_SIZE = 20;
const CANVAS_SIZE = 400;
const TILE_COUNT = CANVAS_SIZE / GRID_SIZE;
const FOOD_PTS = 10;

export default function SnakeLab({ onScore }: { onScore: (pts: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [speedLevel, setSpeedLevel] = useState(2);
  const [gameOver, setGameOver] = useState<{ active: boolean; reason: string }>({ active: false, reason: '' });
  const [isPlaying, setIsPlaying] = useState(false);

  // Mutable Game State (avoids re-renders during loop)
  const gameState = useRef({
    snake: [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }],
    food: { x: 5, y: 5 },
    dx: 0, dy: -1,
    nextDx: 0, nextDy: -1,
    lastRenderTime: 0
  });

  const reqRef = useRef<number | null>(null);

  const spawnFood = useCallback(() => {
    let valid = false;
    let newFood = { x: 0, y: 0 };
    while (!valid) {
      newFood = { x: Math.floor(Math.random() * TILE_COUNT), y: Math.floor(Math.random() * TILE_COUNT) };
      valid = !gameState.current.snake.some(seg => seg.x === newFood.x && seg.y === newFood.y);
    }
    gameState.current.food = newFood;
  }, []);

  const initGame = () => {
    gameState.current = {
      snake: [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }],
      food: { x: 0, y: 0 },
      dx: 0, dy: -1,
      nextDx: 0, nextDy: -1,
      lastRenderTime: performance.now()
    };
    spawnFood();
    setScore(0);
    setGameOver({ active: false, reason: '' });
    setIsPlaying(true);
  };

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const state = gameState.current;

    // Background & Grid
    ctx.fillStyle = '#050914';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1;
    for(let i=0; i<=TILE_COUNT; i++) {
      ctx.beginPath(); ctx.moveTo(i*GRID_SIZE, 0); ctx.lineTo(i*GRID_SIZE, CANVAS_SIZE); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i*GRID_SIZE); ctx.lineTo(CANVAS_SIZE, i*GRID_SIZE); ctx.stroke();
    }

    // Food
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(state.food.x * GRID_SIZE + GRID_SIZE/2, state.food.y * GRID_SIZE + GRID_SIZE/2, GRID_SIZE/2 - 2, 0, Math.PI*2);
    ctx.fill();

    // Snake
    state.snake.forEach((seg, i) => {
      if (i === 0) {
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(seg.x * GRID_SIZE + GRID_SIZE/2, seg.y * GRID_SIZE + GRID_SIZE/2, GRID_SIZE/2 - 1, 0, Math.PI*2); ctx.fill();
      } else {
        ctx.fillStyle = '#10b981';
        ctx.fillRect(seg.x * GRID_SIZE + 4, seg.y * GRID_SIZE + 4, GRID_SIZE - 8, GRID_SIZE - 8);
      }
    });
  }, []);

  const gameLoop = useCallback((time: number) => {
    if (!isPlaying) return;
    reqRef.current = requestAnimationFrame(gameLoop);
    
    const moveInterval = 320 - (speedLevel * 25);
    if (time - gameState.current.lastRenderTime >= moveInterval) {
      gameState.current.lastRenderTime = time;
      const state = gameState.current;
      
      state.dx = state.nextDx;
      state.dy = state.nextDy;
      const head = { x: state.snake[0].x + state.dx, y: state.snake[0].y + state.dy };

      if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        setIsPlaying(false); setGameOver({ active: true, reason: 'Wall Impact' }); return;
      }
      if (state.snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        setIsPlaying(false); setGameOver({ active: true, reason: 'Self Intersection' }); return;
      }

      state.snake.unshift(head);
      if (head.x === state.food.x && head.y === state.food.y) {
        setScore(s => { const newScore = s + FOOD_PTS; onScore(FOOD_PTS); return newScore; });
        spawnFood();
      } else {
        state.snake.pop();
      }
    }
    draw();
  }, [isPlaying, speedLevel, onScore, spawnFood, draw]);

  useEffect(() => {
    if (isPlaying) reqRef.current = requestAnimationFrame(gameLoop);
    return () => { if (reqRef.current) cancelAnimationFrame(reqRef.current); };
  }, [isPlaying, gameLoop]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if(!isPlaying) return;
      if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key)) e.preventDefault();
      const state = gameState.current;
      const setDir = (nx: number, ny: number) => {
        if (state.dx === -nx && state.dy === -ny && state.snake.length > 1) return;
        state.nextDx = nx; state.nextDy = ny;
      };
      switch(e.key) {
        case 'ArrowUp': case 'w': setDir(0, -1); break;
        case 'ArrowDown': case 's': setDir(0, 1); break;
        case 'ArrowLeft': case 'a': setDir(-1, 0); break;
        case 'ArrowRight': case 'd': setDir(1, 0); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isPlaying]);

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl mx-auto">
      <div className="relative bg-[#02040a] p-3 rounded-xl border border-slate-800 flex-shrink-0">
        <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} className="bg-[#050914] rounded block" />
        {gameOver.active && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-xl">
            <h2 className="text-red-500 text-2xl font-black mb-1">CRITICAL FAILURE</h2>
            <p className="text-slate-400 mb-4">{gameOver.reason}</p>
            <button onClick={initGame} className="bg-blue-600 px-6 py-2 rounded font-bold text-white">REBOOT</button>
          </div>
        )}
        {!isPlaying && !gameOver.active && (
           <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
             <button onClick={initGame} className="bg-blue-600 px-8 py-3 rounded-lg font-black tracking-widest text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]">INITIALIZE</button>
           </div>
        )}
      </div>

      <div className="flex-1 bg-neutral-900/60 p-6 rounded-xl border border-white/5 flex flex-col gap-6">
        <div className="bg-[#02040a] p-4 rounded-lg border border-slate-800 text-center">
          <div className="text-xs text-emerald-500 font-bold mb-1">CURRENT RUN</div>
          <div className="text-4xl font-mono font-bold text-emerald-400">{score}</div>
        </div>
        <div>
          <label className="flex justify-between text-xs font-bold text-slate-400 mb-2">
            ENGINE SPEED <span className="text-white">{speedLevel}</span>
          </label>
          <input type="range" min="1" max="10" value={speedLevel} onChange={(e) => setSpeedLevel(parseInt(e.target.value))} className="w-full accent-blue-500" />
        </div>
      </div>
    </div>
  );
}