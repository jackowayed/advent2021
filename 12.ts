import { readLines } from './util';
const _ = require("lodash");

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

function canVisit(cave: Cave, path: Cave[]): boolean {
  if (cave.name === "start") return false;
  if (cave.isBig || path.indexOf(cave) === -1) return true;
  const smallCaves = path.filter(c => !c.isBig);
  return _.uniqBy(smallCaves).length === smallCaves.length;
}


function part1() {
  const startCave = readFile();
  const activePaths = [[startCave]];
  let endingPaths = 0;
  while (activePaths.length > 0) {
    const path = activePaths.pop()!;
    for (const cave of path[path.length - 1].edges) {
      const newPath = path.concat(cave);
      if (cave.name === "end") {
        endingPaths++;
      } else if (canVisit(cave, path)) {
        activePaths.push(newPath);
      }
    }
  }
  return endingPaths;
}
console.log(part1());

function part2() {
  const lines = readFile();
}
console.log(part2());