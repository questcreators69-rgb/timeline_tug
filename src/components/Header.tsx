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
    <header className="w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md px-4 py-3 sticky top-0 z-40">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        
        <button          
          onClick={onLogoClick}
          className="group flex items-center gap-2.5 text-left focus:outline-none"
          title="Timeline Tug"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 text-zinc-950 font-display font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform">
            T          
            </div>          
            <div>
            <h1 className="font-display text-base sm:text-lg font-extrabold tracking-tight text-zinc-100 uppercase group-hover:text-amber-400 transition-colors">
              TIMELINE TUG           
            </h1>
          </div>        
            </button>
        
        <div className="flex items-center gap-2 sm:gap-4">
          
          <div            
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs sm:text-sm font-bold transition-all ${
              streak > 0
                ? 'border border-amber-500/40 bg-amber-500/10 text-amber-400 shadow-sm'
                : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400'           
                }`}
            title="Current Streak"
          >
            <Flame              
                className={`h-4 w-4 ${
                streak > 0 ? 'fill-amber-500 text-amber-500 animate-pulse' : 'text-zinc-500'
            }`}
            />
            <span className="font-mono">{streak}</span>
             </div>
          
          <div
            className="flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs sm:text-sm font-semibold text-zinc-300"
            title="Personal Best Streak"
          >
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="hidden xs:inline text-zinc-500 text-xs font-normal">Best:</span>
            <span className="font-mono font-bold text-yellow-400">{bestStreak}</span>
          </div>
          
          <button
            onClick={onToggleMute}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            aria-label={isMuted ? 'Unmute game audio' : 'Mute game audio'}
            title={isMuted ? 'Unmute audio' : 'Mute audio'}
        >
            {isMuted ? <VolumeX className="h-4 w-4 text-zinc-500" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}