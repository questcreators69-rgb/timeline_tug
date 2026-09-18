export type EventCategory = 'science' | 'technology' | 'space' | 'inventions';

export interface TimelineEvent {
  id: string;
  title: string;
  year: number;
  category: EventCategory;
  description: string;
  icon?: string;
}

export type GamePhase = 'MENU' | 'PLAYING' | 'REVEALING' | 'RESULT' | 'GAME-OVER';

export type GuessDirection = 'earlier' | 'later';

export interface RoundResult {
  isCorrect: boolean;
  isSameYear: boolean;
  difference: number;
  userGuess: GuessDirection;
}