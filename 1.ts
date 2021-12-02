import { readInts } from './util';

const FILENAME = "1.txt";

function readFile() {
  return readInts(FILENAME);
}

function part1() {
  const lines = readFile();
  let ct = 0;
  let prev = -1;
  for (let l of lines) {
    if (prev !== -1 && prev < l) {
      ct++;
    }
    prev = l;
  }
  return ct;


}
console.log(part1());

function part2() {
  const lines = readFile();
  let ct = 0;
  for (let i = 3; i < lines.length; i++) {
    if (lines[i] > lines[i - 3]) {
      ct++;
    }
  }
  return ct;
}
console.log(part2());