"use client";

import React, { useState, useEffect, useCallback } from 'react';

type Player = 'X' | 'O' | null;

export default function XOLabs({ onScore }: { onScore: (pts: number) => void }) {
  const [gridSize, setGridSize] = useState(3);
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [gameActive, setGameActive] = useState(true);
  const [status, setStatus] = useState("Your Turn (X)");
  const [winningCells, setWinningCells] = useState<number[]>([]);

  const winLength = gridSize === 3 ? 3 : gridSize === 6 ? 4 : 5;

  const checkWin = useCallback((b: Player[], p: Player) => {
    // Standard multidirectional check from source logic
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c <= gridSize - winLength; c++) {
        let win = true; let combo = [];
        for (let i = 0; i < winLength; i++) {
          let idx = r * gridSize + (c + i);
          if (b[idx] !== p) { win = false; break; }
          combo.push(idx);
        }
        if (win) return combo;
      }
    }
    for (let c = 0; c < gridSize; c++) {
      for (let r = 0; r <= gridSize - winLength; r++) {
        let win = true; let combo = [];
        for (let i = 0; i < winLength; i++) {
          let idx = (r + i) * gridSize + c;
          if (b[idx] !== p) { win = false; break; }
          combo.push(idx);
        }
        if (win) return combo;
      }
    }
    for (let r = 0; r <= gridSize - winLength; r++) {
      for (let c = 0; c <= gridSize - winLength; c++) {
        let win = true; let combo = [];
        for (let i = 0; i < winLength; i++) {
          let idx = (r + i) * gridSize + (c + i);
          if (b[idx] !== p) { win = false; break; }
          combo.push(idx);
        }
        if (win) return combo;
      }
    }
    for (let r = 0; r <= gridSize - winLength; r++) {
      for (let c = winLength - 1; c < gridSize; c++) {
        let win = true; let combo = [];
        for (let i = 0; i < winLength; i++) {
          let idx = (r + i) * gridSize + (c - i);
          if (b[idx] !== p) { win = false; break; }
          combo.push(idx);
        }
        if (win) return combo;
      }
    }
    return null;
  }, [gridSize, winLength]);

  const handleState = useCallback((b: Player[], p: Player) => {
    const combo = checkWin(b, p);
    if (combo) {
      setGameActive(false); setWinningCells(combo);
      if (p === 'X') {
        const pts = gridSize === 3 ? 150 : gridSize === 6 ? 450 : 1500;
        onScore(pts); setStatus("Victory Achieved.");
      } else {
        setStatus("System Overrun.");
      }
      return true;
    }
    if (b.every(c => c !== null)) {
      setGameActive(false); onScore(50); setStatus("Stalemate Detected.");
      return true;
    }
    return false;
  }, [checkWin, gridSize, onScore]);

  useEffect(() => {
    if (!isXTurn && gameActive) {
      setStatus("AI Computing...");
      const timer = setTimeout(() => {
        const avail = board.map((v, i) => v === null ? i : null).filter(v => v !== null) as number[];
        if (avail.length === 0) return;
        const aiIdx = avail[Math.floor(Math.random() * avail.length)]; // Simplified fallback AI
        const newBoard = [...board]; newBoard[aiIdx] = 'O'; setBoard(newBoard);
        if (!handleState(newBoard, 'O')) { setIsXTurn(true); setStatus("Your Turn (X)"); }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isXTurn, gameActive, board, handleState]);

  const clickCell = (idx: number) => {
    if (board[idx] || !gameActive || !isXTurn) return;
    const newBoard = [...board]; newBoard[idx] = 'X'; setBoard(newBoard);
    if (!handleState(newBoard, 'X')) setIsXTurn(false);
  };

  const init = (size = gridSize) => {
    setGridSize(size); setBoard(Array(size * size).fill(null)); setWinningCells([]);
    setGameActive(true); setIsXTurn(true); setStatus(`Your Turn (X)`);
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col">
      <div className="mb-4 text-center text-slate-400 font-bold bg-white/5 py-2 rounded">{status}</div>
      <div className="w-full aspect-square grid gap-2 bg-neutral-900 p-3 rounded-xl border border-white/5" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
        {board.map((cell, idx) => (
          <button key={idx} onClick={() => clickCell(idx)} className={`flex items-center justify-center aspect-square rounded font-bold text-2xl ${cell ? 'bg-white/5' : 'bg-white/[0.02]'} ${winningCells.includes(idx) ? 'border border-blue-500' : ''}`}>
            {cell === 'X' && <span className="text-blue-500">X</span>}
            {cell === 'O' && <span className="text-red-500">O</span>}
          </button>
        ))}
      </div>
      <div className="flex gap-4 mt-6 justify-center">
        <select value={gridSize} onChange={(e) => init(parseInt(e.target.value))} className="bg-neutral-900 border border-white/10 text-slate-300 px-4 py-2 rounded">
          <option value="3">Grid 3x3</option>
          <option value="6">Grid 6x6</option>
          <option value="9">Grid 9x9</option>
        </select>
        <button onClick={() => init()} className="bg-blue-600 text-white font-bold px-6 py-2 rounded">Reset Board</button>
      </div>
    </div>
  );
}