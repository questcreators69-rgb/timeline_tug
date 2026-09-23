import { Play, Trophy, ArrowLeftRight, Sparkles } from 'lucide-react';

interface StartScreenProps {
  onStartGame: () => void;
  bestStreak: number;
}

export function StartScreen({ onStartGame, bestStreak }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-xl mx-auto py-8 sm:py-14 px-4">
      <div className="mb-5 inline-flex items-center gap-2 rounded-sm border border-[#D4A359]/40 bg-[#D4A359]/10 px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-[#D4A359] uppercase">
        <span>CHRONOLOGICAL TUG-OF-WAR</span>
      </div>
      
      <h2 className="font-syne text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#F3EFE6] uppercase leading-none">
        TIMELINE <span className="text-[#D4A359]">TUG</span>
      </h2>
      <p className="mt-5 text-base sm:text-lg text-stone-300 leading-relaxed max-w-md font-sans">
        Can you place historical breakthroughs in their exact chronological order ?
      </p>
      <p className="mt-2 text-xs sm:text-sm text-stone-400 max-w-md font-mono">
        Tug the mystery event left for <span className="text-[#D4A359] font-bold">EARLIER</span> or right for <span className="text-[#2B695A] font-bold">LATER</span> relative to the anchor.
      </p>
      <div className="my-8 flex items-center justify-between gap-4 rounded-sm border border-stone-800 bg-[#0E0E12] p-5 w-full max-w-md shadow-brass">
        <div className="text-left">
          <span className="text-xs font-mono font-bold text-[#D4A359]">← EARLIER</span>
          <p className="text-[11px] text-stone-500 mt-0.5">Drag left or press ←</p>        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-stone-800 text-stone-300 border border-stone-700">
          <ArrowLeftRight className="h-4 w-4" />
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-bold text-[#2B695A]">LATER →</span>          <p className="text-[11px] text-stone-500 mt-0.5">Drag right or press →</p>        </div>      </div>
      {bestStreak > 0 && (
        <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-[#D4A359]/40 bg-[#D4A359]/10 px-4 py-2 text-xs font-mono font-bold text-[#D4A359]">
          <Trophy className="h-4 w-4 text-[#D4A359]" />
          <span>BEST STREAK RECORD: <strong className="font-mono text-sm">{bestStreak}</strong></span>        </div>      )}

      <button
        onClick={onStartGame}
        className="group relative inline-flex items-center justify-center gap-3 rounded-sm bg-[#D4A359] px-10 py-4 font-syne text-xl font-extrabold text-[#0A0A0D] shadow-brass-lg hover:bg-[#E5B56A] active:translate-y-0.5 transition-all duration-150 ease-spring focus:outline-none"
        id="button-play"
      >
        <Play className="h-5 w-5 fill-[#0A0A0D]" />
        <span>ENTER ARENA</span>      </button>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono tracking-wider uppercase text-stone-500">
        <span className="rounded-sm border border-stone-800 bg-stone-900/80 px-2.5 py-1">Science</span>        <span className="rounded-sm border border-stone-800 bg-stone-900/80 px-2.5 py-1">Technology</span>        <span className="rounded-sm border border-stone-800 bg-stone-900/80 px-2.5 py-1">Space</span>        <span className="rounded-sm border border-stone-800 bg-stone-900/80 px-2.5 py-1">Inventions</span>      </div>    </div>  );
}      


