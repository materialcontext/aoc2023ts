import run from 'aocrunner';

const testString = `
  0 3 6 9 12 15
  1 3 6 10 15 21
  10 13 16 21 30 45
`;

function getArrayofDifferences(input: number[]) {
    // get the difference between each number in the array
    let output = [];
    for (let i = 0; i < input.length - 1; i++) {
        output.push(input[i + 1] - input[i]);
    }
    return output;
}

function solve(arr: number[], lastVals: number[] = []) {
    // after getting the differences build a list of the final values and then sum them
    let newArr = getArrayofDifferences(arr);
    lastVals.push(arr[arr.length - 1]);
    if (newArr.every((num) => num === 0)) {
        return lastVals.reduce((acc, curr) => {
            return acc + curr;
        }, 0);
    }
    return solve(newArr, lastVals);
}

function solve2(arr: number[], firstVals: number[] = []) {
    // after getting the differences build a lsit of the first values
    // then accumulate the sum of differences between the first value and the new previous value
    let newArr = getArrayofDifferences(arr);
    firstVals.push(arr[0]);
    if (newArr.every((num) => num === 0)) {
        return firstVals.reverse().reduce((acc, curr) => {
            return curr - acc;
        }, 0);
    }
    return solve2(newArr, firstVals);
}

const parseInput = (rawInput: string) => {
    /// split the input into arrays of numbers
    return rawInput
        .split('\n')
        .map((line) => line.split(' ').map((num) => parseInt(num)));
};

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const output = input.reduce((acc, curr) => {
        return acc + solve(curr, []);
    }, 0);
    return output;
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const output = input.reduce((acc, curr) => {
        return acc + solve2(curr, []);
    }, 0);
    return output;
};

run({
    part1: {
        tests: [
            {
                input: testString,
                expected: 114,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: testString,
                expected: 2,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
