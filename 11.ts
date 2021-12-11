import { readLines } from './util';

const FILENAME = "11test.txt";

type Grid = number[][];

function readFile(): Grid {
  return readLines(FILENAME).map(l => [...l].map(c => parseInt(c)));
}

function print(grid: Grid): void {
  for (let line of grid) {
    console.log(line.join(""));
  }
  console.log();
}

function flash(grid: Grid, flashY: number, flashX: number): void {
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dy === 0 && dx === 0) continue;
      const y = flashY + dy;
      const x = flashX + dx;
      if (y < 0 || y >= 10 || x < 0 || x >= 10) continue;
      grid[y][x]++;
    }
  }
}

function doFlashes(grid: Grid, hasFlashed: boolean[][]): void {
  let didFlash = true;
  let nFlashes = 0;
  while (didFlash) {
    didFlash = false;
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        if (grid[y][x] > 9 && !hasFlashed[y][x]) {
          didFlash = true;
          flash(grid, y, x);
          hasFlashed[y][x] = true;
        }
      }
    }
  }
}

function doTurn(grid: Grid): number {
  const hasFlashed = Array.from(Array(10), () => new Array(10));
  for (const y in grid) {
    for (const x in grid[y]) {
      grid[y][x]++;
    }
  }
  doFlashes(grid, hasFlashed);
  let nFlashes = 0;
  for (const y in grid) {
    for (const x in grid[y]) {
      if (hasFlashed[y][x]) {
        nFlashes++;
        //console.log(y, x);
        grid[y][x] = 0;
      }
    }
  }
  return nFlashes;
}

function part1() {
  const grid = readFile();
  let nFlashes = 0;
  for (let i = 0; i < 100; i++) {
    nFlashes += doTurn(grid);
  }
  return nFlashes;
}
console.log(part1());

function part2() {
  const grid = readFile();
  for (let i = 1; true; i++) {
    const nFlashes = doTurn(grid);
    if (nFlashes === 100) return i;
  }
}
console.log(part2());