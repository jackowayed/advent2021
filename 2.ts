import { readLines } from './util';

const FILENAME = "2.txt";

function readFile() {
  return readLines(FILENAME);
}

function part1() {
  const lines = readFile();
  let vert = 0;
  let hor = 0;
  for (let l of lines) {
    const num = parseInt(l.charAt(l.length - 1));
    if (l.startsWith("forward")) hor += num;
    else if (l.startsWith("up")) vert -= num;
    else if (l.startsWith("down")) vert += num;
  }
  return vert * hor;
}
console.log(part1());

function part2() {
  const lines = readFile();
  let vert = 0;
  let hor = 0;
  let aim = 0;
  for (let l of lines) {
    const num = parseInt(l.charAt(l.length - 1));
    if (l.startsWith("forward")) {
      hor += num;
      vert += aim * num;
    }
    else if (l.startsWith("up")) aim -= num;
    else if (l.startsWith("down")) aim += num;
  }
  return vert * hor;
}
console.log(part2());
