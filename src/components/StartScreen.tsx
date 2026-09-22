import { Play, Trophy, Sparkles, Compass, ArrowLeftRight } from 'lucide-react';

interface StartScreenProps {
  onStartGame: () => void;
  bestStreak: number;
}

export function StartScreen({ onStartGame, bestStreak }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto py-8 sm:py-12 px-4">
      
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
        
        <span>Historical Timeline Challenge</span>
      </div>
      
      <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-100 uppercase">
        TIMELINE TUG
      </h2>
      
      <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-md">
        Can you put history in the right order/
      </p>
      <p className="mt-2 text-sm text-zinc-400 leading-relaxed max-w-md">
        Drag the card earlier or later relative to the anchor event. Reveal the hidden year and keep your streak alive.
      </p>
      
      <div className="my-7 flex items-center justify-center gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 w-full max-w-sm">
        <div className="text-center">
          <span className="text-xs font-bold text-amber-400">← EARLIER</span>
          <p className="text-[11px] text-zinc-500 mt-0.5">Drag Left</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-400">
          <ArrowLeftRight className="h-4 w-4" />
        </div>
       
         <div className="text-center">
          <span className="text-xs font-bold text-emerald-400">LATER →</span>
          <p className="text-[11px] text-zinc-500 mt-0.5">Drag Right</p>
        </div>
      </div>
      
      {bestStreak > 0 && (
        <div className="mb-6 inline-flex items-center gap-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-300">
          <Trophy className="h-4 w-4 text-yellow-400" />
          <span>Personal Best Streak: <strong className="font-mono text-base">{bestStreak}</strong></span>
        </div>
      )}

      
      <button
        onClick={onStartGame}
        className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 font-display text-lg font-bold text-zinc-950 shadow-xl shadow-amber-950/40 hover:from-amber-400 hover:to-amber-500 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
        id="button-play"
      >
        <Play className="h-5 w-5 fill-zinc-950" />
        <span>PLAY</span>
      </button>
      
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium text-zinc-400">
        <span className="rounded-md border border-zinc-800 bg-zinc-900/70 px-2 py-0.5">Science</span>
        <span className="rounded-md border border-zinc-800 bg-zinc-900/70 px-2 py-0.5">Technology</span>
        <span className="rounded-md border border-zinc-800 bg-zinc-900/70 px-2 py-0.5">Space</span>
        <span className="rounded-md border border-zinc-800 bg-zinc-900/70 px-2 py-0.5">Inventions</span>
      </div>
    </div>
  );
}