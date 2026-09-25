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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0e0c1a]/85 backdrop-blur-sm animate-fadeIn select-none">
  <div className="relative w-full max-w-md bg-[#6D421F] border-2 sm:border-3 border-[#26160A] p-2.5 sm:p-3 shadow-pixel-lg">
    <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-[#26160A]" />
    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#26160A]" />
    <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-[#26160A]" />
    <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#26160A]" />

    <div className="bg-[#171426] border-2 border-[#8F5F34] p-5 sm:p-6 text-center">
    
    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center bg-[#B34756] border-2 border-[#331117] text-white shadow-pixel">
  <AlertCircle className="h-5 w-5" />
</div>
<h2 className="font-pixel text-xl sm:text-2xl font-bold tracking-wider text-white uppercase drop-shadow-[2px-2px-0px-#000000]">
  GAME OVER
</h2>
<p className="mt-1 font-silkscreen text-xs font-bold text-[#F87171] uppercase tracking-wider">
  Missed by {result.difference} year{result.difference === 1 ? '' : 's'}!
  </p>

      <div className="my-4 border-2 border-[#2C2649] bg-[#121021] p-3 text-left">
  <div className="flex items-center justify-between pb-2 border-b border-[#25203D]">
    <span className="font-sans text-xs text-[#CBD5E1] truncate max-w-[200px]">{anchor.title}</span>
    <span className="font-pixel text-xs text-[#FFC72C]">{anchor.year}</span>
  </div>  <div className="flex items-center justify-between pt-2">
    <span className="font-sans text-xs text-[#CBD5E1] truncate max-w-[200px]">{challenger.title}</span>
    <span className="font-pixel text-xs text-white">{challenger.year}</span>
    </div>
</div>

        <div className="grid grid-cols-2 gap-2.5 mb-5">
  <div className="flex flex-col items-center justify-center border-2 border-[#2C2649] bg-[#121021] p-2.5 shadow-pixel">
    <div className="flex items-center gap-1.5 font-silkscreen text-[10px] text-[#94A3B8]">
      <Flame className="h-3.5 w-3.5 fill-[#EF4444] text-[#F97316]" />
      <span>STREAK</span>
    </div>
    <span className="mt-1 font-pixel text-lg sm:text-xl font-bold text-white">
      {streak}
    </span>
  </div>
  <div className="flex flex-col items-center justify-center border-2 border-[#2C2649] bg-[#121021] p-2.5 shadow-pixel">
    <div className="flex items-center gap-1.5 font-silkscreen text-[10px] text-[#94A3B8]">
      <Trophy className="h-3.5 w-3.5 fill-[#FBBF24] text-[#FBBF24]" />
      <span>BEST</span>
    </div>
    <span className="mt-1 font-pixel text-lg sm:text-xl font-bold text-[#FBBF24]">
      {bestStreak}
    </span>
  </div>
</div>

      {isNewRecord && (
  <div className="mb-4 border-2 border-[#C99A38] bg-[#241C0E] py-1.5 font-pixel text-[10px] font-bold text-[#FFD166] tracking-wider uppercase shadow-pixel">
    NEW RECORD!
  </div>)}

<button  onClick={onRestart}
  className="group relative flex w-full items-center justify-center gap-2.5 bg-[#E6A119] hover:bg-[#F5B32E] border-2 border-[#1C1206] border-b-5 border-b-[#8A5305] active:border-b-2 active:translate-y-1 py-3 px-4 shadow-pixel font-pixel text-xs sm:text-sm font-bold text-[#1A1104] transition-all cursor-pointer focus:outline-none"
  id="button-play-again"
>
  <RotateCcw className="h-4 w-4 group-hover:-rotate-45 transition-transform" />
  <span>PLAY AGAIN</span>
</button>        
</div>

     </div>
    </div>
  );
}           