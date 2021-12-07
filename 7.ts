import { readLines } from './util';

const FILENAME = "7.txt";

function readFile(): number[] {
  return readLines(FILENAME)[0].split(",").map(s => parseInt(s));
}

function part1() {
  const nums = readFile();
  nums.sort((a, b) => a - b);
  console.log(nums);
  /*
  let t = 0;
  for (let i of nums) {
    t += i;
  }
  const pos = Math.round(t / nums.length);
  */
  const pos = nums[nums.length / 2];
  console.log(pos);
  let fuel = 0;
  for (let i of nums) {
    fuel += Math.abs(pos - i);
  }
  return fuel;



}
//console.log(part1());

function calcOneFuel(steps) {
  let c = 0;
  for (let i = 0; i <= steps; i++) c += i;
  return c;
}

function calcFuel(nums, pos): number {
  let fuel = 0;
  for (let n of nums) {
    fuel += calcOneFuel(Math.abs(pos - n));
  }
  return fuel;
}

function part2() {
  const lines = readFile();
  const nums = readFile();
  let max = 0;
  for (let n of nums) {
    if (n > max) max = n;
  }

  let minFuel = 99999999999999999;

  for (let pos = 0; pos < max; pos++) {
    const newFuel = calcFuel(nums, pos);
    if (newFuel < minFuel) minFuel = newFuel;
  }
  return minFuel;
}
console.log(part2());