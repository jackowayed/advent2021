import { readLines } from './util';

const FILENAME = "5.txt";

type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

enum Direction {
  X,
  Y,
  Diag
};

function mapKey(x, y): string {
  return x + "," + y;
}

function readFile(): Line[] {
  return readLines(FILENAME).map(l => {
    const m = /(\d+),(\d+) -> (\d+),(\d+)/.exec(l)!;
    return { x1: parseInt(m[1])!, y1: parseInt(m[2])!, x2: parseInt(m[3])!, y2: parseInt(m[4])! };
  });
}

function part1() {
  const lines = readFile();
  const counts = new Map();
  for (const line of lines) {
    let direction = Direction.Diag;
    if (line.y1 === line.y2) direction = Direction.X;
    if (line.x1 === line.x2) direction = Direction.Y;
    let ymin = Math.min(line.y1, line.y2);
    let ymax = Math.max(line.y1, line.y2);
    let xmin = Math.min(line.x1, line.x2);
    let xmax = Math.max(line.x1, line.x2);
    let dx = 1;
    let dy = 1;
    if (direction === Direction.X) dy = 0;
    else if (direction === Direction.Y) dx = 0;
    for (let x = xmin, y = ymin; x <= xmax && y <= ymax; x += dx, y += dy) {
      const key = mapKey(x, y);
      const prevVal = counts.get(key) || 0;
      counts.set(key, prevVal + 1);
    }
  }
  let ct = 0;
  for (const v of counts.values()) {
    if (v > 1) ct++;
  }
  return ct;
}
console.log(part1());

function part2() {
  const lines = readFile();
}
console.log(part2());