import run from 'aocrunner';
import { zip } from '../utils/arrays.js';

function solveQuadratic(t: number, d: number) {
    const root = Math.sqrt(t * t - 4 * d);
    let a = (t - root) / 2;
    let b = (t + root) / 2;

    // the solution needs to be discrete and not include the bounds
    Number.isInteger(a) ? a++ : (a = Math.ceil(a));
    Number.isInteger(b) ? b-- : (b = Math.floor(b));
    return [a, b];
}

const parseInputOne = (rawInput: string) => {
    const input = rawInput.split('\n');
    const regex = /\d+/g;
    const [t, d]: any[] = input.map((line) => line.match(regex));
    
    return zip(t, d);
};

const parseInputTwo = (rawInput: string): string[] => {
  const input = rawInput.split('\n');
  const regex = /\d+/g;
  return input.map((line) => line.match(regex)!.join(''));
};

const part1 = (rawInput: string) => {
    const data = parseInputOne(rawInput);
    let winsProd = 1;
    data.forEach((pair) => {
      const t = parseInt(pair[0]);
      const d = parseInt(pair[1]);
      const [a, b] = solveQuadratic(t, d)
      winsProd *= b - a + 1
      console.log(winsProd);
    })
    return winsProd;
};

const part2 = (rawInput: string) => {
    const pair = parseInputTwo(rawInput);

    const t = parseInt(pair[0]);
    const d = parseInt(pair[1]);
    const [a, b] = solveQuadratic(t, d)

    return b - a + 1;
};

run({
    part1: {
        tests: [
            // {
            //   input: ``,
            //   expected: "",
            // },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            // {
            //   input: ``,
            //   expected: "",
            // },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
