import { readLines } from './util';

const FILENAME = "10.txt";

function readFile() {
  return readLines(FILENAME);
}

function matches(open: string, close: string) {
  return open === "(" && close === ")" || open === "[" && close === "]" || open === "{" && close === "}" || open === "<" && close === ">";
}

function scoreStack(stack: string[]): number {
  let score = 0;
  while (stack.length > 0) {
    const c = stack.pop();
    score *= 5;
    if (c === "(") score += 1;
    else if (c === "[") score += 2;
    else if (c === "{") score += 3;
    else if (c === "<") score += 4;
  }
  return score;
}

function scoreLine(line: string): number {
  const stack = [];
  for (const c of [...line]) {
    if ("([{<".includes(c)) { stack.push(c); }
    else {
      const matcher = stack.pop()!;
      if (!matches(matcher, c)) {
        return 0;
      }
    }
  }
  return scoreStack(stack);
}

function part1() {
  const lines = readFile();


}
console.log(part1());

function part2() {
  const lines = readFile();
  let scores = [];
  for (const l of lines) {
    const score = scoreLine(l);
    if (score > 0) scores.push(score);
  }
  // sort
  scores.sort((a, b) => a - b);
  console.log(scores);
  console.log(scores.length, scores.length / 2);
  return scores[scores.length / 2 - 0.5];
}
console.log(part2());