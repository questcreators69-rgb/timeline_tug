## Description

A fast-paced historical timeline guessing game where players test their chronological intuition on scientific breakthroughs, technological milestones, space exploration, and cultural inventions.

## Screenshots

        ![Timeline Tug Gameplay](./assets/image1.png)
        ![Timeline Tug Start Screen](./assets/image.png)


## About

- **What the project is:** TIMELINE TUG is a browser game centered on chronological comparison.
- **Who it is for:** Science enthusiasts, trivia fans, students, and curious minds of all ages who enjoy bite-sized historical challenges.

## Features

- **Timeline comparison gameplay:** Compare a hidden challenger against a visible anchor event.
- **Earlier / Later tug mechanic:** Drag left for Earlier or right for Later.
- **Mouse, touch, and keyboard controls:** arrow keys (`←` / `→`), and physical on-screen buttons.
- **Hidden-year reveal:** 3D perspective flip animation that unveils the mystery year with an ink-stamp result indicator.
- **Streak and personal best:** Tracks consecutive correct answers and stores your personal best streak in `localStorage`.
- **Correct / incorrect feedback:** Celebratory chime on success; horizontal shake on failure.
- **Zero external audio /API dependencies:** Web Audio API sound effects

## Quick start

1. Click **PLAY** on the start screen.
2. Observe the **Anchor Card** with its confirmed historical year.
3. Review the **Challenger Card** with its mystery year (`/`).
4. Make your guess
5. Watch the card flip to reveal the year.

### Requirements

- Node.js 20 or later.
- npm (or pnpm / bun).

### Installation

git clone https://github.com/questcreators69-rgb/timeline_tug.git
cd timeline_tug
npm install

### Start the game

npm run dev

The application will start on `http://localhost:3000`.

- **Frontend Structure:** Built with React 19, TypeScript, and Tailwind CSS. The interface is decomposed into focused, single-responsibility components: `GameCard`, `ActionControls`, `Header`, `StartScreen`, `GameOverModal`, and `ParticleCanvas`.
- **Game State Management:** A simple state model (`'MENU' | 'PLAYING' | 'REVEALING' | 'RESULT' | 'GAME-OVER'`) governs game phases without boolean spaghetti.
- **Timeline Dataset:** Curated collection of landmark science, technology, space, and invention breakthroughs with canonical dates, category-driven icons, and meaningful representation of women in STEM.
- **Card Comparison Logic:** Encapsulated in `src/game/gameLogic.ts`. It compares `challenger.year` to `anchor.year`, checks for equality (same-year win), and computes the absolute year difference.
- **Scoring & Persistence:** Current streak updates reactively; new best scores persist across browser refreshes using `localStorage` under key `timeline-tug-best-streak`.

## Technology stack

- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Lucide Icons (`lucide-react`)**

## License

MIT License
