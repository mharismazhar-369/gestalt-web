"use client";

import React, { useState, useEffect, useCallback } from 'react';

// --- Type Definitions ---
type Player = 'X' | 'O' | null;
type Difficulty = 'easy' | 'hard';
type GameId = 'xo' | 'void' | 'snake' | 'maze' | 'chess' | 'velocity';

// --- Game Configurations & Themes ---
const GAMES = [
  { id: 'xo', name: 'XO Tactics', status: 'LIVE' },
  { id: 'void', name: 'Void Breaker', status: 'OFFLINE' },
  { id: 'snake', name: 'Snake Labs', status: 'OFFLINE' },
  { id: 'maze', name: 'Maze Labs', status: 'OFFLINE' },
  { id: 'chess', name: 'Tactical Chess', status: 'OFFLINE' },
  { id: 'velocity', name: 'Neon Velocity', status: 'OFFLINE' },
] as const;

const THEMES: Record<string, { color: string, shadow: string, bgGlow: string, dot: string }> = {
  void: { color: 'text-fuchsia-500', shadow: 'drop-shadow-[0_0_15px_rgba(217,70,239,0.6)]', bgGlow: 'to-fuchsia-900/20', dot: 'bg-fuchsia-500' },
  snake: { color: 'text-emerald-500', shadow: 'drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]', bgGlow: 'to-emerald-900/20', dot: 'bg-emerald-500' },
  maze: { color: 'text-amber-500', shadow: 'drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]', bgGlow: 'to-amber-900/20', dot: 'bg-amber-500' },
  chess: { color: 'text-slate-300', shadow: 'drop-shadow-[0_0_15px_rgba(203,213,225,0.6)]', bgGlow: 'to-slate-800/40', dot: 'bg-slate-300' },
  velocity: { color: 'text-cyan-400', shadow: 'drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]', bgGlow: 'to-cyan-900/20', dot: 'bg-cyan-400' }
};

