import { readFileSync } from 'fs';

export function readLines(filePath: string): string[] {
  return readFileSync(filePath).toString('utf8').trim().split('\n');
}

export function readInts(filePath: string) {
  return readLines(filePath).map(s => parseInt(s));
}