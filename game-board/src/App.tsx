import React from 'react';
import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { GridSize, GameBoardState, GRID_CONFIG, Range } from './types/gameBoard';

function App(): JSX.Element {
  const [state, setState] = useState<GameBoardState>({
    gridSize: 3,
    rangeMode: false,
    freeSpace: false
  });

  const { gridSize, rangeMode, freeSpace } = state;


    // Memoized function to generate numbers based on grid size and mode
  
  const generateNumbers = useMemo(() => {
    return (size: number, useRangeMode: boolean): number[] => {
      const totalCells = size * size;
      const { maxNumber, rangeSize } = GRID_CONFIG[size];
      
      const numbers = Array.from({ length: totalCells }, (_, i) => i + 1);
      if (!useRangeMode) {
        return numbers.sort(() => Math.random() - 0.5);
      }

      const ranges: Range[] = [];
      const numbersPerColumn = maxNumber / size;
      for (let i = 0; i < size; i++) {
        const start = i * numbersPerColumn + 1;
        const end = start + numbersPerColumn - 1;
        ranges.push({ start, end });
      }

      return numbers.map((_, colIndex) => {
        const { start, end } = ranges[colIndex % size];
        return Math.floor(Math.random() * (end - start + 1)) + start;
      });
    };
  }, []);

  
    // Memoized function to get center cells for free space
   
  const getCenterCells = useMemo(() => {
    return (size: number): number[] => {
      const center = Math.floor(size / 2);
      const cells: number[] = [];
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (i === center && j === center) {
            cells.push(i * size + j + 1);
          }
        }
      }
      return cells;
    };
  }, []);

  const numbers = useMemo(() => generateNumbers(gridSize, rangeMode), [gridSize, rangeMode]);
  const centerCells = useMemo(() => getCenterCells(gridSize), [gridSize]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Bingo Game Board</h1>
          <div className="flex justify-center gap-6 mb-6">
            <div className="flex items-center gap-4">
              <label className="text-lg font-semibold">Grid Size:</label>
              <select
                value={gridSize}
                onChange={(e) => setState(prev => ({ ...prev, gridSize: Number(e.target.value) as GridSize }))}
                className="
                  px-6 py-3
                  rounded-lg
                  border border-gray-300
                  text-lg bg-white
                  shadow-sm
                  transition-colors duration-200
                  hover:border-blue-500
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                "
              >
                <option value="3">3x3</option>
                <option value="4">4x4</option>
                <option value="5">5x5</option>
              </select>
            </div>
            <button
              onClick={() => setState(prev => ({ ...prev, rangeMode: !prev.rangeMode }))}
              className={`
                px-6 py-3
                rounded-lg
                font-semibold
                text-lg
                transition-all duration-200
                ${
                  rangeMode
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span className="text-center">Range Mode</span>
            </button>
            <button
              onClick={() => setState(prev => ({ ...prev, freeSpace: !prev.freeSpace }))}
              className={`
                px-6 py-3
                rounded-lg
                font-semibold
                text-lg
                transition-all duration-200
                ${
                  freeSpace
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span className="text-center">Free Space</span>
            </button>
          </div>
        </div>
        <div className="grid gap-4">
          {numbers.map((num, index) => (
            <div
              key={index}
              className={`w-28 h-28 border-2 border-gray-300 rounded-lg flex items-center justify-center text-3xl font-bold ${
                centerCells.includes(index + 1) && freeSpace
                  ? 'bg-gray-100 text-gray-500'
                  : 'bg-white'
              }`}
              style={{
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span className="text-center">
                {centerCells.includes(index + 1) && freeSpace ? 'Free' : num}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
