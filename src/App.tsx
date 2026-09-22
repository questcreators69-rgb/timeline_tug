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
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 antialiased selection:bg-amber-500/30">
      
      <ParticleCanvas active={showConfetti} />

      
      <Header        
        streak={streak}
        bestStreak={bestStreak}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onLogoClick={() => setPhase('MENU')}
      />
    
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 w-full max-w-5xl mx-auto">
        {phase === 'MENU' && (
          <StartScreen onStartGame={startNewGame} bestStreak={bestStreak} />
        )}

        {(phase === 'PLAYING' || phase === 'REVEALING' || phase === 'RESULT') &&
          anchor &&
          challenger && (
            <div className="w-full flex flex-col items-center animate-fadeIn">

              <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3 md:gap-5 lg:gap-8 my-2 sm:my-3">

                <div className="w-full md:w-auto flex justify-center">
                  <GameCard                    event={anchor}
                    role="anchor"
                    isRevealed={true}
                  />
                </div>
                <div className="flex md:hidden relative my-1 items-center justify-center w-full max-w-xs">
                  <div className="h-px flex-1 bg-zinc-800/80" />
                  <span className="mx-3 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-0.5 font-display text-xs font-bold text-zinc-400 uppercase tracking-widest shadow-sm">
                    VS                 
                  </span>                  
                  <div className="h-px flex-1 bg-zinc-800/80" />
                </div>
                <div className="hidden md:flex flex-col items-center justify-center shrink-0 self-center px-1 lg:px-2">
                  <div className="w-px h-16 lg:h-20 bg-zinc-800/80" />
                  <span className="my-2.5 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 font-display text-xs font-bold text-zinc-400 uppercase tracking-widest shadow-sm">
                    VS                 
                 </span>
                  <div className="w-px h-16 lg:h-20 bg-zinc-800/80" />
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
              {showFirstTimeHint && phase === 'PLAYING' && streak === 0 && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-400 animate-pulse">
                  <span>← Drag left for Earlier</span>
                  <span className="text-zinc-600">•</span>
                  <span>Drag right for Later →</span>
                </div>
              )}

              <ActionControls
                onGuess={commitGuess}
                disabled={phase !== 'PLAYING'}
              />

              <div className="mt-4 text-[11px] text-zinc-400 hidden sm:block">
                Use <kbd className="font-mono bg-zinc-900 px-1 py-0.5 rounded border border-zinc-800 text-zinc-400">←</kbd> / <kbd className="font-mono bg-zinc-900 px-1 py-0.5 rounded border border-zinc-800 text-zinc-400">→</kbd> arrow keys to make your guess
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
    
            