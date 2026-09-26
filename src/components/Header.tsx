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
    <header className="w-full border-b border-[#25203D] bg-[#121021] px-3 sm:px-6 py-2.5 sticky top-0 z-40 select-none">
  <div className="mx-auto flex max-w-5xl items-center justify-between">
          
<button
  onClick={onLogoClick}
  className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
>
  <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center bg-[#E2BA7D] border-2 border-[#1E140A] shadow-pixel group-hover:scale-105 transition-transform">
    <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-[#4A2F13] rounded-full" />
    <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-[#4A2F13] rounded-full" />
    <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-[#4A2F13] rounded-full" />
    <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-[#4A2F13] rounded-full" />
    <span className="font-pixel text-base sm:text-lg font-black text-[#1A1207] leading-none">
      T
   </span>
  </div>
  <h1 className="font-pixel text-xs sm:text-sm tracking-wider text-white group-hover:text-[#FCD34D] transition-colors">
    TIMELINE TUG
  </h1></button>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 border-2 border-[#2C2649] bg-[#151326] px-2.5 py-1 shadow-pixel">
    <Flame className="h-3.5 w-3.5 fill-[#EF4444] text-[#F97316]" />
    <span className="font-pixel text-[11px] sm:text-xs text-white">{streak}</span>
  </div>
  <div className="flex items-center gap-1.5 sm:gap-2 border-2 border-[#2C2649] bg-[#151326] px-2.5 py-1 shadow-pixel">
    <Trophy className="h-3.5 w-3.5 fill-[#FBBF24] text-[#FBBF24]" />
    <span className="font-pixel text-[11px] sm:text-xs text-white">{bestStreak}</span>  </div>
          <button  
onClick={onToggleMute}
  className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center border-2 border-[#2C2649] bg-[#151326] hover:bg-[#201D38] active:translate-y-0.5 text-[#FBBF24] shadow-pixel transition-all focus:outline-none cursor-pointer"
  aria-label={isMuted ? 'Unmute game audio' : 'Mute game audio'}
>
  {isMuted ? (
    <VolumeX className="h-3.5 w-3.5 text-[#6B7280]" />
    ) : (
    <Volume2 className="h-3.5 w-3.5 text-[#FBBF24]" />
  )}
</button>
        </div>
      </div>
    </header>
  );
}
