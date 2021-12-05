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
  //const lines = [{ x1: 8, y1: 0, x2: 0, y2: 8 }];
  const counts = new Map();
  for (const line of lines) {
    let x = line.x1;
    let y = line.y1;
    const dx = Math.sign(line.x2 - line.x1);
    const dy = Math.sign(line.y2 - line.y1);
    do {
      //for (; x !== line.x2 + dx && y !== line.y2 + dy; x += dx, y += dy) {
      const key = mapKey(x, y);
      console.log(key);
      //if (key === "0,0") console.log(line);
      const prevVal = counts.get(key) || 0;
      counts.set(key, prevVal + 1);
      if (x === line.x2 && y === line.y2) break;
      x += dx;
      y += dy;
    } while (true);
  }
  let ct = 0;
  for (const v of counts.values()) {
    if (v > 1) ct++;
  }
  //console.log(counts);
  return ct;
}
console.log(part1());

function part2() {
  const lines = readFile();
}
console.log(part2());