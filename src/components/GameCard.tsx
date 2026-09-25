import { RoundResult, TimelineEvent } from '../types';
import { EventIcon } from './EventIcon';
import { MAX_CARD_ROTATION } from '../game/gameLogic';

interface GameCardProps {
  event: TimelineEvent;
  role: 'anchor' | 'challenger';
  isRevealed: boolean;
  dragOffset?: number;
  dragThreshold?: number;
  roundResult?: RoundResult | null;
  isBusted?: boolean;
}

const CATEGORY_STYLES: Record<string, { bg: string; border: string; text: string }> = {
  space: {
    bg: 'bg-[#252047]',
    border: 'border-[#3E346E]',
    text: 'text-[#C4B5FD]',
  },
  science: {
    bg: 'bg-[#222E54]',
    border: 'border-[#35457E]',
    text: 'text-[#93C5FD]',
  },
  technology: {
    bg: 'bg-[#1D353F]',
    border: 'border-[#2D505E]',
    text: 'text-[#6EE7B7]',
  },
  inventions: {
    bg: 'bg-[#3D2C1E]',
    border: 'border-[#5E422C]',
    text: 'text-[#FDE047]',
  },
};

export function GameCard({
  event,
  role,
  isRevealed,
  dragOffset = 0,
  dragThreshold = 90,
  roundResult,
  isBusted = false,
}: GameCardProps) {
  const isAnchor = role === 'anchor';
  const categoryStyle = CATEGORY_STYLES[event.category] || CATEGORY_STYLES.science;

  const dragRatio = Math.max(-1.5, Math.min(1.5, dragOffset / dragThreshold));
  const cardRotation = isAnchor ? 0 : dragRatio * MAX_CARD_ROTATION;

  const earlierIntensity = Math.min(1, Math.max(0, -dragOffset / dragThreshold));
  const laterIntensity = Math.min(1, Math.max(0, dragOffset / dragThreshold));

  const transformStyle = isAnchor
    ? undefined
    : {
        transform: `translateX(${dragOffset}px) rotate(${cardRotation}deg)`,
    };

  return (
    <div
      className={`relative w-full max-w-[340px] sm:max-w-[370px] md:max-w-[390px] select-none transition-shadow duration-200 ${
        isBusted ? 'animate-shake' : ''
    }`}
      style={transformStyle}
      id={`${role}-card`}
    >
      <div className="relative bg-[#6D421F] border-2 sm:border-3 border-[#26160A] shadow-pixel-lg p-2.5 sm:p-3">
        <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-[#26160A]" />
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#26160A]" />
        <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-[#26160A]" />
        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#26160A]" />

        <div className="relative bg-[#F4E6C8] border-2 border-[#8F5F34] p-4 sm:p-5 flex flex-col justify-between min-h-[340px] sm:min-h-[360px]">
          {!isAnchor && (
            <>
            <div
                className="pointer-events-none absolute inset-0 bg-[#B34756]/15 transition-opacity"
                style={{ opacity: earlierIntensity }}
              />
              <div                className="pointer-events-none absolute inset-0 bg-[#316999]/15 transition-opacity"
                style={{ opacity: laterIntensity }}
              />
              <div     className="pointer-events-none absolute top-3 left-3 z-20 flex items-center gap-1.5 border-2 border-[#331117] bg-[#B34756] px-2.5 py-1 text-xs font-pixel text-white shadow-pixel transition-all"
                style={{
                  opacity: earlierIntensity > 0.2 ? earlierIntensity : 0,
                  transform: `scale(${0.85 + earlierIntensity * 0.2})`,
                }
                }
              >
                <span>← EARLIER</span>
              </div>
              <div
                className="pointer-events-none absolute top-3 right-3 z-20 flex items-center gap-1.5 border-2 border-[#0F2233] bg-[#316999] px-2.5 py-1 text-xs font-pixel text-white shadow-pixel transition-all"
                style={{
                  opacity: laterIntensity > 0.2 ? laterIntensity : 0,
                  transform: `scale(${0.85 + laterIntensity * 0.2})`,
                }}
              >
                <span>LATER →</span>
              </div>
            </>
          )}

          <div>
            <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-[#D4C3A3]">
              <span className="bg-[#FCD34D] border-2 border-[#1A1206] px-2.5 sm:px-3 py-1 font-pixel text-[9px] sm:text-[10px] font-black text-[#1A1206] tracking-wider shadow-pixel">
                {isAnchor ? 'ANCHOR' : 'CHALLENGER'}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 border px-2.5 py-1 rounded-none shadow-pixel font-silkscreen text-[11px] font-bold capitalize ${categoryStyle.bg} ${categoryStyle.border} ${categoryStyle.text}`}
              >
                <EventIcon name={event.icon} category={event.category} className="h-3.5 w-3.5" />
                <span>{event.category}</span> 
             </span>
            </div>
            <div className="pt-3.5 pb-2">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center bg-[#1E1936] border-2 border-[#120E22] shadow-pixel text-[#A78BFA]">
                  <EventIcon name={event.icon} category={event.category} className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-pixel text-[11px] sm:text-[13px] font-bold text-[#141018] leading-snug tracking-tight">
                    {event.title}
                  </h3>
                </div>
              </div>
              {isAnchor || isRevealed ? (
                <p className="mt-3 text-xs sm:text-[13px] text-[#2C252D] font-sans font-medium leading-relaxed">
                  {event.description}
                </p>              ) : (
                <p className="mt-3 text-xs sm:text-[13px] text-[#2C252D] font-sans font-medium leading-relaxed">
                  Did this breakthrough occur earlier or later than the anchor? Tug left/right or choose below.
                </p>
              )}
            </div>
          </div>
          
          <div>
            <div className="h-px bg-[#D4C3A3] w-full mb-3" />

            <div className="flex items-center justify-between">
              <span className="font-pixel text-[10px] sm:text-xs font-bold text-[#262024] tracking-wider">
                {isAnchor ? 'KNOWN YEAR' : isRevealed ? 'ACTUAL YEAR' : 'MYSTERY YEAR'}
              </span>
              {isAnchor ? (
                <div className="flex items-baseline gap-1 font-pixel text-2xl sm:text-3xl font-black text-[#FFC72C] drop-shadow-[2.5px-2.5px-0px-#000000] tracking-wider">
                  <span>{event.year}</span>
                  {event.year < 0 && <span className="text-[10px] font-silkscreen text-[#141018] ml-1">BCE</span>}
                  </div>
              ) : isRevealed ? (
                <div className="flex items-baseline gap-1 font-pixel text-2xl sm:text-3xl font-black text-[#FFC72C] drop-shadow-[2.5px-2.5px-0px-#000000] tracking-wider">
                  <span>{event.year}</span> 
                 {event.year < 0 && <span className="text-[10px] font-silkscreen text-[#141018] ml-1">BCE</span>}
                </div>
              ) : (
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center bg-[#B5B5BA] border-2 border-[#1E1E22] shadow-pixel font-pixel text-xl sm:text-2xl font-black text-[#151518]">
                  ?
                </div>
              )}
            </div>
          </div>
          {roundResult && !isAnchor && (
            <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center p-4 bg-[#141021]/80 backdrop-blur-[2px] transition-all">
              {roundResult.isSameYear ? (
                <div className="animate-stamp inline-flex flex-col items-center border-3 border-[#1A1206] bg-[#FFC72C] px-5 py-3 shadow-pixel-lg rotate-2">
                  <span className="font-pixel text-xl sm:text-2xl font-black tracking-wider text-[#1A1206] uppercase">
                    SAME YEAR!
                  </span>
                  <span className="font-silkscreen text-[11px] font-bold text-[#1A1206] mt-1">
                    Both occurred in {event.year}!
                  </span>
                </div>
              ) : roundResult.isCorrect ? (
                <div className="animate-stamp inline-flex flex-col items-center border-3 border-[#0B2615] bg-[#34D399] px-5 py-3 shadow-pixel-lg -rotate-2">
                  <span className="font-pixel text-xl sm:text-2xl font-black tracking-wider text-[#0B2615] uppercase">
                    CORRECT!
                  </span>
                  <span className="font-silkscreen text-[11px] font-bold text-[#0B2615] mt-1">
                    {roundResult.difference} year{roundResult.difference === 1 ? '' : 's'} {roundResult.userGuess}
                  </span> 
               </div>
              ) : (
                <div className="animate-stamp inline-flex flex-col items-center border-3 border-[#331117] bg-[#F87171] px-5 py-3 shadow-pixel-lg rotate-2">
                  <span className="font-pixel text-xl sm:text-2xl font-black tracking-wider text-[#331117] uppercase">
                    BUSTED!
                  </span>
                  <span className="font-silkscreen text-[11px] font-bold text-[#331117] mt-1">
                    Missed by {roundResult.difference} year{roundResult.difference === 1 ? '' : 's'}!
                   </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  }
            