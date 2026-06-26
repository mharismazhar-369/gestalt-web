"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- Types & Interfaces ---
interface Cell {
  r: number;
  c: number;
  walls: { top: boolean; right: boolean; bottom: boolean; left: boolean };
  visited: boolean; // Used strictly for DFS generation
}

interface Position {
  r: number;
  c: number;
}

interface MazeLabProps {
  onScore?: (points: number) => void;
}

export default function MazeLab({ onScore }: MazeLabProps) {
  // --- Game State ---
  const [size, setSize] = useState<number>(15);
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [player, setPlayer] = useState<Position>({ r: 0, c: 0 });
  const [moves, setMoves] = useState<number>(0);
  const [path, setPath] = useState<Position[]>([]);
  
  const [autoMode, setAutoMode] = useState<boolean>(false);
  const [usedAuto, setUsedAuto] = useState<boolean>(false);
  const [sessionScore, setSessionScore] = useState<number>(0);
  const [wallColor, setWallColor] = useState<string>('#06b6d4');
  const [gameOverModal, setGameOverModal] = useState<{ show: boolean; pts: number }>({ show: false, pts: 0 });

  const autoInterval = useRef<NodeJS.Timeout | null>(null);

  // --- Maze Generation (DFS Algorithm) ---
  const generateMaze = useCallback((mazeSize: number) => {
    const g: Cell[][] = [];
    for (let i = 0; i < mazeSize; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < mazeSize; j++) {
        row.push({
          r: i, c: j,
          walls: { top: true, right: true, bottom: true, left: true },
          visited: false
        });
      }
      g.push(row);
    }

    const stack: Cell[] = [];
    let current = g[0][0];
    current.visited = true;
    stack.push(current);

    while (stack.length > 0) {
      current = stack[stack.length - 1];
      const { r: cr, c: cc } = current;
      const neighbors: { cell: Cell; dir: string }[] = [];

      const tryPush = (nr: number, nc: number, dir: string) => {
        if (nr >= 0 && nr < mazeSize && nc >= 0 && nc < mazeSize && !g[nr][nc].visited) {
          neighbors.push({ cell: g[nr][nc], dir });
        }
      };

      tryPush(cr - 1, cc, 'top');
      tryPush(cr, cc + 1, 'right');
      tryPush(cr + 1, cc, 'bottom');
      tryPush(cr, cc - 1, 'left');

      if (neighbors.length > 0) {
        const choice = neighbors[Math.floor(Math.random() * neighbors.length)];
        const next = choice.cell;
        const dir = choice.dir;

        if (dir === 'top') { current.walls.top = false; next.walls.bottom = false; }
        if (dir === 'right') { current.walls.right = false; next.walls.left = false; }
        if (dir === 'bottom') { current.walls.bottom = false; next.walls.top = false; }
        if (dir === 'left') { current.walls.left = false; next.walls.right = false; }

        next.visited = true;
        stack.push(next);
      } else {
        stack.pop();
      }
    }

    // Reset visited flags just in case
    for (let i = 0; i < mazeSize; i++) {
      for (let j = 0; j < mazeSize; j++) {
        g[i][j].visited = false;
      }
    }

    setGrid(g);
    setPlayer({ r: 0, c: 0 });
    setMoves(0);
    setPath([]);
    setUsedAuto(false);
    setAutoMode(false);
    if (autoInterval.current) clearInterval(autoInterval.current);
  }, []);

  // --- Initialize Maze on Mount ---
  useEffect(() => {
    generateMaze(size);
  }, [size, generateMaze]);

  // --- Pathfinding (BFS Solver) ---
  const solveBFS = useCallback((start: Position, goal: Position, b: Cell[][]) => {
    if (b.length === 0) return null;
    const visited = Array.from({ length: size }, () => Array(size).fill(false));
    const parent = Array.from({ length: size }, () => Array(size).fill<Position | null>(null));
    const q: Position[] = [start];
    
    visited[start.r][start.c] = true;

    while (q.length > 0) {
      const cur = q.shift()!;
      if (cur.r === goal.r && cur.c === goal.c) {
        const pathArr: Position[] = [];
        let p: Position | null = cur;
        while (p) {
          pathArr.push({ r: p.r, c: p.c });
          p = parent[p.r][p.c];
        }
        return pathArr.reverse();
      }

      const cell = b[cur.r][cur.c];
      const ns: Position[] = [];
      if (!cell.walls.top && cur.r > 0) ns.push({ r: cur.r - 1, c: cur.c });
      if (!cell.walls.right && cur.c < size - 1) ns.push({ r: cur.r, c: cur.c + 1 });
      if (!cell.walls.bottom && cur.r < size - 1) ns.push({ r: cur.r + 1, c: cur.c });
      if (!cell.walls.left && cur.c > 0) ns.push({ r: cur.r, c: cur.c - 1 });

      for (const n of ns) {
        if (!visited[n.r][n.c]) {
          visited[n.r][n.c] = true;
          parent[n.r][n.c] = cur;
          q.push(n);
        }
      }
    }
    return null;
  }, [size]);

  // --- Movement & Mechanics ---
  const tryMove = useCallback((dr: number, dc: number) => {
    if (autoMode || grid.length === 0 || gameOverModal.show) return;

    setPlayer(prev => {
      const curCell = grid[prev.r][prev.c];
      let nr = prev.r, nc = prev.c;
      let moved = false;

      if (dr === -1 && !curCell.walls.top) { nr -= 1; moved = true; }
      if (dr === 1 && !curCell.walls.bottom) { nr += 1; moved = true; }
      if (dc === -1 && !curCell.walls.left) { nc -= 1; moved = true; }
      if (dc === 1 && !curCell.walls.right) { nc += 1; moved = true; }

      if (moved) {
        setMoves(m => m + 1);
        setPath([]); // clear visual path if user manually moves
        return { r: nr, c: nc };
      }
      return prev;
    });
  }, [autoMode, grid, gameOverModal.show]);

  // Core Keybindings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "w"].includes(e.key)) { e.preventDefault(); tryMove(-1, 0); }
      if (["ArrowDown", "s"].includes(e.key)) { e.preventDefault(); tryMove(1, 0); }
      if (["ArrowLeft", "a"].includes(e.key)) { e.preventDefault(); tryMove(0, -1); }
      if (["ArrowRight", "d"].includes(e.key)) { e.preventDefault(); tryMove(0, 1); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tryMove]);

  // Win Condition Checker
  useEffect(() => {
    if (grid.length > 0 && player.r === size - 1 && player.c === size - 1 && !gameOverModal.show) {
      if (autoInterval.current) clearInterval(autoInterval.current);
      setAutoMode(false);

      const pts = usedAuto ? 0 : size * 10;
      setSessionScore(prev => {
        const newScore = prev + pts;
        if (onScore && pts > 0) onScore(pts);
        return newScore;
      });

      setTimeout(() => {
        setGameOverModal({ show: true, pts });
      }, 300);
    }
  }, [player, size, grid, gameOverModal.show, usedAuto, onScore]);

  // --- UI Action Handlers ---
  const handleShowPath = () => {
    const p = solveBFS(player, { r: size - 1, c: size - 1 }, grid);
    if (p) {
      setPath(p);
      setUsedAuto(true);
    }
  };

  const handleAutoRun = () => {
    if (autoMode) {
      setAutoMode(false);
      if (autoInterval.current) clearInterval(autoInterval.current);
      return;
    }

    const p = solveBFS(player, { r: size - 1, c: size - 1 }, grid);
    if (!p) return;
    
    setUsedAuto(true);
    setAutoMode(true);
    let i = 1;
    
    autoInterval.current = setInterval(() => {
      if (!p[i]) {
        setAutoMode(false);
        if (autoInterval.current) clearInterval(autoInterval.current);
        return;
      }
      setPlayer({ r: p[i].r, c: p[i].c });
      setMoves(m => m + 1);
      i++;
    }, Math.max(40, 150 - Math.min(100, size * 3)));
  };

  const handleResetPlayer = () => {
    setAutoMode(false);
    if (autoInterval.current) clearInterval(autoInterval.current);
    setPlayer({ r: 0, c: 0 });
    setMoves(0);
    setPath([]);
  };

  const startNextRound = () => {
    setGameOverModal({ show: false, pts: 0 });
    generateMaze(size);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl mx-auto items-stretch">
      
      {/* Maze Render Container */}
      <div className="flex-[2] bg-[#02040a] border-2 border-slate-800 rounded-xl p-2 md:p-4 shadow-[0_0_40px_rgba(6,182,212,0.05)] relative flex items-center justify-center min-h-[400px]">
        <div 
          className="grid w-full aspect-square bg-transparent transition-transform duration-300 select-none"
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
        >
          {grid.map((row, rIdx) => (
            row.map((cell, cIdx) => {
              const isPlayer = player.r === cell.r && player.c === cell.c;
              const isGoal = cell.r === size - 1 && cell.c === size - 1;
              const isPath = path.some(p => p.r === cell.r && p.c === cell.c) && !isPlayer && !isGoal;
              
              return (
                <div key={`${rIdx}-${cIdx}`} className="relative box-border aspect-square">
                  
                  {/* Dynamic Walls */}
                  {cell.walls.top && <div className="absolute top-0 left-0 right-0 h-[2px] -translate-y-[1px] z-10" style={{ backgroundColor: wallColor, boxShadow: `0 0 8px ${wallColor}` }} />}
                  {cell.walls.right && <div className="absolute top-0 bottom-0 right-0 w-[2px] translate-x-[1px] z-10" style={{ backgroundColor: wallColor, boxShadow: `0 0 8px ${wallColor}` }} />}
                  {cell.walls.bottom && <div className="absolute bottom-0 left-0 right-0 h-[2px] translate-y-[1px] z-10" style={{ backgroundColor: wallColor, boxShadow: `0 0 8px ${wallColor}` }} />}
                  {cell.walls.left && <div className="absolute top-0 bottom-0 left-0 w-[2px] -translate-x-[1px] z-10" style={{ backgroundColor: wallColor, boxShadow: `0 0 8px ${wallColor}` }} />}
                  
                  {/* Entities */}
                  {isPath && <div className="absolute inset-1 bg-amber-500/20 rounded" />}
                  {isGoal && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[60%] h-[60%] rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.9)] animate-pulse" />
                    </div>
                  )}
                  {isPlayer && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="w-[60%] h-[60%] rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.9)] transition-all duration-100" />
                    </div>
                  )}
                </div>
              );
            })
          ))}
        </div>
      </div>

      {/* Control Panel */}
      <div className="flex-1 bg-neutral-900/80 border border-slate-800 p-5 rounded-xl flex flex-col gap-5 backdrop-blur-sm min-w-[280px]">
        
        {/* Stats HUD */}
        <div className="bg-[#02040a] p-4 rounded-lg border border-slate-800 text-center">
          <div className="text-[10px] text-slate-500 font-bold tracking-widest mb-2">CURRENT RUN</div>
          <div className="flex justify-between text-xs text-slate-400 font-bold mb-1">
            <span>Moves:</span> <span className="font-mono text-cyan-400 text-sm">{moves}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-400 font-bold">
            <span>Target:</span> <span className="font-mono text-cyan-400 text-sm">{size - 1},{size - 1}</span>
          </div>
        </div>

        {/* Aura Palette */}
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 bg-white/5 p-3 rounded-lg border border-slate-800">
          <span>AURA PALETTE</span>
          <input 
            type="color" 
            value={wallColor} 
            onChange={(e) => setWallColor(e.target.value)} 
            className="w-8 h-8 rounded border-none bg-transparent cursor-pointer" 
          />
        </div>

        {/* Complexity Slider */}
        <div>
          <label className="flex justify-between text-xs font-bold text-slate-400 mb-2">
            COMPLEXITY <span className="text-white">{size}×{size}</span>
          </label>
          <input 
            type="range" 
            min="7" max="31" step="2" 
            value={size} 
            onChange={(e) => setSize(parseInt(e.target.value))} 
            className="w-full accent-cyan-500" 
          />
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <button onClick={() => generateMaze(size)} className="col-span-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-black py-3 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95 transition-transform tracking-wider">
            GENERATE MATRIX
          </button>
          <button onClick={handleShowPath} className="bg-neutral-800 border border-white/10 text-slate-300 font-bold py-2 rounded-lg text-xs hover:border-cyan-500 hover:text-white transition-colors">
            Show Path
          </button>
          <button onClick={handleAutoRun} className={`border border-white/10 font-bold py-2 rounded-lg text-xs transition-colors ${autoMode ? 'bg-red-500/20 text-red-500 border-red-500' : 'bg-neutral-800 text-slate-300 hover:border-cyan-500 hover:text-white'}`}>
            {autoMode ? 'Stop Auto' : 'Auto-Run'}
          </button>
          <button onClick={handleResetPlayer} className="col-span-2 bg-transparent border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 py-2 rounded-lg font-bold text-xs transition-all">
            Reset Entity
          </button>
        </div>

        {/* Mobile D-PAD (Visible on small screens only) */}
        <div className="md:hidden grid grid-cols-3 gap-2 mt-4 max-w-[200px] mx-auto">
          <div />
          <button onClick={() => tryMove(-1, 0)} className="bg-slate-800 text-white p-3 rounded font-bold active:bg-cyan-500">▲</button>
          <div />
          <button onClick={() => tryMove(0, -1)} className="bg-slate-800 text-white p-3 rounded font-bold active:bg-cyan-500">◀</button>
          <button onClick={() => tryMove(1, 0)} className="bg-slate-800 text-white p-3 rounded font-bold active:bg-cyan-500">▼</button>
          <button onClick={() => tryMove(0, 1)} className="bg-slate-800 text-white p-3 rounded font-bold active:bg-cyan-500">▶</button>
        </div>
      </div>

      {/* Round End Modal */}
      {gameOverModal.show && (
        <div className="fixed inset-0 bg-[#02040a]/95 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0b1220] border border-cyan-500 p-8 rounded-2xl text-center max-w-[320px] w-full shadow-[0_0_40px_rgba(6,182,212,0.2)]">
            <h2 className={`text-xl font-black tracking-wider mb-2 ${usedAuto ? 'text-slate-400' : 'text-emerald-500'}`}>
              {usedAuto ? 'AUTO-SOLVED' : 'MATRIX SOLVED'}
            </h2>
            <div className="text-white text-5xl font-black my-4">+{gameOverModal.pts}</div>
            <div className="text-slate-500 text-xs tracking-widest mb-6">POINTS EXTRACTED</div>
            <button onClick={startNextRound} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-black py-3 rounded-lg active:scale-95 transition-transform tracking-wider">
              DEEPEN COMPLEXITY
            </button>
          </div>
        </div>
      )}
    </div>
  );
}