# Bingo Game Board

A dynamic Bingo game board application built with React and TypeScript that allows users to customize their game board experience.

## Features

- Configurable grid sizes (3x3, 4x4, 5x5)
- Two number generation modes:
  - Random numbers with unique values
  - Range-based number filling (Bingo-style)
- Free Space feature for center cells
- Responsive and clean UI using Tailwind CSS
- Optimized performance with memoization

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Grid Size Selection:
   - Choose between 3x3, 4x4, or 5x5 grid sizes
   - Each size has its own number range:
     - 3x3: 1-30
     - 4x4: 1-80
     - 5x5: 1-75

2. Number Generation Modes:
   - Random Mode: Numbers are randomly distributed across the grid
   - Range Mode: Numbers are distributed in ranges across columns:
     - 3x3: 1-10, 11-20, 21-30
     - 4x4: 1-20, 21-40, 41-60, 61-80
     - 5x5: 1-15, 16-30, 31-45, 46-60, 61-75

3. Free Space Feature:
   - Toggle to enable/disable free space
   - Free space is marked in the center cell(s):
     - 3x3: Cell 5
     - 4x4: Cells 6
     - 5x5: Cell 13

## Project Structure

- `src/App.tsx`: Main application component with game logic
- `src/main.tsx`: Entry point of the application
- `src/index.css`: Tailwind CSS configuration
- `package.json`: Project dependencies and scripts
- `vite.config.ts`: Vite configuration
- `tailwind.config.js`: Tailwind CSS configuration

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- React Hooks (useState, useMemo)
