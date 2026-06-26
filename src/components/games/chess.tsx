"use client";

import React, { useState, useEffect, useCallback } from 'react';

// --- Chess Constants & Scoring Weights ---
const PIECES: Record<string, string> = {
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙', // White (Player)
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'  // Black (AI)
};

const VALUES: Record<string, number> = { 'p': 10, 'n': 30, 'b': 30, 'r': 50, 'q': 90, 'k': 10000 };
const CAPTURE_POINTS: Record<string, number> = { 'p': 10, 'n': 30, 'b': 30, 'r': 50, 'q': 90, 'k': 1500 };

const INITIAL_SETUP = [
  'r','n','b','q','k','b','n','r',
  'p','p','p','p','p','p','p','p',
  null,null,null,null,null,null,null,null,
  null,null,null,null,null,null,null,null,
  null,null,null,null,null,null,null,null,
  null,null,null,null,null,null,null,null,
  'P','P','P','P','P','P','P','P',
  'R','N','B','Q','K','B','N','R'
];

interface Move {
  from: number;
  to: number;
}

interface ChessProps {
  onScore?: (points: number) => void;
}

export default function TacticalChess({ onScore }: ChessProps) {
  // --- Game State ---
  const [board, setBoard] = useState<(string | null)[]>( [...INITIAL_SETUP] );
  const [currentTurn, setCurrentTurn] = useState<'w' | 'b'>('w');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [gameActive, setGameActive] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>("Your Turn (White)");
  const [moveLog, setMoveLog] = useState<string[]>(["System initialized."]);
  const [gameOverModal, setGameOverModal] = useState<{ show: boolean; winner: 'w' | 'b' | null }>({ show: false, winner: null });

  // --- Aesthetic Customization ---
  const [playerColor, setPlayerColor] = useState<string>('#1190ff');
  const [aiColor, setAiColor] = useState<string>('#ef4444');

  // --- Helper Functions ---
  const isWhite = (piece: string | null) => piece && piece === piece.toUpperCase();
  const isBlack = (piece: string | null) => piece && piece === piece.toLowerCase();
  const getColor = (piece: string | null) => isWhite(piece) ? 'w' : 'b';

  const logMessage = useCallback((msg: string) => {
    setMoveLog(prev => [`> ${msg}`, ...prev]);
  }, []);

  // --- Move Generation Architecture ---
  const getMovesForPiece = useCallback((idx: number, currentBoard = board): number[] => {
    let moves: number[] = [];
    let piece = currentBoard[idx];
    if (!piece) return moves;

    let color = getColor(piece);
    let type = piece.toLowerCase();
    let row = Math.floor(idx / 8);
    let col = idx % 8;

    const addMove = (r: number, c: number) => {
      if (r >= 0 && r < 8 && c >= 0 && c < 8) {
        let targetIdx = r * 8 + c;
        let targetPiece = currentBoard[targetIdx];
        if (!targetPiece) { moves.push(targetIdx); return true; }
        if (getColor(targetPiece) !== color) { moves.push(targetIdx); }
        return false;
      }
      return false;
    };

    const slide = (dr: number, dc: number) => {
      let r = row + dr, c = col + dc;
      while (addMove(r, c)) { r += dr; c += dc; }
    };

    if (type === 'r' || type === 'q') { slide(1, 0); slide(-1, 0); slide(0, 1); slide(0, -1); }
    if (type === 'b' || type === 'q') { slide(1, 1); slide(1, -1); slide(-1, 1); slide(-1, -1); }

    if (type === 'n') {
      const jumps = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
      jumps.forEach(j => {
        let r = row + j[0], c = col + j[1];
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
          let t = currentBoard[r * 8 + c];
          if (!t || getColor(t) !== color) moves.push(r * 8 + c);
        }
      });
    }

    if (type === 'k') {
      const steps = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      steps.forEach(s => {
        let r = row + s[0], c = col + s[1];
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
          let t = currentBoard[r * 8 + c];
          if (!t || getColor(t) !== color) moves.push(r * 8 + c);
        }
      });
    }

    if (type === 'p') {
      let dir = color === 'w' ? -1 : 1;
      let startRow = color === 'w' ? 6 : 1;

      if (row + dir >= 0 && row + dir < 8 && !currentBoard[(row + dir) * 8 + col]) {
        moves.push((row + dir) * 8 + col);
        if (row === startRow && !currentBoard[(row + dir * 2) * 8 + col]) moves.push((row + dir * 2) * 8 + col);
      }
      if (row + dir >= 0 && row + dir < 8) {
        if (col > 0 && currentBoard[(row + dir) * 8 + (col - 1)] && getColor(currentBoard[(row + dir) * 8 + (col - 1)]) !== color) moves.push((row + dir) * 8 + (col - 1));
        if (col < 7 && currentBoard[(row + dir) * 8 + (col + 1)] && getColor(currentBoard[(row + dir) * 8 + (col + 1)]) !== color) moves.push((row + dir) * 8 + (col + 1));
      }
    }

    return moves;
  }, [board]);

  const getAllMoves = useCallback((color: 'w' | 'b', currentBoard = board): Move[] => {
    let allMoves: Move[] = [];
    for (let i = 0; i < 64; i++) {
      if (currentBoard[i] && getColor(currentBoard[i]) === color) {
        let moves = getMovesForPiece(i, currentBoard);
        moves.forEach(m => allMoves.push({ from: i, to: m }));
      }
    }
    return allMoves;
  }, [board, getMovesForPiece]);

  // --- End Game Handler ---
  const endGame = useCallback((winnerColor: 'w' | 'b') => {
    setGameActive(false);
    if (winnerColor === 'w') {
      setStatusText("System Defeated. White Wins.");
      logMessage("Victory.");
    } else {
      setStatusText("Polymath Overrun. Black Wins.");
      logMessage("Defeat.");
    }
    setGameOverModal({ show: true, winner: winnerColor });
  }, [logMessage]);

  // --- Core Game Move Execution ---
  const executeMove = useCallback((from: number, to: number, isPlayer: boolean) => {
    setBoard(prevBoard => {
      const nextBoard = [...prevBoard];
      let piece = nextBoard[from];
      let captured = nextBoard[to];

      nextBoard[to] = piece;
      nextBoard[from] = null;

      // Pawn Promotion
      if (piece === 'P' && Math.floor(to / 8) === 0) nextBoard[to] = 'Q';
      if (piece === 'p' && Math.floor(to / 8) === 7) nextBoard[to] = 'q';

      // Scoring mechanics triggered here safely
      if (isPlayer && captured && isBlack(captured)) {
        let pts = CAPTURE_POINTS[captured.toLowerCase()] || 0;
        setScore(prev => {
          const newScore = prev + pts;
          if (onScore) onScore(pts);
          return newScore;
        });
        logMessage(`Captured ${captured.toUpperCase()} (+${pts} Pts)`);
      }

      if (captured === 'k') setTimeout(() => endGame('w'), 10);
      if (captured === 'K') setTimeout(() => endGame('b'), 10);

      return nextBoard;
    });
  }, [endGame, logMessage, onScore]);

  // --- Minimax AI Logic Engine ---
  const evaluateBoard = (b: (string | null)[]) => {
    let scoreVal = 0;
    for (let i = 0; i < 64; i++) {
      if (b[i]) {
        let val = VALUES[b[i]!.toLowerCase()] || 0;
        if (isWhite(b[i])) scoreVal -= val;
        else scoreVal += val;
      }
    }
    return scoreVal;
  };

  const minimax = useCallback((b: (string | null)[], depth: number, alpha: number, beta: number, isMaximizing: boolean): number => {
    if (depth === 0) return evaluateBoard(b);
    let moves = getAllMoves(isMaximizing ? 'b' : 'w', b);
    if (moves.length === 0) return isMaximizing ? -10000 : 10000;

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let move of moves) {
        let tempB = [...b];
        tempB[move.to] = tempB[move.from]; tempB[move.from] = null;
        if (tempB[move.to] === 'p' && Math.floor(move.to / 8) === 7) tempB[move.to] = 'q';

        let ev = minimax(tempB, depth - 1, alpha, beta, false);
        maxEval = Math.max(maxEval, ev);
        alpha = Math.max(alpha, ev);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let move of moves) {
        let tempB = [...b];
        tempB[move.to] = tempB[move.from]; tempB[move.from] = null;
        if (tempB[move.to] === 'P' && Math.floor(move.to / 8) === 0) tempB[move.to] = 'Q';

        let ev = minimax(tempB, depth - 1, alpha, beta, true);
        minEval = Math.min(minEval, ev);
        beta = Math.min(beta, ev);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  }, [getAllMoves]);

  const aiMove = useCallback(() => {
    if (!gameActive) return;
    let moves = getAllMoves('b');
    if (moves.length === 0) return;

    let bestScore = -Infinity;
    let bestMoves: Move[] = [];

    for (let move of moves) {
      let tempB = [...board];
      tempB[move.to] = tempB[move.from]; tempB[move.from] = null;
      if (tempB[move.to] === 'p' && Math.floor(move.to / 8) === 7) tempB[move.to] = 'q';

      if (board[move.to] === 'K') { bestMoves = [move]; break; }

      let scoreVal = minimax(tempB, 2, -Infinity, Infinity, false);
      if (scoreVal > bestScore) {
        bestScore = scoreVal; bestMoves = [move];
      } else if (scoreVal === bestScore) {
        bestMoves.push(move);
      }
    }

    let chosenMove = bestMoves[Math.floor(Math.random() * bestMoves.length)];
    executeMove(chosenMove.from, chosenMove.to, false);
    logMessage(`AI Moved.`);

    if (gameActive) {
      setCurrentTurn('w');
      setStatusText("Your Turn (White)");
    }
  }, [board, gameActive, getAllMoves, executeMove, logMessage, minimax]);

  // Turn Cycle monitor
  useEffect(() => {
    if (currentTurn === 'b' && gameActive) {
      const aiTimer = setTimeout(() => {
        aiMove();
      }, 300);
      return () => clearTimeout(aiTimer);
    }
  }, [currentTurn, gameActive, aiMove]);

  // --- Click Handler Interactivity ---
  const handleSquareClick = (idx: number) => {
    if (!gameActive || currentTurn !== 'w') return;

    if (board[idx] && getColor(board[idx]) === 'w') {
      setSelectedIdx(idx);
      return;
    }

    if (selectedIdx !== null) {
      let validMoves = getMovesForPiece(selectedIdx);
      if (validMoves.includes(idx)) {
        executeMove(selectedIdx, idx, true);
        if (!gameActive) return;
        setCurrentTurn('b');
        setSelectedIdx(null);
        setStatusText("AI Computing...");
      } else {
        setSelectedIdx(null);
      }
    }
  };

  const resetGame = () => {
    setBoard([...INITIAL_SETUP]);
    setCurrentTurn('w');
    setSelectedIdx(null);
    setGameActive(true);
    setScore(0);
    setStatusText("Your Turn (White)");
    setMoveLog(["Board Reset Initiated."]);
    setGameOverModal({ show: false, winner: null });
  };

  const validMoves = selectedIdx !== null ? getMovesForPiece(selectedIdx) : [];

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl mx-auto items-stretch">
      {/* 8x8 Board Container */}
      <div className="flex-1 flex justify-center items-center relative">
        <div className="grid grid-cols-8 grid-rows-8 w-full max-w-[450px] aspect-square border-2 border-white/10 rounded overflow-hidden shadow-2xl bg-neutral-950">
          {board.map((piece, i) => {
            const r = Math.floor(i / 8);
            const c = i % 8;
            const isDark = (r + c) % 2 !== 0;
            const isSelected = i === selectedIdx;
            const isValidMove = validMoves.includes(i);

            return (
              <div
                key={i}
                onClick={() => handleSquareClick(i)}
                className={`flex justify-center items-center aspect-square select-none cursor-pointer transition-colors relative text-3xl md:text-4xl
                  ${isDark ? 'bg-slate-800' : 'bg-slate-700'}
                  ${isSelected ? '!bg-white/30' : ''}
                `}
              >
                {piece && (
                  <span
                    className={`font-semibold ${isWhite(piece) ? 'text-white' : 'text-neutral-900'}`}
                    style={{
                      textShadow: isWhite(piece)
                        ? `0 0 10px ${playerColor}, 0 0 20px ${playerColor}`
                        : `0 0 10px ${aiColor}, 0 0 20px ${aiColor}`
                    }}
                  >
                    {PIECES[piece]}
                  </span>
                )}
                {isValidMove && (
                  <span className="absolute w-3 h-3 bg-emerald-500/80 rounded-full shadow-[0_0_10px_#10b981] pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Side Control Configuration HUD */}
      <div className="w-full md:w-[280px] bg-neutral-900/60 border border-white/5 p-4 rounded-xl flex flex-col gap-4 font-sans text-sm">
        <div className="text-center py-2 font-bold bg-neutral-950 border border-slate-800 rounded">
          {statusText}
        </div>

        <div className="bg-neutral-950 p-4 rounded-lg border border-slate-800 text-center">
          <div className="text-xs text-slate-500 font-bold tracking-wider mb-1">SCORE</div>
          <div className="text-3xl font-mono font-bold text-blue-500">{score}</div>
        </div>

        {/* Aura Palette Customizers */}
        <div className="flex flex-col gap-2 bg-neutral-950/40 p-3 rounded border border-white/5">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-medium">Player Aura</span>
            <input type="color" value={playerColor} onChange={(e) => setPlayerColor(e.target.value)} className="w-8 h-8 rounded border-none bg-transparent cursor-pointer" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-medium">AI Aura</span>
            <input type="color" value={aiColor} onChange={(e) => setAiColor(e.target.value)} className="w-8 h-8 rounded border-none bg-transparent cursor-pointer" />
          </div>
        </div>

        <button onClick={resetGame} className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded font-bold text-white transition-transform active:scale-95">
          Restart Match
        </button>

        {/* Action Logs */}
        <div className="flex-1 bg-neutral-950 border border-slate-800 p-2 rounded max-h-[140px] overflow-y-auto font-mono text-[11px] text-slate-500 flex flex-col gap-1">
          {moveLog.map((log, index) => (
            <div key={index} className="border-b border-white/5 pb-1">{log}</div>
          ))}
        </div>
      </div>

      {/* Match Outcome Overlay Modal */}
      {gameOverModal.show && (
        <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-neutral-900 border border-white/10 p-8 rounded-xl max-w-xs w-full text-center shadow-2xl">
            <h2 className={`text-2xl font-black tracking-wider uppercase mb-1 ${gameOverModal.winner === 'w' ? 'text-emerald-400' : 'text-red-400'}`}>
              {gameOverModal.winner === 'w' ? 'CHECKMATE' : 'SYSTEM OVERRUN'}
            </h2>
            <div className="text-slate-400 text-xs mb-6 font-mono">MATCH COMPLETED</div>
            <button onClick={resetGame} className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold text-white shadow-lg shadow-blue-600/30">
              PLAY AGAIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}