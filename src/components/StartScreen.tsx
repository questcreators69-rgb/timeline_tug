import { Play, Trophy, ArrowLeftRight, Sparkles } from 'lucide-react';

interface StartScreenProps {
  onStartGame: () => void;
  bestStreak: number;
}

export function StartScreen({ onStartGame, bestStreak }: StartScreenProps) {
  return (
    <div className="relative w-full flex-1 flex flex-col justify-between items-center bg-[#202753] overflow-hidden min-h-[calc(100vh-62px)] select-none">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full pixelated"
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <g transform="translate(30, 48)">
            <rect x="18" y="0" width="30" height="8" fill="#ffffff" />
            <rect x="8" y="8" width="50" height="10" fill="#ffffff" />
            <rect x="0" y="18" width="66" height="14" fill="#ffffff" />
            <rect x="0" y="24" width="66" height="8" fill="#8ea1cb" />
            <rect x="6" y="32" width="54" height="4" fill="#8ea1cb" />
            <path              d="M18 0 h30 v8 h10 v10 h8 v14 h-66 v-14 h8 v-10 h10 z"
              fill="none"
              stroke="#151833"
              strokeWidth="2.5"
            />
          </g>
          <g transform="translate(100, 160)">
            <rect x="14" y="0" width="22" height="6" fill="#ffffff" />
            <rect x="6" y="6" width="38" height="8" fill="#ffffff" />
            <rect x="0" y="14" width="50" height="10" fill="#ffffff" />
            <rect x="0" y="18" width="50" height="6" fill="#8ea1cb" />
            <rect x="4" y="24" width="42" height="4" fill="#8ea1cb" />
            <path              d="M14 0 h22 v6 h8 v8 h6 v10 h-50 v-10 h6 v-8 h8 z"
              fill="none"
              stroke="#151833"
              strokeWidth="2"
            />
          </g>
          <g transform="translate(680, 72)">
            <rect x="18" y="0" width="30" height="8" fill="#ffffff" />
            <rect x="8" y="8" width="50" height="10" fill="#ffffff" />
            <rect x="0" y="18" width="66" height="14" fill="#ffffff" />
            <rect x="0" y="24" width="66" height="8" fill="#8ea1cb" />
            <rect x="6" y="32" width="54" height="4" fill="#8ea1cb" />
            <path              d="M18 0 h30 v8 h10 v10 h8 v14 h-66 v-14 h8 v-10 h10 z"
              fill="none"
              stroke="#151833"
              strokeWidth="2.5"
            />
          </g>
          <g transform="translate(620, 150)">
            <rect x="14" y="0" width="22" height="6" fill="#ffffff" />
            <rect x="6" y="6" width="38" height="8" fill="#ffffff" />
            <rect x="0" y="14" width="50" height="10" fill="#ffffff" />
            <rect x="0" y="18" width="50" height="6" fill="#8ea1cb" />
            <rect x="4" y="24" width="42" height="4" fill="#8ea1cb" />
            <path              d="M14 0 h22 v6 h8 v8 h6 v10 h-50 v-10 h6 v-8 h8 z"
              fill="none"
              stroke="#151833"
              strokeWidth="2"
            />
          </g>
          <g id="pixel-tree" transform="translate(-10, 180)">
            <path
              d="M50 330 C45 280 40 250 55 210 C62 190 70 170 65 140 C60 110 50 80 45 60 C38 40 30 20 25 0"
              stroke="#543015"
              strokeWidth="32"
              fill="none"
              strokeLinecap="square"
            />
            <path
              d="M60 330 C55 280 50 250 65 210 C72 190 80 170 75 140 C70 110 60 80 55 60"
              stroke="#6e401c"
              strokeWidth="14"
              fill="none"
            />
            <path
              d="M40 330 C35 280 32 250 45 210 C50 190 55 170 52 140"
              stroke="#381d09"
              strokeWidth="8"
              fill="none"
            />

            <g transform="translate(5, 30)">
              <rect x="25" y="10" width="55" height="55" rx="6" fill="#1e7535" />
              <rect x="20" y="15" width="65" height="45" rx="6" fill="#1e7535" />
              <rect x="28" y="14" width="48" height="46" rx="4" fill="#289e47" />
              <rect x="34" y="16" width="30" height="30" rx="4" fill="#44c768" />
              <rect x="38" y="18" width="18" height="14" rx="2" fill="#6ee787" />
            </g>

            <g transform="translate(-25, 90)">
              <rect x="25" y="10" width="55" height="55" rx="6" fill="#1e7535" />
              <rect x="20" y="15" width="65" height="45" rx="6" fill="#1e7535" />
              <rect x="28" y="14" width="48" height="46" rx="4" fill="#289e47" />
              <rect x="34" y="16" width="30" height="30" rx="4" fill="#44c768" />
              <rect x="38" y="18" width="18" height="14" rx="2" fill="#6ee787" />
            </g>

            <g transform="translate(45, 100)">
              <rect x="25" y="10" width="55" height="55" rx="6" fill="#1e7535" />
              <rect x="20" y="15" width="65" height="45" rx="6" fill="#1e7535" />
              <rect x="28" y="14" width="48" height="46" rx="4" fill="#289e47" />
              <rect x="34" y="16" width="30" height="30" rx="4" fill="#44c768" />
              <rect x="38" y="18" width="18" height="14" rx="2" fill="#6ee787" />
            </g>

            <g transform="translate(10, 160)">
              <rect x="25" y="10" width="65" height="65" rx="6" fill="#1e7535" />
              <rect x="20" y="15" width="75" height="55" rx="6" fill="#1e7535" />
              <rect x="28" y="14" width="58" height="56" rx="4" fill="#289e47" />
              <rect x="34" y="16" width="38" height="38" rx="4" fill="#44c768" />
              <rect x="38" y="18" width="22" height="16" rx="2" fill="#6ee787" />
            </g>

            <g transform="translate(30, 260)">
              <rect x="0" y="15" width="45" height="40" rx="4" fill="#165b2a" />
              <rect x="5" y="18" width="35" height="30" rx="3" fill="#22833c" />
              <rect x="10" y="20" width="20" height="18" rx="2" fill="#38af57" />
            </g>

            <g transform="translate(70, 275)">
              <rect x="0" y="10" width="40" height="35" rx="4" fill="#165b2a" />
              <rect x="5" y="13" width="30" height="26" rx="3" fill="#22833c" />
              <rect x="8" y="15" width="16" height="15" rx="2" fill="#38af57" />
            </g>
          </g>

          <g id="pixel-castle" transform="translate(700, 260)">
            <line x1="26" y1="36" x2="26" y2="76" stroke="#2a2521" strokeWidth="3" />
            <polygon points="26,38 52,48 26,58" fill="#dc2626" />
            <polygon points="26,40 48,48 26,54" fill="#ef4444" />

            <rect x="6" y="70" width="52" height="180" fill="#78716c" />
            <rect x="6" y="70" width="8" height="180" fill="#a8a29e" />
            <rect x="50" y="70" width="8" height="180" fill="#57534e" />

            <rect x="4" y="66" width="14" height="16" fill="#8c857b" />
            <rect x="25" y="66" width="14" height="16" fill="#8c857b" />
            <rect x="46" y="66" width="14" height="16" fill="#8c857b" />

            <rect x="4" y="66" width="14" height="4" fill="#a8a29e" />
            <rect x="25" y="66" width="14" height="4" fill="#a8a29e" />
            <rect x="46" y="66" width="14" height="4" fill="#a8a29e" />

            <line x1="6" y1="102" x2="58" y2="102" stroke="#44403c" strokeWidth="2" />
            <line x1="6" y1="134" x2="58" y2="134" stroke="#44403c" strokeWidth="2" />
            <line x1="6" y1="166" x2="58" y2="166" stroke="#44403c" strokeWidth="2" />
            <line x1="6" y1="198" x2="58" y2="198" stroke="#44403c" strokeWidth="2" />

            <line x1="28" y1="74" x2="28" y2="102" stroke="#44403c" strokeWidth="2" />
            <line x1="42" y1="102" x2="42" y2="134" stroke="#44403c" strokeWidth="2" />
            <line x1="20" y1="134" x2="20" y2="166" stroke="#44403c" strokeWidth="2" />
            <line x1="38" y1="166" x2="38" y2="198" stroke="#44403c" strokeWidth="2" />

            <rect x="22" y="112" width="6" height="16" rx="1" fill="#1c1917" />

            <path
              d="M4 66 h14 v16 h7 v-16 h14 v16 h7 v-16 h14 v16 h-4 v168 h-52 v-168 h-4 z"
              fill="none"
              stroke="#292524"
              strokeWidth="3"
            />

            <g transform="translate(-45, 160)">
              <rect x="0" y="15" width="48" height="45" rx="5" fill="#165b2a" />
              <rect x="5" y="18" width="38" height="35" rx="4" fill="#22833c" />
              <rect x="10" y="20" width="24" height="22" rx="3" fill="#38af57" />
            </g>
            <g transform="translate(-15, 175)">
              <rect x="0" y="10" width="42" height="38" rx="4" fill="#165b2a" />
              <rect x="4" y="13" width="32" height="28" rx="3" fill="#22833c" />
              <rect x="8" y="15" width="18" height="16" rx="2" fill="#38af57" />
            </g>
          </g>

          <g id="bottom-terrain" transform="translate(0, 500)">
            <rect x="0" y="18" width="800" height="92" fill="#4d2f19" />

            <g fill="#613b1f">
              <rect x="20" y="30" width="45" height="22" rx="3" />
              <rect x="90" y="26" width="55" height="26" rx="3" />
              <rect x="175" y="32" width="40" height="20" rx="3" />
              <rect x="245" y="25" width="60" height="28" rx="3" />
              <rect x="330" y="30" width="45" height="22" rx="3" />
              <rect x="400" y="25" width="50" height="25" rx="3" />
              <rect x="475" y="32" width="45" height="20" rx="3" />
              <rect x="545" y="26" width="60" height="26" rx="3" />
              <rect x="630" y="32" width="45" height="22" rx="3" />
              <rect x="700" y="25" width="55" height="28" rx="3" />

              <rect x="50" y="60" width="50" height="24" rx="3" />
              <rect x="130" y="58" width="60" height="26" rx="3" />
              <rect x="210" y="62" width="45" height="22" rx="3" />
              <rect x="280" y="58" width="55" height="26" rx="3" />
              <rect x="360" y="62" width="45" height="22" rx="3" />
              <rect x="430" y="58" width="60" height="26" rx="3" />
              <rect x="515" y="62" width="50" height="22" rx="3" />
              <rect x="590" y="58" width="55" height="26" rx="3" />
              <rect x="670" y="62" width="45" height="22" rx="3" />
              <rect x="740" y="58" width="50" height="26" rx="3" />
            </g>

            <g fill="#382110" opacity="0.6">
              <rect x="18" y="28" width="49" height="26" rx="3" fill="none" stroke="#2e1909" strokeWidth="2" />
              <rect x="88" y="24" width="59" height="30" rx="3" fill="none" stroke="#2e1909" strokeWidth="2" />
              <rect x="173" y="30" width="44" height="24" rx="3" fill="none" stroke="#2e1909" strokeWidth="2" />
              <rect x="243" y="23" width="64" height="32" rx="3" fill="none" stroke="#2e1909" strokeWidth="2" />
              <rect x="328" y="28" width="49" height="26" rx="3" fill="none" stroke="#2e1909" strokeWidth="2" />
              <rect x="398" y="23" width="54" height="29" rx="3" fill="none" stroke="#2e1909" strokeWidth="2" />
              <rect x="473" y="30" width="49" height="24" rx="3" fill="none" stroke="#2e1909" strokeWidth="2" />
              <rect x="543" y="24" width="64" height="30" rx="3" fill="none" stroke="#2e1909" strokeWidth="2" />
              <rect x="628" y="30" width="49" height="26" rx="3" fill="none" stroke="#2e1909" strokeWidth="2" />
              <rect x="698" y="23" width="59" height="32" rx="3" fill="none" stroke="#2e1909" strokeWidth="2" />
            </g>

            <rect x="0" y="0" width="800" height="12" fill="#2ca03e" />
            <rect x="0" y="0" width="800" height="5" fill="#4ade80" />
            <rect x="0" y="12" width="800" height="6" fill="#1e6b2b" />

            <path
              d="M0 12 L10 18 L20 12 L30 19 L40 12 L50 18 L60 12 L70 19 L80 12 L90 18 L100 12 L110 19 L120 12 L130 18 L140 12 L150 19 L160 12 L170 18 L180 12 L190 19 L200 12 L210 18 L220 12 L230 19 L240 12 L250 18 L260 12 L270 19 L280 12 L290 18 L300 12 L310 19 L320 12 L330 18 L340 12 L350 19 L360 12 L370 18 L380 12 L390 19 L400 12 L410 18 L420 12 L430 19 L440 12 L450 18 L460 12 L470 19 L480 12 L490 18 L500 12 L510 19 L520 12 L530 18 L540 12 L550 19 L560 12 L570 18 L580 12 L590 19 L600 12 L610 18 L620 12 L630 19 L640 12 L650 18 L660 12 L670 19 L680 12 L690 18 L700 12 L710 19 L720 12 L730 18 L740 12 L750 19 L760 12 L770 18 L780 12 L790 19 L800 12 L800 0 L0 0 Z"
              fill="#2ca03e"
            />
          </g>
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center pt-6 sm:pt-10 px-4">
         <div className="flex flex-col items-center mb-6 select-none">
  <h1 className="font-pixel text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#F5F2EB] tracking-wide uppercase drop-shadow-[4px-4px-0px-#14141E]">
    TIMELINE  </h1>
  <h2 className="font-pixel text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#FFC72C] tracking-wide uppercase -mt-1 sm:-mt-2 drop-shadow-[4px-4px-0px-#14141E]">
    TUG
  </h2>
  </div>

<div className="w-full max-w-lg mb-3 relative bg-[#8C5A31] border-2 sm:border-3 border-[#3D2314] shadow-pixel p-3 sm:p-4 text-center">
          <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-[#26150B] rounded-full border border-[#B87E4B]" />
          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#26150B] rounded-full border border-[#B87E4B]" />
          <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-[#26150B] rounded-full border border-[#B87E4B]" />
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#26150B] rounded-full border border-[#B87E4B]" />
     
  <p className="font-silkscreen text-xs sm:text-sm font-bold text-[#241308] leading-relaxed">
            Can you place historical breakthroughs in their exact chronological order ?
        </p>
        </div>
        <div className="w-full max-w-lg mb-6 relative bg-[#3D2E24] border-2 sm:border-3 border-[#1F1610] shadow-pixel p-3 sm:p-4 text-center">
          <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-[#170E08] rounded-full border border-[#5C4537]" />
          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#170E08] rounded-full border border-[#5C4537]" />
          <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-[#170E08] rounded-full border border-[#5C4537]" />
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#170E08] rounded-full border border-[#5C4537]" />

          <p className="font-silkscreen text-[11px] sm:text-xs font-semibold text-[#E5DDD5] leading-relaxed">
            Tug the mystery event left for{' '}
            <span className="font-bold text-[#FBBF24]">EARLIER</span> or right for{' '}
            <span className="font-bold text-[#38BDF8]">LATER</span> relative to the anchor.
          </p>        </div>
        <button          onClick={onStartGame}
          className="group relative inline-flex items-center justify-center gap-2.5 bg-[#FCD34D] hover:bg-[#FDE047] active:translate-y-1 border-2 sm:border-3 border-[#451A03] border-b-6 border-b-[#B45309] active:border-b-2 px-8 sm:px-12 py-3 sm:py-3.5 shadow-pixel-lg transition-all cursor-pointer mb-8"
          id="button-play"
        >
          <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-[#000000] text-[#000000]" />
          <span className="font-pixel text-xs sm:text-sm font-bold text-[#000000] tracking-wider">
            ENTER ARENA
          </span>        </button>      </div>
      <div className="relative z-10 w-full flex justify-center pb-3 sm:pb-4 pointer-events-non">
        <div className="inline-flex items-center gap-2 bg-[#3D2817] border-2 border-[#26150B] shadow-pixel px-4 py-1.5 text-center">
          <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FCD34D]" />
         <span className="font-pixel text-[10px] sm:text-xs text-[#FDE68A] tracking-wider">
            BEST STREAK: {bestStreak}
          </span>
        </div>
      </div>
    </div>
  );
}
          
