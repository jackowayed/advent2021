import { readLines } from './util';

const FILENAME = "10.txt";

function readFile() {
  return readLines(FILENAME);
}

function matches(open: string, close: string) {
  return open === "(" && close === ")" || open === "[" && close === "]" || open === "{" && close === "}" || open === "<" && close === ">";
}

function scoreLine(line: string): number {
  const stack = [];
  for (const c of [...line]) {
    if ("([{<".includes(c)) { stack.push(c); }
    else {
      const matcher = stack.pop()!;
      if (!matches(matcher, c)) {
        if (c === ")") return 3;
        else if (c === "]") return 57;
        else if (c === "}") return 1197;
        else if (c === ">") return 25137;
        else { throw new Error(c); }
      }
    }
  }
  return 0;
}

function part1() {
  const lines = readFile();
  let ct = 0;
  for (const l of lines) ct += scoreLine(l);
  return ct;



}
console.log(part1());

function part2() {
  const lines = readFile();
}
console.log(part2());