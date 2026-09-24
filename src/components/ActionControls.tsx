import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GuessDirection } from '../types';

interface ActionControlsProps {
  onGuess: (direction: GuessDirection) => void;
  disabled?: boolean;
}

export function ActionControls({ onGuess, disabled = false }: ActionControlsProps) {
  return (
    <div className="flex w-full max-w-sm sm:max-w-md items-center justify-between gap-3 sm:gap-4 mt-5">
      <button
        onClick={() => onGuess('earlier')}
        disabled={disabled}
        className="group relative flex-1 flex items-center justify-center gap-2.5 rounded-sm border border-[#D4A359]/60 bg-[#0E0E12] py-3.5 px-4 font-syne text-sm sm:text-base font-extrabold text-[#D4A359] shadow-brass hover:bg-[#D4A359]/10 hover:border-[#D4A359] active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 ease-spring focus:outline-none"
        id="button-earlier"
        aria-label="Guess earlier in history"
      >
        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform ease-spring text-[#D4A359]" />
        <span>EARLIER</span>
        <kbd className="hidden sm:inline-block rounded-sm bg-stone-800/80 px-1.5 py-0.5 text-[10px] font-mono text-stone-300 border border-stone-700">
          ←
        </kbd>
      </button>
      <button
        onClick={() => onGuess('later')}
        disabled={disabled}
        className="group relative flex-1 flex items-center justify-center gap-2.5 rounded-sm border border-[#2B695A]/60 bg-[#0E0E12] py-3.5 px-4 font-syne text-sm sm:text-base font-extrabold text-[#2B695A] shadow-emerald-brutal hover:bg-[#2B695A]/10 hover:border-[#2B695A] active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 ease-spring focus:outline-none"
        id="button-later"
        aria-label="Guess later in history"
      >
        <span>LATER</span>        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform ease-spring text-[#2B695A]" />
        <kbd className="hidden sm:inline-block rounded-sm bg-stone-800/80 px-1.5 py-0.5 text-[10px] font-mono text-stone-300 border border-stone-700">
          →
        </kbd>      </button>    </div>  );
}