import { readLines } from './util';
const _ = require("lodash");

const FILENAME = "13.txt";

type Grid = boolean[][];
type Puzzle = {
  grid: Grid,
  instructions: Instruction[],
};
type Point = {
  x: number,
  y: number,
};
type Instruction = {
  axisIsX: boolean,
  coordinate: number,
};

function makeGrid(y: number, x: number) {
  return Array.from(Array(y), () => Array.from(Array(x), () => false));
}

function readFile(): Puzzle {
  const lines = readLines(FILENAME);
  const points: Point[] = [];
  let i = 0;
  while (lines[i] !== "") {
    const split = lines[i].split(",");
    points.push({ x: parseInt(split[0]), y: parseInt(split[1]) });
    i++;
  }
  const maxX = _.maxBy(points, "x").x;
  const maxY = _.maxBy(points, "y").y;
  const grid = makeGrid(maxY + 1, maxX + 1);
  for (const { y, x } of points) {
    grid[y][x] = true;
  }
  const instructions = [];
  for (i++; i < lines.length; i++) {
    const axis = lines[i][11];
    instructions.push({
      axisIsX: axis === "x",
      coordinate: parseInt(lines[i].substring(13)),
    });
  }
  return {
    grid: grid,
    instructions: instructions,
  };
}

function fillLine(grid: Grid, newGrid: Grid, oldY: number, newY: number) {
  for (let x = 0; x < grid[oldY].length; x++) {
    if (grid[oldY][x]) newGrid[newY][x] = true;
  }
}

function fillColumn(grid: Grid, newGrid: Grid, oldX: number, newX: number) {
  for (let y = 0; y < grid.length; y++) {
    if (grid[y][oldX]) {
      newGrid[y][newX] = true;
    }
  }
}

function reflectY(grid: Grid, coordinate: number): Grid {
  const newGrid = makeGrid(coordinate, grid[0].length);
  for (let y = 0; y < grid.length; y++) {
    if (y < coordinate) {
      fillLine(grid, newGrid, y, y);
    } else if (y === coordinate) {
      // skip this row. assert blank?
    } else {
      const reflectedCoord = coordinate - (y - coordinate);
      fillLine(grid, newGrid, y, reflectedCoord);
    }
  }
  return newGrid;
}

function reflectX(grid: Grid, coordinate: number): Grid {
  const newGrid = makeGrid(grid.length, coordinate);
  for (let x = 0; x < grid[0].length; x++) {
    if (x < coordinate) {
      fillColumn(grid, newGrid, x, x);
    } else if (x === coordinate) {
      // skip
    } else {
      fillColumn(grid, newGrid, x, coordinate - (x - coordinate));
    }
  }
  return newGrid;
}

function print(grid: Grid) {
  for (const row of grid) {
    console.log(row.map(p => p ? "#" : ".").join(""));
  }
}

function countDots(grid: Grid): number {
  return _.sumBy(grid, line => _.sum(line));
}

function part1() {
  let { grid, instructions } = readFile();
  //print(grid);
  console.log(countDots(grid));
  for (const inst of instructions) {
    if (inst.axisIsX) {
      grid = reflectX(grid, inst.coordinate);
    } else {
      grid = reflectY(grid, inst.coordinate);
    }
  }
  print(grid);
  return countDots(grid);
}
console.log(part1());

function part2() {
  const lines = readFile();
}
console.log(part2());