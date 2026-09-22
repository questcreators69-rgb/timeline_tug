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

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  science: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/30' },
  technology: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  space: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/30' },
  inventions: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
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
  const categoryTheme = CATEGORY_COLORS[event.category] || CATEGORY_COLORS.science;

  
  const dragRatio = Math.max(-1.5, Math.min(1.5, dragOffset / dragThreshold));
  const cardRotation = isAnchor ? 0 : dragRatio * MAX_CARD_ROTATION;

  
  const earlierIntensity = Math.min(1, Math.max(0, -dragOffset / dragThreshold));
  const laterIntensity = Math.min(1, Math.max(0, dragOffset / dragThreshold));

const transformStyle = isAnchor
    ? undefined    : {
        transform: `translateX(${dragOffset}px) rotate(${cardRotation}deg)`,
    };

let outerBorderClass = 'border-zinc-700/80 bg-zinc-900/95 shadow-zinc-950/60';
  if (isAnchor) {
    outerBorderClass = 'border-zinc-800/90 bg-zinc-900/95 shadow-zinc-950/60';
  } else if (earlierIntensity > 0.3) {
    outerBorderClass = 'border-amber-500/60 bg-zinc-900/95 shadow-amber-950/30';
  } else if (laterIntensity > 0.3) {
    outerBorderClass = 'border-emerald-500/60 bg-zinc-900/95 shadow-emerald-950/30';
  }

    return (
    <div
      className={`relative w-full max-w-sm sm:max-w-md md:max-w-[360px] lg:max-w-[390px] select-none transition-shadow ${isBusted ? 'animate-shake' : ''}`}
      style={transformStyle}
      id={`${role}-card`
      }
    >
      <div className={`relative overflow-hidden rounded-2xl border p-5 sm:p-6 shadow-2xl transition-all duration-200 min-h-[270px] sm:min-h-[290px] flex flex-col justify-between ${outerBorderClass}`}>
        {!isAnchor && (
        <>
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-500/20 via-rose-500/10 to-transparent transition-opacity"
              style={{ opacity: earlierIntensity }}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-l from-emerald-500/20 via-teal-500/10 to-transparent transition-opacity"
              style={{ opacity: laterIntensity }}
            />
            <div
              className="pointer-events-none absolute top-4 left-4 z-20 flex items-center gap-1.5 rounded-lg border border-amber-400/50 bg-amber-950/80 px-2.5 py-1 text-xs font-bold tracking-wide text-amber-300 backdrop-blur-sm transition-all duration-150"
              style={{
                opacity: earlierIntensity > 0.15 ? earlierIntensity : 0,
                transform: `scale(${0.85 + earlierIntensity * 0.25})`,
              }}
            >
              <span>← EARLIER</span>
            </div>
            <div
              className="pointer-events-none absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-lg border border-emerald-400/50 bg-emerald-950/80 px-2.5 py-1 text-xs font-bold tracking-wide text-emerald-300 backdrop-blur-sm transition-all duration-150"
              style={{
                opacity: laterIntensity > 0.15 ? laterIntensity : 0,
                transform: `scale(${0.85 + laterIntensity * 0.25})`,
              }}
            >
              <span>LATER →</span>
            </div>
          </>
    )}

        <div className="flex items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span
            className={`rounded-md px-2.5 py-0.5 text-[11px] font-bold tracking-wider uppercase ${
                isAnchor
                  ? 'bg-zinc-800 text-zinc-300'
                  : 'bg-amber-400/15 text-amber-300 border border-amber-400/30'
            }`}
            >
              {isAnchor ? 'Anchor' : 'Challenger'}
            </span>

            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${categoryTheme.bg} ${categoryTheme.text} ${categoryTheme.border}`}
            >
              <EventIcon name={event.icon} category={event.category} className="h-3 w-3" />
              {event.category}
            </span>
          </div>

          <div className="text-xs text-zinc-500 font-mono">
            {isAnchor ? 'Timeline Anchor' : 'Compare to Anchor'}
          </div>
        </div>

        <div className="py-4 sm:py-5">
          <div className="flex items-start gap-3.5">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${categoryTheme.border} ${categoryTheme.bg} ${categoryTheme.text}`}
            >
              <EventIcon name={event.icon} category={event.category} className="h-6 w-6" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg sm:text-xl font-bold text-zinc-100 leading-snug">
                {event.title}
              </h3>
            </div>
          </div>

          {isAnchor || isRevealed ? (
            <div className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-400 animate-fadeIn">
              {event.description}
            </div>
          ) : (
            <div className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-500 italic">
              Did this breakthrough occur earlier or later than the anchor/ Tug left/right or choose below.
            </div>
          )}
        </div>

        <div className="mt-1 flex items-center justify-between border-t border-zinc-800/80 pt-3">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            {isAnchor ? 'Known Year' : isRevealed ? 'Actual Year' : 'Mystery Year'}
          </span>

          {isAnchor ? (
            <div className="flex items-baseline gap-1 font-display text-3xl sm:text-4xl font-extrabold text-amber-400">
            <span>{event.year}</span>
              {event.year < 0 && <span className="text-sm font-normal text-zinc-400">BCE</span>}
            </div>
          ) : (
            <div className="perspective-1000 h-10 min-w-24">
              <div
                className={`relative h-full w-full transform-style-3d transition-transform duration-500 ${
                  isRevealed ? 'rotate-y-180' : ''
                }`}
              >
                <div className="backface-hidden absolute inset-0 flex items-center justify-end">
                  <div className="flex h-10 w-16 items-center justify-center rounded-lg border border-dashed border-zinc-600 bg-zinc-800/80 font-display text-2xl font-bold text-zinc-400 shadow-inner">
                    ?
                  </div>
                </div>

                <div className="backface-hidden rotate-y-180 absolute inset-0 flex items-center justify-end font-display text-3xl sm:text-4xl font-extrabold text-amber-300">
                  <span>{event.year}</span>
                  {event.year < 0 && <span className="text-sm font-normal text-zinc-400 ml-1">BCE</span>}
                </div>
              </div>
            </div>
          )}
        </div>

        {roundResult && !isAnchor && (
          <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-[2px] transition-all">
            {roundResult.isSameYear ? (
              <div className="animate-stamp inline-flex flex-col items-center rounded-xl border-4 border-amber-400 bg-zinc-950/95 px-5 py-2.5 shadow-2xl rotate-2">
                <span className="font-display text-2xl sm:text-3xl font-black tracking-widest text-amber-400 uppercase">
                  SAME YEAR!
                </span>
                <span className="text-xs font-semibold text-amber-200/90 mt-0.5">
                  Both occured in {event.year}!
                </span>
              </div>
        ) : roundResult.isCorrect ? (
              <div className="animate-stamp inline-flex flex-col items-center rounded-xl border-4 border-emerald-500 bg-zinc-950/95 px-6 py-2.5 shadow-2xl -rotate-3">
                <span className="font-display text-2xl sm:text-3xl font-black tracking-widest text-emerald-400 uppercase">
                  CORRECT!
                </span>
                <span className="text-xs font-semibold text-emerald-200/90 mt-0.5">
                  {roundResult.difference} year{roundResult.difference === 1 ? '' : 's'} {roundResult.userGuess}
                </span>
              </div>
        ) : (
              <div className="*animate-stamp inline-flex flex-col items-center rounded-xl border-4 border-rose-500 bg-zinc-950/95 px-6 py-2.5 shadow-2xl rotate-3">
                <span className="font-display text-2xl sm:text-3xl font-black tracking-widest text-rose-500 uppercase">
                  BUSTED!
                </span>
                <span className="text-xs font-semibold text-rose-200 mt-0.5">
                  Missed by {roundResult.difference} year{roundResult.difference === 1 ? '' : 's'}!
                </span>
              </div>
        )}
          </div>
        )}
      </div>
    </div>
  );
}
                
              
              
  
            