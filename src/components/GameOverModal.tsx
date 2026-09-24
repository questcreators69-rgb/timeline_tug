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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0D]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md overflow-hidden rounded-sm border border-[#D4A359]/40 bg-[#0E0E12] p-6 sm:p-7 shadow-brass-lg">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-sm border border-rose-500/40 bg-rose-500/10 text-rose-400">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h2 className="font-syne text-2xl sm:text-3xl font-black tracking-wider text-[#F3EFE6] uppercase">
            GAME OVER
          </h2>
          <p className="mt-1 text-xs font-mono font-bold text-rose-400 uppercase tracking-widest">
            Missed by {result.difference} year{result.difference === 1 ? '' : 's'}
            </p>
        </div>

        <div className="my-5 rounded-sm border border-stone-800 bg-[#0A0A0D] p-4 text-xs font-mono">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <span className="text-stone-400 truncate max-w-[200px]">{anchor.title}</span>
            <span className="font-cinzel font-bold text-[#D4A359]">{anchor.year}</span>
          </div> 
         <div className="flex items-center justify-between pt-2">
            <span className="text-stone-400 truncate max-w-[200px]">{challenger.title}</span> 
           <span className="font-cinzel font-bold text-[#F3EFE6]">{challenger.year}</span>   
       </div> 
         <div className="mt-3 text-center text-[11px] text-stone-500 uppercase tracking-wider">
            You guessed {result.userGuess}, but it occurred in {challenger.year}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex flex-col items-center justify-center rounded-sm border border-stone-800 bg-[#0A0A0D] p-3">
            <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono">
              <Flame className="h-3.5 w-3.5 text-[#D4A359]" />
              <span>FINAL STREAK</span>
            </div>
            <span className="mt-1 font-mono text-2xl sm:text-3xl font-bold text-[#F3EFE6]">
              {streak}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-sm border border-stone-800 bg-[#0A0A0D] p-3">
            <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono">
              <Trophy className="h-3.5 w-3.5 text-[#D4A359]" />
              <span>BEST STREAK</span>
            </div> 
           <span className="mt-1 font-mono text-2xl sm:text-3xl font-bold text-[#D4A359]">
              {bestStreak}
            </span>
          </div>
        </div>

        {isNewRecord && (
          <div className="mb-4 text-center rounded-sm border border-[#D4A359]/50 bg-[#D4A359]/10 py-2 text-xs font-mono font-bold text-[#D4A359] tracking-widest uppercase">
            NEW RECORD ACHIEVED!
          </div>
        )}

        <button 
         onClick={onRestart}
          className="group relative flex w-full items-center justify-center gap-2.5 rounded-sm bg-[#D4A359] py-3.5 px-4 font-syne text-base font-extrabold text-[#0A0A0D] shadow-brass hover:bg-[#E5B56A] active:translate-y-0.5 transition-all duration-150 ease-spring focus:outline-none"
          id="button-play-again"
        >
          <RotateCcw className="h-4 w-4 group-hover:-rotate-45 transition-transform ease-spring" />
          <span>TRY AGAIN</span>
          <span className="ml-1 rounded-sm bg-[#0A0A0D]/20 px-2 py-0.5 text-xs font-mono">
            Space
          </span>
        </button> 
     </div>
    </div>
  );
}           