import { readLines } from './util';

const FILENAME = "3.txt";

function readFile() {
  return readLines(FILENAME);
}

function part1() {
  const lines = readFile();

  let eps = "";
  let gam = "";
  for (let i = 0; i < lines[0].length; i++) {
    let ones = 0;
    console.log(i);
    for (let j = 0; j < lines.length; j++) {
      if (lines[j][i] === "1") {
        ones++;
      }
    }
    if (ones > (lines.length / 2)) {
      console.log(ones);
      gam += "1";
      eps += "0";
    } else {
      console.log(ones);
      gam += "0";
      eps += "1";
    }
  }
  const gamma = parseInt(gam, 2);
  const epsilon = parseInt(eps, 2);
  console.log(gam, eps);
  console.log(gamma, epsilon);
  return gamma * epsilon;




}
//console.log(part1());

function mostCommonBit(lines, bit) {
  let ones = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i][bit] === "1")
      ones++;
  }
  return ones > (lines.length / 2) ? "1" : "0";
}

function filterLines(lines, bit, val) {
  let newLines = [];
  for (const l of lines) {
    if (l[bit] === val) {
      newLines.push(l);
    }
  }
  return newLines;
}

function part2() {
  let lines = readFile();
  console.log(lines.length);
  for (let i = 0; i < lines[0].length; i++) {
    const bit = mostCommonBit(lines, i);
    lines = filterLines(lines, i, bit);
    if (lines.length === 1) break;
  }
  console.log(lines.length);
  const ox = parseInt(lines[0], 2);
  lines = readFile();
  for (let i = 0; i < lines[0].length; i++) {
    let bit = mostCommonBit(lines, i);
    if (bit === "0") bit = "1";
    else bit = "0";
    lines = filterLines(lines, i, bit);
    if (lines.length === 1) break;
  }
  console.log(lines.length);
  const d = parseInt(lines[0], 2);
  console.log(d, ox);
  return d * ox;
}
console.log(part2());