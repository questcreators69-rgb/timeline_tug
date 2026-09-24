import { Flame, Trophy, Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
  streak: number;
  bestStreak: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onLogoClick?: () => void;
}

export function Header({
  streak,
  bestStreak,
  isMuted,
  onToggleMute,
  onLogoClick,
}: HeaderProps) {
  return (
    <header className="w-full border-b border-[#D4A359]/20 bg-[#0A0A0D]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <button          onClick={onLogoClick}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#D4A359] text-[#0A0A0D] font-syne font-black text-xl shadow-brass group-hover:scale-105 transition-transform duration-200 ease-spring">
            T          </div>          <div className="flex flex-col">
            <h1 className="font-syne text-base sm:text-lg font-extrabold tracking-wider text-[#F3EFE6] uppercase group-hover:text-[#D4A359] transition-colors duration-200">
              TIMELINE TUG
            </h1>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4A359]/60 hidden xs:block">
              CHRONO-INTUITION ARENA
           </span>          </div>        </button>
        <div className="flex items-center gap-2.5 sm:gap-4">
          <div
            className={`flex items-center gap-2 rounded-sm px-3 py-1 text-xs sm:text-sm font-bold border transition-all duration-200 ${
              streak > 0
                ? 'border-[#D4A359] bg-[#D4A359]/10 text-[#D4A359] shadow-brass'
                : 'border-stone-800 bg-stone-900/60 text-stone-400'
          }`}
          >
            <Flame
              className={`h-4 w-4 ${
                streak > 0 ? 'fill-[#D4A359] text-[#D4A359] animate-pulse' : 'text-stone-600'
            }`}
        />
            <span className="font-mono text-sm">{streak}</span>          </div>
          <div className="flex items-center gap-2 rounded-sm border border-stone-800 bg-stone-900/60 px-3 py-1 text-xs sm:text-sm font-semibold text-stone-300">
            <Trophy className="h-4 w-4 text-[#D4A359]" />
            <span className="hidden xs:inline text-stone-500 text-xs font-normal uppercase tracking-wider">Best:</span>            <span className="font-mono font-bold text-[#D4A359]">{bestStreak}</span>          </div>
          <button
            onClick={onToggleMute}
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-stone-800 bg-stone-900/80 text-stone-400 hover:text-[#F3EFE6] hover:border-[#D4A359]/50 transition-colors focus:outline-none"
            aria-label={isMuted ? 'Unmute game audio' : 'Mute game audio'}
          >
            {isMuted ? <VolumeX className="h-4 w-4 text-stone-600" /> : <Volume2 className="h-4 w-4 text-[#D4A359]" />}
          </button>
        </div>
      </div>
    </header>
  );
}
