import { readLines } from './util';

const FILENAME = "8.txt";

type Row = {
  input: string[],
  output: string[],
};

function readFile(): Row[] {
  return readLines(FILENAME).map(l => {
    const inputStr = l.split("|")[0].trim();
    const outputStr = l.split("|")[1].trim();
    return {
      input: inputStr.split(" ").map(normalize),
      output: outputStr.split(" ").map(normalize),
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

function normalize(s: string): string {
  return [...s].sort().join("");
}

function isSuperset(superset: string, sub: string) {
  for (let m of sub) {
    if (!superset.includes(m)) return false;
  }
  return true;
}

function set(m, idx, s) {
  if (m[idx] !== undefined) {
    console.log(m);
    console.log(idx, s);
    throw new Error();
  }
  m[idx] = s;
}

function solveInput(input: string[]): Array<string> {
  const m = new Array<string>(10);
  // find the easy ones
  for (let s of input) {
    if (s.length === 2) {
      set(m, 1, s);
    }
    else if (s.length === 3) {
      set(m, 7, s);
    }
    else if (s.length === 4) {
      set(m, 4, s);
    }
    else if (s.length === 7) {
      set(m, 8, s);
    }
  }
  for (let s of input.filter(s => s.length === 5)) {
    if (isSuperset(s, m[1])) {
      // 3 is the only 5-length that is a supserset of 1
      set(m, 3, s);
    }
  }
  for (let s of input.filter(s => s.length === 6)) {
    if (isSuperset(s, m[3])) {
      set(m, 9, s);
    } else if (isSuperset(s, m[1])) {
      set(m, 0, s);
    } else {
      set(m, 6, s);
    }
  }
  for (let s of input.filter(s => s.length === 5 && s !== m[3])) {
    if (isSuperset(m[6], s)) {
      set(m, 5, s);
    } else {
      set(m, 2, s);
    }
  }
  return m;
}

function solve(r: Row): number {
  const m = solveInput(r.input);
  return parseInt(r.output.map(s => m.indexOf(s).toString()).join(""));
}

function part2() {
  const lines = readFile();
  let ct = 0;
  for (const r of lines) {
    ct += solve(r);
  }
  return ct;
}
console.log(part2());

/*
  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg

   0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....





 a: in 7 but not 1

 3: superset of 1, unlike 2 and 5.
 2: superset of 7 (and not ==3)
 5: otherwise

 9: superset of 3
 0: superset of 1 (and not ==9)
 6: otherwise


 known: 1 4 7 8


two:    1
three:  7
four:   4
five:   2 3 5
six:    0 6 9
seven:  8

 */