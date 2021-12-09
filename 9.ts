import { readLines } from './util';

const FILENAME = "9.txt";

type Grid = number[][];

function readFile(): number[][] {
  return readLines(FILENAME).map(line => [...line].map(c => parseInt(c)));
}

function outOfBounds(y, x, grid) {
  return y < 0 || x < 0 || y >= grid.length || x >= grid[0].length;
}

function pointIsLowerOrEqual(y: number, x: number, dy: number, dx: number, grid: Grid, debugArr: number[]) {
  const y_ = y + dy;
  const x_ = x + dx;
  if (outOfBounds(y_, x_, grid)) return false;
  const point = grid[y_][x_];
  if (point === undefined) {
    console.error(y, x, dy, dx);
  }
  debugArr.push(grid[y_][x_]);
  return grid[y_][x_] <= grid[y][x];
}

const DIRS = [{ dy: 0, dx: 1 }, { dy: 1, dx: 0 }, { dy: 0, dx: -1 }, { dy: -1, dx: 0 }];

function isLowPoint(y: number, x: number, grid: Grid): boolean {

  const debugArr = [];
  for (const { dy, dx } of DIRS) {
    if (pointIsLowerOrEqual(y, x, dy, dx, grid, debugArr)) return false;
  }
  //console.log(grid[y][x], debugArr, y, x);
  return true;
}

type Point = { y: number, x: number; };

function lowPoints(grid: Grid): Point[] {
  let points = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (isLowPoint(y, x, grid)) {
        points.push({ y: y, x: x });
      }
    }
  }
  return points;
}

function part1() {
  const grid = readFile();
  let riskSum = 0;
  for (const { y, x } of lowPoints(grid)) {
    riskSum += grid[y][x] + 1;
  }
  return riskSum;
}
console.log(part1());

function setKey(y, x) {
  return y + "," + x;
}

function basinSize(y, x, grid, visited: Set<string>) {
  if (outOfBounds(y, x, grid) || grid[y][x] == 9 || visited.has(setKey(y, x))) return 0;
  visited.add(setKey(y, x));
  let size = 1; // count this square
  for (const { dy, dx } of DIRS) {
    size += basinSize(y + dy, x + dx, grid, visited);
  }
  return size;
}

function part2() {
  const grid = readFile();
  const sizes = [];
  for (const { y, x } of lowPoints(grid)) {
    sizes.push(basinSize(y, x, grid, new Set()));
  }
  sizes.sort((a, b) => b - a);
  return sizes[0] * sizes[1] * sizes[2];
}
console.log(part2());