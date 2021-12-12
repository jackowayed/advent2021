import { readLines } from './util';

const FILENAME = "12.txt";

type Cave = {
  edges: Cave[];
  name: string;
  isBig: boolean;
};

type CaveIndex = { [index: string]: Cave; };

function getCave(caves: CaveIndex, name: string): Cave {
  if (name in caves) return caves[name];
  const cave = {
    edges: [],
    name: name,
    isBig: name === name.toUpperCase(),
  };
  caves[name] = cave;
  return cave;
}

function readFile(): Cave {
  const lines = readLines(FILENAME);
  const caves: CaveIndex = {};
  for (const l of lines) {
    const split = l.split("-");
    if (split.length !== 2) throw new Error();
    const left = getCave(caves, split[0]);
    const right = getCave(caves, split[1]);
    left.edges.push(right);
    right.edges.push(left);
  }
  return caves["start"];
}



function part1() {
  const startCave = readFile();
  const activePaths = [[startCave]];
  const endingPaths = [];
  while (activePaths.length > 0) {
    const path = activePaths.shift()!;
    for (const cave of path[path.length - 1].edges) {
      const newPath = path.concat(cave);
      if (cave.name === "end") {
        endingPaths.push(newPath);
      } else if (cave.isBig || path.indexOf(cave) === -1) {
        activePaths.push(newPath);
      }
    }
  }
  return endingPaths.length;
}
console.log(part1());

function part2() {
  const lines = readFile();
}
console.log(part2());