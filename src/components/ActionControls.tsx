import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GuessDirection } from '../types';

interface ActionControlsProps {
  onGuess: (direction: GuessDirection) => void;
  disabled?: boolean;
}

export function ActionControls({ onGuess, disabled = false }: ActionControlsProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-md sm:max-w-xl mt-4 sm:mt-5 select-none">
    <div className="flex w-full items-center justify-center gap-3 sm:gap-6">
      <button  onClick={() => onGuess('earlier')}
      disabled={disabled}
      className="group relative flex-1 flex items-center justify-center gap-2 sm:gap-3 bg-[#B34756] hover:bg-[#C25262] border-2 sm:border-3 border-[#331117] border-b-6 border-b-[#5C1D27] active:border-b-2 active:translate-y-1 py-3 sm:py-3.5 px-4 shadow-pixel disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none cursor-pointer"
      id="button-earlier"
      aria-label="Guess earlier"
>
  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-[#FCD34D] stroke-[3]" />
  <span className="font-pixel text-xs sm:text-sm md:text-base font-bold text-white tracking-widest">
    EARLIER
  </span>
  </button>

  <button
  onClick={() => onGuess('later')}
  disabled={disabled}
  className="group relative flex-1 flex items-center justify-center gap-2 sm:gap-3 bg-[#316999] hover:bg-[#3B7AB3] border-2 sm:border-3 border-[#0F2233] border-b-6 border-b-[#1A3C59] active:border-b-2 active:translate-y-1 py-3 sm:py-3.5 px-4 shadow-pixel disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none cursor-pointer"
  id="button-later"
  aria-label="Guess later"
>
  <span className="font-pixel text-xs sm:text-sm md:text-base font-bold text-white tracking-widest">
    LATER
  </span>
  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-white stroke-[3]" />
</button>      
    </div>

<div className="mt-4 flex items-center gap-2 font-silkscreen text-[11px] sm:text-xs text-[#8E87B0]">
        <span>Use</span>
        <span className="inline-flex items-center justify-center w-5 h-5 bg-[#151326] border border-[#3E385E] text-[#8E87B0] font-pixel text-[8px] shadow-pixel">
          ←
        </span>        <span className="inline-flex items-center justify-center w-5 h-5 bg-[#151326] border border-[#3E385E] text-[#8E87B0] font-pixel text-[8px] shadow-pixel">
          →
        </span>        <span>arrow keys to make your guess</span>
      </div>
    </div>

  );
}