export default function GamesUtility() {
  // --- Hub State ---
  const [activeGame, setActiveGame] = useState<GameId>('xo');

  // --- XO Tactics State ---
  const [gridSize, setGridSize] = useState<number>(3);
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState<boolean>(true);
  const [gameActive, setGameActive] = useState<boolean>(true);
  const [difficulty, setDifficulty] = useState<Difficulty>('hard');
  const [statusText, setStatusText] = useState<string>("Your Turn (X) • Connect 3 to Win");
  const [sessionScore, setSessionScore] = useState<number>(0);
  const [winningCells, setWinningCells] = useState<number[]>([]);
  
  const winLength = gridSize === 3 ? 3 : gridSize === 6 ? 4 : 5;

  // --- Core Game Logic (XO Tactics) ---
  const checkWinDynamic = useCallback((currentBoard: Player[], player: Player, size: number, connectGoal: number): number[] | null => {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c <= size - connectGoal; c++) {
        let win = true; let combo: number[] = [];
        for (let i = 0; i < connectGoal; i++) {
          let idx = r * size + (c + i);
          if (currentBoard[idx] !== player) { win = false; break; }
          combo.push(idx);
        }
        if (win) return combo;
      }
    }
    for (let c = 0; c < size; c++) {
      for (let r = 0; r <= size - connectGoal; r++) {
        let win = true; let combo: number[] = [];
        for (let i = 0; i < connectGoal; i++) {
          let idx = (r + i) * size + c;
          if (currentBoard[idx] !== player) { win = false; break; }
          combo.push(idx);
        }
        if (win) return combo;
      }
    }
    for (let r = 0; r <= size - connectGoal; r++) {
      for (let c = 0; c <= size - connectGoal; c++) {
        let win = true; let combo: number[] = [];
        for (let i = 0; i < connectGoal; i++) {
          let idx = (r + i) * size + (c + i);
          if (currentBoard[idx] !== player) { win = false; break; }
          combo.push(idx);
        }
        if (win) return combo;
      }
    }
    for (let r = 0; r <= size - connectGoal; r++) {
      for (let c = connectGoal - 1; c < size; c++) {
        let win = true; let combo: number[] = [];
        for (let i = 0; i < connectGoal; i++) {
          let idx = (r + i) * size + (c - i);
          if (currentBoard[idx] !== player) { win = false; break; }
          combo.push(idx);
        }
        if (win) return combo;
      }
    }
    return null;
  }, []);

  const getAiMove = useCallback((currentBoard: Player[]): number | null => {
    const avail = currentBoard.map((v, i) => v === null ? i : null).filter(v => v !== null) as number[];
    if (avail.length === 0) return null;
    if (difficulty === 'easy') return avail[Math.floor(Math.random() * avail.length)];

    if (gridSize === 3) {
      const minimax = (newBoard: Player[], player: Player): { score: number, index?: number } => {
        const availableSpots = newBoard.map((v, i) => v === null ? i : null).filter(v => v !== null) as number[];
        if (checkWinDynamic(newBoard, 'X', 3, 3)) return { score: -10 };
        if (checkWinDynamic(newBoard, 'O', 3, 3)) return { score: 10 };
        if (availableSpots.length === 0) return { score: 0 };

        let moves: { index: number, score: number }[] = [];
        for (let i = 0; i < availableSpots.length; i++) {
          let move: any = { index: availableSpots[i] };
          newBoard[availableSpots[i]] = player;
          move.score = minimax(newBoard, player === 'O' ? 'X' : 'O').score;
          newBoard[availableSpots[i]] = null;
          moves.push(move);
        }

        let bestMove = 0;
        let bestScore = player === 'O' ? -10000 : 10000;
        for (let i = 0; i < moves.length; i++) {
          if (player === 'O' ? moves[i].score > bestScore : moves[i].score < bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
        return moves[bestMove];
      };
      return minimax([...currentBoard], 'O').index!;
    }

    // Heuristic for 6x6 and 9x9
    for (let i of avail) { let temp = [...currentBoard]; temp[i] = 'O'; if (checkWinDynamic(temp, 'O', gridSize, winLength)) return i; }
    for (let i of avail) { let temp = [...currentBoard]; temp[i] = 'X'; if (checkWinDynamic(temp, 'X', gridSize, winLength)) return i; }
    for (let i of avail) {
      let neighbors = [i - 1, i + 1, i - gridSize, i + gridSize];
      if (neighbors.some(n => n >= 0 && n < currentBoard.length && currentBoard[n] === 'O')) return i;
    }
    const center = Math.floor((gridSize * gridSize) / 2);
    if (avail.includes(center)) return center;
    return avail[Math.floor(Math.random() * avail.length)];
  }, [difficulty, gridSize, winLength, checkWinDynamic]);

  const handleWinState = useCallback((currentBoard: Player[], player: Player) => {
    const winCombo = checkWinDynamic(currentBoard, player, gridSize, winLength);
    if (winCombo) {
      setGameActive(false); setWinningCells(winCombo);
      if (player === 'X') {
        setSessionScore(prev => prev + (gridSize === 3 ? 150 : gridSize === 6 ? 450 : 1500));
        setStatusText("Victory Achieved.");
      } else {
        setStatusText("System Overrun.");
      }
      return true;
    }
    if (currentBoard.every(c => c !== null)) {
      setGameActive(false); setSessionScore(prev => prev + 50); setStatusText("Stalemate Detected.");
      return true;
    }
    return false;
  }, [checkWinDynamic, gridSize, winLength]);

  // AI Trigger
  useEffect(() => {
    if (activeGame === 'xo' && !isXTurn && gameActive) {
      setStatusText("AI Computing Node Data...");
      const timer = setTimeout(() => {
        const aiIdx = getAiMove(board);
        if (aiIdx !== null) {
          const newBoard = [...board]; newBoard[aiIdx] = 'O'; setBoard(newBoard);
          if (!handleWinState(newBoard, 'O')) {
            setIsXTurn(true); setStatusText(`Your Turn (X) • Connect ${winLength} to Win`);
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXTurn, gameActive, board, activeGame, getAiMove, handleWinState, winLength]);

  const handleCellClick = (idx: number) => {
    if (board[idx] || !gameActive || !isXTurn) return;
    const newBoard = [...board]; newBoard[idx] = 'X'; setBoard(newBoard);
    if (!handleWinState(newBoard, 'X')) setIsXTurn(false);
  };

  const initGame = (newSize?: number) => {
    const sizeToUse = newSize || gridSize;
    setBoard(Array(sizeToUse * sizeToUse).fill(null));
    setWinningCells([]); setGameActive(true); setIsXTurn(true);
    setStatusText(`Your Turn (X) • Connect ${sizeToUse === 3 ? 3 : sizeToUse === 6 ? 4 : 5} to Win`);
  };

  // --- Render Helpers ---
  const renderPlaceholder = (gameInfo: typeof GAMES[number]) => {
    const theme = THEMES[gameInfo.id] || THEMES.void;
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] border border-white/5 bg-neutral-900/50 rounded-xl relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${theme.bgGlow}`}></div>
        
        <div className="z-10 flex flex-col items-center text-center p-6">
          <div className="w-16 h-16 mb-6 rounded-full border-2 border-white/10 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <span className={`block w-4 h-4 rounded-sm ${theme.dot} animate-pulse`}></span>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-black italic uppercase tracking-widest ${theme.color} ${theme.shadow} mb-2`}>
            {gameInfo.name}
          </h2>
          <p className="text-slate-400 font-mono text-sm tracking-widest mb-8">NEXUS NODE PROTOCOL</p>
          
          <div className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-full bg-black/40 backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme.dot}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${theme.dot}`}></span>
            </span>
            <span className="text-slate-300 font-bold text-xs tracking-widest uppercase">
              Compiling Environment // Standby
            </span>
          </div>
        </div>
        
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none"></div>
      </div>
    );
  };

  return (
    <div id="arcade" className="min-h-screen bg-neutral-950 text-slate-200 flex flex-col items-center p-4 md:p-8 font-sans selection:bg-blue-500/30">
      
      {/* Master Hub Header */}
      <div className="w-full max-w-4xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-black italic tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] text-center md:text-left">
            GESTALT <span className="text-blue-500">Games Showroom</span>
          </h1>
          <p className="text-xs text-slate-500 font-mono tracking-widest text-center md:text-left mt-1">
            SHOWCASE CAPABILITY ARRAY V1.0
          </p>
        </div>
        
        {/* Global Score (Persists across tabs) */}
        <div className="flex items-center gap-4 bg-neutral-900 border border-white/10 px-6 py-2 rounded-lg">
          <span className="text-xs text-slate-500 font-bold tracking-widest">Score</span>
          <span className="font-mono text-2xl font-bold text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">
            {sessionScore}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="w-full max-w-4xl flex flex-wrap justify-center gap-2 mb-8">
        {GAMES.map(game => (
          <button
            key={game.id}
            onClick={() => setActiveGame(game.id as GameId)}
            className={`
              px-4 py-2 text-xs md:text-sm font-bold tracking-widest uppercase rounded-lg transition-all duration-300 border
              ${activeGame === game.id 
                ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                : 'bg-neutral-900 border-white/5 text-slate-400 hover:bg-neutral-800 hover:text-white'}
            `}
          >
            {game.name}
            {game.status === 'OFFLINE' && <span className="ml-2 text-[10px] opacity-50 px-1.5 py-0.5 border border-slate-600 rounded">OFF</span>}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-4xl flex-1 flex flex-col">
        
        {activeGame !== 'xo' ? (
           // Render Placeholders
           renderPlaceholder(GAMES.find(g => g.id === activeGame)!)
        ) : (
          // Render XO Tactics
          <div className="w-full max-w-lg mx-auto flex flex-col">
            {/* Status Bar */}
            <div className={`mb-6 text-sm font-bold text-center py-3 rounded-lg border flex items-center justify-center transition-colors duration-300
              ${!gameActive ? (statusText.includes('Victory') ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' : 'border-red-500/50 bg-red-500/10 text-red-400') 
              : 'border-slate-800 bg-white/5 text-slate-400'}`}
            >
              {statusText}
            </div>

            {/* Dynamic Grid Wrapper */}
            <div className="flex-1 flex items-center justify-center w-full mb-6 relative">
              <div 
                className="w-full aspect-square grid gap-2 bg-neutral-900 p-3 rounded-xl border border-white/5 shadow-[0_0_30px_rgba(59,130,246,0.05)]"
                style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
              >
                {board.map((cell, idx) => {
                  const isWinningCell = winningCells.includes(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleCellClick(idx)}
                      disabled={!gameActive || !!cell || !isXTurn}
                      className={`
                        flex items-center justify-center aspect-square rounded-lg font-bold transition-all duration-200 border border-white/5
                        ${!cell && gameActive && isXTurn ? 'hover:bg-white/10 cursor-pointer' : 'cursor-default'}
                        ${cell ? 'bg-white/5' : 'bg-white/[0.02]'}
                        ${isWinningCell ? 'bg-white/10 border-blue-500 shadow-[inset_0_0_15px_rgba(59,130,246,0.5)] animate-pulse' : ''}
                        ${gridSize === 3 ? 'text-5xl' : gridSize === 6 ? 'text-3xl' : 'text-xl'}
                      `}
                    >
                      {cell === 'X' && <span className="text-blue-500 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]">X</span>}
                      {cell === 'O' && <span className="text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]">O</span>}
                    </button>
                  );
                })}
              </div>

              {/* Round Over Overlay */}
              {!gameActive && (
                <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl border border-white/10 z-10">
                  <h2 className={`text-2xl md:text-3xl font-black tracking-widest mb-2 ${statusText.includes('Victory') ? 'text-emerald-400' : 'text-red-400'}`}>
                    {statusText.includes('Victory') ? 'TACTICAL VICTORY' : statusText.includes('Stalemate') ? 'STALEMATE' : 'SYSTEM OVERRUN'}
                  </h2>
                  <button 
                    onClick={() => initGame()}
                    className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all active:scale-95"
                  >
                    INITIALIZE NEW ROUND
                  </button>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap justify-center gap-3 mt-auto pb-4">
              <select 
                className="bg-neutral-900 border border-white/10 text-slate-300 px-4 py-2 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors"
                value={gridSize}
                onChange={(e) => { const s = parseInt(e.target.value); setGridSize(s); initGame(s); }}
              >
                <option value="3">Grid 3x3</option>
                <option value="6">Grid 6x6</option>
                <option value="9">Grid 9x9</option>
              </select>
              
              <select 
                className="bg-neutral-900 border border-white/10 text-slate-300 px-4 py-2 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              >
                <option value="easy">Casual AI</option>
                <option value="hard">Tactical AI</option>
              </select>

              <button 
                onClick={() => initGame()}
                className="bg-transparent border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 px-6 py-2 rounded-lg text-sm font-bold transition-all"
              >
                Reset Board
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}