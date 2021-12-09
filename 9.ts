import { readLines } from './util';

const FILENAME = "9.txt";

type Grid = number[][];

function readFile(): number[][] {
  return readLines(FILENAME).map(line => [...line].map(c => parseInt(c)));
}

function pointIsLowerOrEqual(y: number, x: number, dy: number, dx: number, grid: Grid, debugArr: number[]) {
  const y_ = y + dy;
  const x_ = x + dx;
  if (y_ < 0 || x_ < 0 || y_ >= grid.length || x_ >= grid[0].length) return false;
  const point = grid[y_][x_];
  if (point === undefined) {
    console.error(y, x, dy, dx);
  }
  debugArr.push(grid[y_][x_]);
  return grid[y_][x_] <= grid[y][x];
}

function isLowPoint(y: number, x: number, grid: Grid): boolean {
  const dirs = [{ dy: 0, dx: 1 }, { dy: 1, dx: 0 }, { dy: 0, dx: -1 }, { dy: -1, dx: 0 }];
  const debugArr = [];
  for (const { dy, dx } of dirs) {
    if (pointIsLowerOrEqual(y, x, dy, dx, grid, debugArr)) return false;
  }
  console.log(grid[y][x], debugArr, y, x);
  return true;
}
function part1() {
  const grid = readFile();
  let riskSum = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (isLowPoint(y, x, grid)) {
        //console.log(y, x);
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