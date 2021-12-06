import { readLines } from './util';

const FILENAME = "6.txt";

function readFile(): number[] {
  return readLines(FILENAME)[0].split(",").map(s => parseInt(s));
}

function doTurn(old: number[]) {
  const new_ = [];
  for (let n of old) {
    if (n === 0) {
      new_.push(8);
      new_.push(6);
    } else {
      new_.push(n - 1);
    }
  }
  return new_;
}

function part1() {
  let fish = readFile();
  for (let i = 0; i < 80; i++) {
    fish = doTurn(fish);
  }
  return fish.length;




}
console.log(part1());

function part2() {
  const lines = readFile();
}
console.log(part2());