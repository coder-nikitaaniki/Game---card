export interface Range {
  start: number;
  end: number;
}

export interface GridCell {
  value: number | string;
  isFreeSpace: boolean;
}

export type GridSize = 3 | 4 | 5;

export interface GameBoardState {
  gridSize: GridSize;
  rangeMode: boolean;
  freeSpace: boolean;
}

export const GRID_CONFIG: Record<GridSize, {
  maxNumber: number;
  rangeSize: number;
}> = {
  3: { maxNumber: 30, rangeSize: 10 },
  4: { maxNumber: 80, rangeSize: 20 },
  5: { maxNumber: 75, rangeSize: 15 }
};
