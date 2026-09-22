import { useEffect } from 'react';
import { RotateCcw, Trophy, Flame, AlertCircle } from 'lucide-react';
import { RoundResult, TimelineEvent } from '../types';

interface GameOverModalProps {
  streak: number;
  bestStreak: number;
  anchor: TimelineEvent;
  challenger: TimelineEvent;
  result: RoundResult;
  onRestart: () => void;
}

export function GameOverModal({
  streak,
  bestStreak,
  anchor,
  challenger,
  result,
  onRestart,
}: GameOverModalProps) {
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        onRestart();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onRestart]);

  const isNewRecord = streak > 0 && streak >= bestStreak;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/95 p-6 sm:p-7 shadow-2xl">
        
        <div className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400">
            <AlertCircle className="h-6 w-6" />
          </div>
        
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100 uppercase">
            GAME OVER
         </h2>
          
            <p className="mt-1 text-sm font-semibold text-rose-400">
            Missed by {result.difference} year {result.difference === 1 ? '' : 's'}!
            </p>
        </div>

        
        <div className="my-5 rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3.5 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
            <span className="text-zinc-400 truncate max-w-[200px]">{anchor.title}</span>
            <span className="font-mono font-bold text-amber-400">{anchor.year}</span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-zinc-400 truncate max-w-[200px]">{challenger.title}</span>
            <span className="font-mono font-bold text-zinc-200">{challenger.year}</span>
          </div>
          <div className="mt-2 text-center text-[11px] text-zinc-500">
            You guessed {result.userGuess.toUpperCase()}, but it happened in {challenger.year}
          </div>
        </div>

        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/50 p-3">
            <div className="flex items-center gap-1 text-xs text-zinc-400">
              <Flame className="h-3.5 w-3.5 text-amber-500" />
              <span>Final Streak</span>
            </div>
            <span className="mt-1 font-mono text-2xl sm:text-3xl font-bold text-zinc-100">
              {streak}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/50 p-3">
            <div className="flex items-center gap-1 text-xs text-zinc-400">
                <Trophy className="h-3.5 w-3.5 text-yellow-500" />
            <span>Personal Best</span>
            </div>
            <span className="mt-1 font-mono text-2xl sm:text-3xl font-bold text-yellow-400">
              {bestStreak}
            </span>
          </div>
        </div>
       
         {isNewRecord && (
          <div className="mb-4 text-center rounded-lg border border-amber-500/30 bg-amber-500/10 py-1.5 text-xs font-bold text-amber-300">
            NEW PERSONAL BEST!
          </div>
        )}

        
        <button
          onClick={onRestart}
          className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3.5 px-4 font-display text-base font-bold text-zinc-950 shadow-lg shadow-amber-950/30 hover:from-amber-400 hover:to-amber-500 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
          id="button-play-again"
        >
          <RotateCcw className="h-4 w-4 group-hover:-rotate-45 transition-transform" />
          <span>PLAY AGAIN</span>
            <span className="ml-1 rounded bg-zinc-950/20 px-2 py-0.5 text-xs font-mono font-normal">
            Space
          </span>
        </button>
      </div>
    </div>
  );
}
            