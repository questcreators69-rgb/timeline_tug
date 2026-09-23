## Description

A fast-paced historical timeline guessing game where players test their chronological intuition on scientific breakthroughs, technological milestones, space exploration, and cultural inventions.

## Screenshots

![Timeline Tug Gameplay](./assets/image1.png) ![Timeline Tug Start Screen](./assets/image.png)

## Features

- **Timeline comparison:** Compare a hidden challenger against a visible anchor event.
- **Earlier / Later tug mechanic:** Drag left for Earlier or right for Later.
- **Mouse, touch, and keyboard controls:** arrow keys (`←` / `→`), and physical on-screen buttons.
- **Hidden-year reveal:** 3D perspective flip animation that unveils the mystery year with an ink-stamp result indicator.
- **Streak and personal best:** Tracks consecutive correct answers and stores your personal best streak in `localStorage`.
- **Correct / incorrect feedback:** Celebratory chime on success; horizontal shake on failure.
- **Zero external audio /API dependencies:** Used Web Audio API sound effects

### Requirements

- Node.js 20 or later.
- npm (or pnpm / bun).

### Installation

git clone https://github.com/questcreators69-rgb/timeline_tug.git
cd timeline_tug
npm install

### To run the game

npm run dev

The application will start on `http://localhost:3000`.

- **Frontend Structure:** Built with React 19, TypeScript, and Tailwind CSS.
- **Game State Management:** A simple state model (`'MENU' | 'PLAYING' | 'REVEALING' | 'RESULT' | 'GAME-OVER'`) governs game phases.
- **Timeline Dataset:** Curated collection of landmark science, technology, space, and invention breakthroughs with canonical dates, category-driven icons, and meaningful representation of women in STEM with the use of AI.
- **Card Comparison Logic:** Encapsulated in `src/game/gameLogic.ts`. It compares `challenger.year` to `anchor.year`, checks for equality and computes the year difference.
- **Scoring & Persistence:** Current streak updates reactively; new best scores persist across browser refreshes using `localStorage`.

## Tech stack

- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Lucide Icons (`lucide-react`)**

## License

MIT License
