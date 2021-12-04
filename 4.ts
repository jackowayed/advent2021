import { readLines } from './util';

const FILENAME = "4.txt";

const ZERO_TO_FOUR = [...Array(5).keys()];

function readFile() {
  return readLines(FILENAME);
}

function parseLine(line) {
  const match = /(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/.exec(line)!;
  const nums = [];
  for (let i = 1; i < 6; i++) {
    nums.push(parseInt(match[i]));
  }
  return nums;
}

function parseBoard(lines, start) {
  return [...Array(5).keys()].map(i => parseLine(lines[i + start]));
}

function parseBoards(lines): number[][] {
  const boards = [];
  for (let i = 2; i < lines.length; i += 6) {
    boards.push(parseBoard(lines, i));
  }
  return boards;
}

function allCalled(run: number[], numSeq: number[], idx: number) {
  return run.every(n => numSeq.findIndex(x => x === n) !== -1 && numSeq.findIndex(x => x === n) <= idx);
}

function genHorizontals(board) {
  const runs = [];
  for (let i = 0; i < 5; i++) {
    runs.push(board[i]);
  }
  return runs;
}

function genVerts(board) {
  const runs = [];
  for (let i = 0; i < 5; i++) {
    runs.push(ZERO_TO_FOUR.map(y => board[y][i]));
  }
  return runs;
}

function genDiags(board) {
  const runs = [];
  runs.push(ZERO_TO_FOUR.map(i => board[i][i]));
  runs.push(ZERO_TO_FOUR.map(i => board[i][4 - i]));
  return runs;
}
function genRuns(board) {
  let runs = genHorizontals(board);
  runs = runs.concat(genVerts(board));
  //runs = runs.concat(genDiags(board));
  return runs;
}

function hasWon(board, numSeq, idx): boolean {
  return !genRuns(board).every(r => !allCalled(r, numSeq, idx));
}

function sumUnmarked(board: number[][], numSeq: number[], idx) {
  let sum = 0;
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      const callIdx = numSeq.indexOf(board[y][x]);
      if (!(callIdx > -1 && callIdx <= idx)) {
        sum += board[y][x];
      }
    }
  }
  return sum;
}

function test(boards, seq, lines) {
  //console.log(genRuns(boards[2]));
  console.log(lines[0]);
  console.log(lines[0].split(",").map(s => parseInt(s)));
  //console.log(seq);
  //console.log(seq.indexOf(24));
}

function part1() {
  console.log(parseInt(" 2"));
  const lines = readFile();

  const seq = lines[0].split(",").map(s => parseInt(s));
  const boards = parseBoards(lines);
  //test(boards, seq, lines);
  for (let idx = 0; idx < seq.length; idx++) {
    const winner = boards.find(b => hasWon(b, seq, idx));
    if (winner) {
      console.log(winner);
      const sum = sumUnmarked(winner, seq, idx);
      const lastCalled = seq[idx];
      console.log(sum, lastCalled);
      return sum * lastCalled;
    }
  }



  const lines2 = readFile();
}
console.log(part1());

function part2() {
  const lines = readFile();
}
console.log(part2());