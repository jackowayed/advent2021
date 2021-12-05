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
  Y
};

function mapKey(x, y): string {
  return x + "," + y;
}

function readFile(): Line[] {
  return readLines(FILENAME).map(l => {
    const m = /(\d+),(\d+) -> (\d+),(\d+)/.exec(l)!;
    return { x1: parseInt(m[1])!, y1: parseInt(m[2])!, x2: parseInt(m[3])!, y2: parseInt(m[4])! };
  }).filter(l => l.x1 === l.x2 || l.y1 === l.y2);
}

function part1() {
  const lines = readFile();
  const counts = new Map();
  for (const line of lines) {
    let direction = Direction.X;
    if (line.x1 === line.x2) direction = Direction.Y;
    let endpoint1, endpoint2;
    if (direction === Direction.Y) {
      endpoint1 = Math.min(line.y1, line.y2);
      endpoint2 = Math.max(line.y1, line.y2);
    } else {
      endpoint1 = Math.min(line.x1, line.x2);
      endpoint2 = Math.max(line.x1, line.x2);
    }
    for (let i = endpoint1; i <= endpoint2; i++) {
      const x = direction === Direction.X ? i : line.x1;
      const y = direction === Direction.Y ? i : line.y1;
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



  const lines2 = readFile();
}
console.log(part1());

function part2() {
  const lines = readFile();
}
console.log(part2());