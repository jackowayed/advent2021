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
//console.log(part1());

const MEM = new Map();

function key(timer, daysLeft) {
  return timer + "," + daysLeft;
}

function endingFish(timer: number, daysLeft: number): number {
  //console.log(timer, daysLeft);
  if (daysLeft === 0) return 1;
  const key_ = key(timer, daysLeft);
  if (MEM.has(key_)) return MEM.get(key_);
  let val = 0;
  if (timer === 0) {
    //console.log("0");
    val = endingFish(8, daysLeft - 1) + endingFish(6, daysLeft - 1);
    //console.log(val);
  } else {
    val = endingFish(timer - 1, daysLeft - 1);
    //console.log(val);
  }
  if (val === NaN) {
    //console.log(timer, daysLeft);
    throw new Error("NaN");
  }
  //console.log(val);
  MEM.set(key_, val);
  return val;
}

function part2() {
  const fish = readFile();
  //const fish = [5];
  const mem = new Map();
  let count = 0;
  for (let n of fish) {
    const e = endingFish(n, 256);
    console.log(e);
    count += e;
  }
  return count;
}
console.log(part2());