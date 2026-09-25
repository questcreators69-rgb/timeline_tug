import { useState, useEffect, useRef, useCallback } from 'react';
import { GamePhase, GuessDirection, RoundResult, TimelineEvent } from './types';
import {
  SWIPE_THRESHOLD,
  evaluateGuess,
  getStoredBestStreak,
  saveBestStreak,
  initializeDeck,
  drawNextChallenger,
  GameDeckState,
} from './game/gameLogic';
import { sound } from './game/audio';
import { Header } from './components/Header';
import { StartScreen } from './components/StartScreen';
import { GameCard } from './components/GameCard';
import { ActionControls } from './components/ActionControls';
import { GameOverModal } from './components/GameOverModal';
import { ParticleCanvas } from './components/ParticleCanvas';

export default function App() {

  const [phase, setPhase] = useState<GamePhase>('MENU');
  const [anchor, setAnchor] = useState<TimelineEvent | null>(null);
  const [challenger, setChallenger] = useState<TimelineEvent | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(getStoredBestStreak());
  const [isMuted, setIsMuted] = useState<boolean>(sound.isMuted());
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);
  const [isBusted, setIsBusted] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showFirstTimeHint, setShowFirstTimeHint] = useState<boolean>(true);

  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const dragStartXRef = useRef<number>(0);
  const isPointerDownRef = useRef<boolean>(false);
  const deckStateRef = useRef<GameDeckState | null>(null);
  const activeTimerRef = useRef<number | null>(null);

  const clearActiveTimer = useCallback(() => {
    if (activeTimerRef.current !== null) {
      window.clearTimeout(activeTimerRef.current);
      activeTimerRef.current = null;
    }
  }, []);

  const startNewGame = useCallback(() => {
    clearActiveTimer();
    const { anchor: initialAnchor, challenger: initialChallenger, deckState } = initializeDeck();
    setAnchor(initialAnchor);
    setChallenger(initialChallenger);
    deckStateRef.current = deckState;

    setStreak(0);
    setRoundResult(null);
    setIsBusted(false);
    setDragOffset(0);
    setIsDragging(false);
    setShowConfetti(false);
    setPhase('PLAYING');
    sound.playCardTick();
  }, [clearActiveTimer]);

  const commitGuess = useCallback(
    (direction: GuessDirection) => {
      if (phase !== 'PLAYING' || !anchor || !challenger) return;

      setPhase('REVEALING');
      setIsDragging(false);
      setDragOffset(0);
      setShowFirstTimeHint(false);
      sound.playCardTick();

      activeTimerRef.current = window.setTimeout(() => {
        const result = evaluateGuess(anchor.year, challenger.year, direction);
        setRoundResult(result);
        setPhase('RESULT');

        if (result.isCorrect) {

          if (result.isSameYear) {
            sound.playSameYearFanfare();
          } else {
            sound.playCorrectChime();
          }

        setShowConfetti(true);

          setStreak((prev) => {
            const nextStreak = prev + 1;
            setBestStreak((currentBest) => {
              if (nextStreak > currentBest) {
                saveBestStreak(nextStreak);
                return nextStreak;
              }
              return currentBest;
            });
            return nextStreak;
          });
    
          activeTimerRef.current = window.setTimeout(() => {
            if (!deckStateRef.current) return;

  
            const newAnchor = challenger;
            const { nextChallenger, updatedDeckState } = drawNextChallenger(
              newAnchor.id,
              deckStateRef.current            );

            deckStateRef.current = updatedDeckState;
            setAnchor(newAnchor);
            setChallenger(nextChallenger);
            setRoundResult(null);
            setShowConfetti(false);
            setPhase('PLAYING');
          }, 1400);
        } else {
  
          sound.playBustedThud();
          setIsBusted(true);

  
          activeTimerRef.current = window.setTimeout(() => {
            setPhase('GAME-OVER');
          }, 1200);
        }
      }, 500);
    },
    [anchor, challenger, phase]
  );

  
  const handleToggleMute = useCallback(() => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  }, []);

  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase === 'PLAYING') {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          commitGuess('earlier');
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
        commitGuess('later');
        }
      } else if (phase === 'MENU') {
        if (e.code === 'Space' || e.key === ' ') {
          e.preventDefault();
          startNewGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [phase, commitGuess, startNewGame]);

  
  useEffect(() => {
    return () => {
      clearActiveTimer();
    };
  }, [clearActiveTimer]);

  
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (phase !== 'PLAYING') return;

    isPointerDownRef.current = true;
    dragStartXRef.current = e.clientX;
    setIsDragging(true);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
  
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current || phase !== 'PLAYING') return;

    const deltaX = e.clientX - dragStartXRef.current;
  
    const clampedDelta = Math.max(-180, Math.min(180, deltaX));
    setDragOffset(clampedDelta);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false; 
  
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
  
    }

    if (phase !== 'PLAYING') {
      setDragOffset(0);
    setIsDragging(false);
      return;
    }

    if (dragOffset <= -SWIPE_THRESHOLD) {
      commitGuess('earlier');
    } else if (dragOffset >= SWIPE_THRESHOLD) {
      commitGuess('later');
    } else {
  
      setDragOffset(0);
      setIsDragging(false);
    }
  };

  const handlePointerCancel = () => {
    isPointerDownRef.current = false;
    setDragOffset(0);
    setIsDragging(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#121021] text-[#F3EFE6] antialiased selection:bg-[#FCD34D]/30">
      
      <ParticleCanvas active={showConfetti} />

      
      <Header        
        streak={streak}
        bestStreak={bestStreak}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onLogoClick={() => setPhase('MENU')}
      />
    
      <main className="flex-1 flex flex-col items-center justify-between w-full relative overflow-hidden">
        {phase === 'MENU' && (
          <StartScreen onStartGame={startNewGame} bestStreak={bestStreak} />
        )}

        {(phase === 'PLAYING' || phase === 'REVEALING' || phase === 'RESULT') &&
          anchor &&
          challenger && (
        <div className="relative w-full flex-1 flex flex-col justify-between items-center bg-[#18162E]">
  <div className="absolute inset-0 pointer-events-none opacity-40">
    <svg className="w-full h-full">
      <defs>
        <pattern id="dungeon-bricks" width="64" height="32" patternUnits="userSpaceOnUse">
          <rect width="64"height="32" fill="#18162E" />
          <rect x="0" y="1" width="62" height="13" fill="#221E40" rx="1" />
          <rect x="32" y="17" width="62" height="13" fill="#221E40" rx="1" />
          <rect x="0" y="17" width="30" height="13" fill="#221E40" rx="1" />
          <line x1="0" y1="15" x2="64" y2="15" stroke="#100E22" strokeWidth="2" />
          <line x1="0" y1="31" x2="64" y2="31" stroke="#100E22" strokeWidth="2" />
          <line x1="63" y1="0" x2="63" y2="15" stroke="#100E22" strokeWidth="2" />
          <line x1="31" y1="16" x2="31" y2="31" stroke="#100E22" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dungeon-bricks)" />
    </svg>  </div>
  <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center pt-3 sm:pt-6 px-3 sm:px-6">
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 my-1 sm:my-3">
        

                <div className="w-full md:w-auto flex justify-center">
                  <GameCard
                    event={anchor}
                    role="anchor"
                    isRevealed={true}
                  />
                </div>
                <div className="flex md:hidden relative my-1 items-center justify-center w-full max-w-xs">
  <div className="h-0.5 flex-1 bg-[#3D355F]" />
  <span className="mx-2.5 border-2 border-[#3D355F] bg-[#1C1833] px-2.5 py-1 font-pixel text-xs text-white uppercase shadow-pixel">
    VS
 </span>
  <div className="h-0.5 flex-1 bg-[#3D355F]" />
</div>

<div className="hidden md:flex flex-col items-center justify-center shrink-0 self-center px-1">
  <div className="w-0.5 h-20 lg:h-28 bg-[#3D355F]" />
  <span className="my-2.5 border-2 border-[#3D355F] bg-[#1C1833] px-2.5 py-1.5 font-pixel text-xs text-white uppercase shadow-pixel">
    VS
  </span>
  <div className="w-0.5 h-20 lg:h-28 bg-[#3D355F]" />
</div>
                
                <div                  
                    className={`w-full md:w-auto flex justify-center touch-none ${
                    phase === 'PLAYING' ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
                }`}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerCancel}
                >
                  <GameCard                    event={challenger}
                    role="challenger"
                    isRevealed={phase === 'REVEALING' || phase === 'RESULT'}
                    dragOffset={dragOffset}
                    dragThreshold={SWIPE_THRESHOLD}
                    roundResult={roundResult}
                    isBusted={isBusted}
                  />
                </div>              
              </div>
                
              <ActionControls      onGuess={commitGuess}
      disabled={phase !== 'PLAYING'}
    />
  </div>
  <div className="relative z-10 w-full mt-4 sm:mt-6">
    <svg      className="w-full h-10 sm:h-12 pixelated block"
      viewBox="0 0 800 48"
      preserveAspectRatio="none"
    >
      <g fill="#48BB78">
        <polygon points="100,10 102,2 105,10" />
        <polygon points="104,10 108,0 111,10" />
        <polygon points="110,10 114,4 116,10" />

        <polygon points="260,10 262,2 265,10" />
        <polygon points="264,10 268,0 271,10" />
        <polygon points="270,10 274,4 276,10" />

        <polygon points="520,10 522,2 525,10" />
        <polygon points="524,10 528,0 531,10" />
        <polygon points="530,10 534,4 536,10" />

        <polygon points="740,10 742,2 745,10" />
        <polygon points="744,10 748,0 751,10" />
        <polygon points="750,10 754,4 756,10" />
      </g>
      <rect x="0" y="10" width="800" height="18" fill="#3B345C" />
      <rect x="0" y="28" width="800" height="20" fill="#292342" />

      <line x1="0" y1="10" x2="800" y2="10" stroke="#1D1933" strokeWidth="2" />
      <line x1="0" y1="28" x2="800" y2="28" stroke="#1D1933" strokeWidth="2" />

      <line x1="60" y1="10" x2="60" y2="28" stroke="#1D1933" strokeWidth="2" />
      <line x1="140" y1="10" x2="140" y2="28" stroke="#1D1933" strokeWidth="2" />
      <line x1="220" y1="10" x2="220" y2="28" stroke="#1D1933" strokeWidth="2" />
      <line x1="300" y1="10" x2="300" y2="28" stroke="#1D1933" strokeWidth="2" />
      <line x1="380" y1="10" x2="380" y2="28" stroke="#1D1933" strokeWidth="2" />
      <line x1="460" y1="10" x2="460" y2="28" stroke="#1D1933" strokeWidth="2" />
      <line x1="540" y1="10" x2="540" y2="28" stroke="#1D1933" strokeWidth="2" />
      <line x1="620" y1="10" x2="620" y2="28" stroke="#1D1933" strokeWidth="2" />
      <line x1="700" y1="10" x2="700" y2="28" stroke="#1D1933" strokeWidth="2" />
      <line x1="780" y1="10" x2="780" y2="28" stroke="#1D1933" strokeWidth="2" />

      <line x1="100" y1="28" x2="100" y2="48" stroke="#1D1933" strokeWidth="2" />
      <line x1="180" y1="28" x2="180" y2="48" stroke="#1D1933" strokeWidth="2" />
      <line x1="260" y1="28" x2="260" y2="48" stroke="#1D1933" strokeWidth="2" />
      <line x1="340" y1="28" x2="340" y2="48" stroke="#1D1933" strokeWidth="2" />
      <line x1="420" y1="28" x2="420" y2="48" stroke="#1D1933" strokeWidth="2" />
      <line x1="500" y1="28" x2="500" y2="48" stroke="#1D1933" strokeWidth="2" />
      <line x1="580" y1="28" x2="580" y2="48" stroke="#1D1933" strokeWidth="2" />
      <line x1="660" y1="28" x2="660" y2="48" stroke="#1D1933" strokeWidth="2" />
      <line x1="740" y1="28" x2="740" y2="48" stroke="#1D1933" strokeWidth="2" />
      </svg>
  </div>
</div>          
                )}

        {phase === 'GAME-OVER' && anchor && challenger && roundResult && (
          <GameOverModal            streak={streak}
            bestStreak={bestStreak}
            anchor={anchor}
            challenger={challenger}
            result={roundResult}
            onRestart={startNewGame}
          />
        )}
      </main>
    </div>
  );
}
    
            