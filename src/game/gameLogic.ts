import { GuessDirection, RoundResult, TimelineEvent } from '../types';
import { TIMELINE_EVENTS } from '../data/timelineData';

export const SWIPE_THRESHOLD = 90;
export const MAX_CARD_ROTATION = 14;

const BEST_STREAK_STORAGE_KEY = 'timeline-tug-best-streak';

export function getStoredBestStreak(): number {
  try {
    const raw = localStorage.getItem(BEST_STREAK_STORAGE_KEY);
    if (!raw) return 0;
    const parsed = parseInt(raw, 10);
    return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
  } catch {
    return 0;
  }
}

export function saveBestStreak(streak: number): void {
  try {
    const current = getStoredBestStreak();
    if (streak > current) {
      localStorage.setItem(BEST_STREAK_STORAGE_KEY, String(streak));
    }
  } catch {
    
  }
}

export function evaluateGuess(
  anchorYear: number,
  challengerYear: number,
  guess: GuessDirection): RoundResult {
  const isSameYear = challengerYear === anchorYear;
  const difference = Math.abs(challengerYear - anchorYear);

  let isCorrect = false;
  if (isSameYear) {
    
    isCorrect = true;
  } else if (guess === 'earlier') {
    isCorrect = challengerYear < anchorYear;
  } else if (guess === 'later') {
    isCorrect = challengerYear > anchorYear;
  }

  return {
    isCorrect,
    isSameYear,
    difference,
    userGuess: guess,
  };
  }

export function shuffleDeck(items: TimelineEvent[]): TimelineEvent[] {
  const deck = [...items];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export interface GameDeckState {
  remainingCards: TimelineEvent[];
  seenCardIds: Set<string>;
}
export function initializeDeck(allEvents: TimelineEvent[] = TIMELINE_EVENTS): {
  anchor: TimelineEvent;
  challenger: TimelineEvent;
  deckState: GameDeckState;
} {
  const shuffled = shuffleDeck(allEvents);
  const anchor = shuffled[0];
  const challenger = shuffled[1];

  const seen = new Set<string>([anchor.id, challenger.id]);
  const remaining = shuffled.slice(2);

  return {
    anchor,
    challenger,
    deckState: {
      remainingCards: remaining,
      seenCardIds: seen,
    },
  };
}

export function drawNextChallenger(
  currentAnchorId: string,
  deckState: GameDeckState,
  allEvents: TimelineEvent[] = TIMELINE_EVENTS ):
  { nextChallenger: TimelineEvent; updatedDeckState: GameDeckState } {
 let remaining = [...deckState.remainingCards];

  
  if (remaining.length === 0) {
    const freshDeck = shuffleDeck(allEvents.filter((ev) => ev.id !== currentAnchorId));
    remaining = freshDeck;
  }

  
  const cardIndex = remaining.findIndex((ev) => ev.id !== currentAnchorId);
  const nextCard = cardIndex >= 0 ? remaining[cardIndex] : remaining[0];
  remaining.splice(cardIndex >= 0 ? cardIndex : 0, 1);

  const seen = new Set(deckState.seenCardIds);
  seen.add(nextCard.id);

  return {
    nextChallenger: nextCard,
    updatedDeckState: {
      remainingCards: remaining,
      seenCardIds: seen,
    },
  };
  }


