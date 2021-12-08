import { readLines } from './util';

const FILENAME = "8.txt";

type Row = {
  input: string[],
  output: string[],
};

function readFile() {
  return readLines(FILENAME).map(l => {
    const inputStr = l.split("|")[0].trim();
    const outputStr = l.split("|")[1].trim();
    return {
      input: inputStr.split(" "),
      output: outputStr.split(" ")
    };
  });
}

function part1() {
  const lines = readFile();
  let ones = 0, fours = 0, sevens = 0, eights = 0;
  for (let { output } of lines) {
    for (let s of output) {
      if (s.length === 2) ones++;
      else if (s.length === 3) sevens++;
      else if (s.length === 4) fours++;
      else if (s.length === 7) eights++;
    }
  }
  return ones + fours + sevens + eights;



}
console.log(part1());

function part2() {
  const lines = readFile();
}
console.log(part2());