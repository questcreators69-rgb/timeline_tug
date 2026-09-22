import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GuessDirection } from '../types';

interface ActionControlsProps {
  onGuess: (direction: GuessDirection) => void;
  disabled?: boolean;
}

export function ActionControls({ onGuess, disabled = false }: ActionControlsProps) {
  return (
    <div className="flex w-full max-w-sm sm:max-w-md items-center justify-between gap-3 sm:gap-4 mt-4">
      
      <button
        onClick={() => onGuess('earlier')}
        disabled={disabled}
        className="group relative flex-1 flex items-center justify-center gap-2.5 rounded-xl border border-amber-500/40 bg-zinc-900/90 py-3 sm:py-3.5 px-4 font-display text-sm sm:text-base font-bold text-amber-300 shadow-lg shadow-amber-950/20 hover:bg-amber-500/10 hover:border-amber-400 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/40"
        id="button-earlier"
        aria-label="Guess earlier in history"
      >
        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-0.5 transition-transform text-amber-400" />
        <span>EARLIER</span>
        <kbd className="hidden sm:inline-block rounded bg-zinc-800/80 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 border border-zinc-700/50">
          ←
        </kbd>
      </button>
      
      <button
        onClick={() => onGuess('later')}
        disabled={disabled}
        className="group relative flex-1 flex items-center justify-center gap-2.5 rounded-xl border border-emerald-500/40 bg-zinc-900/90 py-3 sm:py-3.5 px-4 font-display text-sm sm:text-base font-bold text-emerald-300 shadow-lg shadow-emerald-950/20 hover:bg-emerald-500/10 hover:border-emerald-400 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
        id="button-later"
        aria-label="Guess later in history"
      >
        <span>LATER</span>
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-0.5 transition-transform text-emerald-400" />
        <kbd className="hidden sm:inline-block rounded bg-zinc-800/80 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 border border-zinc-700/50">
          →
        </kbd>
      </button>
    </div>
  );
}