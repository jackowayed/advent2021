import { readLines } from './util';

const FILENAME = "9.txt";

type Grid = number[][];

function readFile(): number[][] {
  return readLines(FILENAME).map(line => [...line].map(c => parseInt(c)));
}

function pointIsLower(y: number, x: number, dy: number, dx: number, grid: Grid) {
  const y_ = y + dy;
  const x_ = x + dx;
  if (y_ < 0 || x < 0 || y_ >= grid.length || x_ >= grid[0].length) return false;
  return grid[y_][x_] < grid[y][x];
}

function isLowPoint(y: number, x: number, grid: Grid): boolean {
  const dirs = [{ dy: 0, dx: 1 }, { dy: 1, dx: 0 }, { dy: 0, dx: -1 }, { dy: -1, dx: 0 }];
  for (const { dy, dx } of dirs) {
    if (pointIsLower(y, x, dy, dx, grid)) return false;
  }
  return true;
}
function part1() {
  const grid = readFile();
  let riskSum = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (isLowPoint(y, x, grid)) {
        riskSum += grid[y][x] + 1;
      }
    }
  }
  return riskSum;
}
console.log(part1());

function part2() {
  const lines = readFile();
}
console.log(part2());