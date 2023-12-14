import run from "aocrunner";

  let checking = 1;
  const digitLibrary: { [key: string]: string } = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  };

  function findDigits(str: string): string[] {
    let regex: RegExp;
    if (checking == 2) {
      const digitStrings = [...Object.keys(digitLibrary), '\\d'];
      regex = new RegExp(digitStrings.join('|'), 'gi');
    } else {
      regex = /\d/gi;
    }

    const matches = str.match(regex);

    if (matches === null) {
      throw new Error('No digits found');
    }

    const results = [matches[0], matches[matches.length - 1]].map((match) => {
      if (Object.prototype.hasOwnProperty.call(digitLibrary, match)) {
        return digitLibrary[match];
      }
      return match;
    });

    return results;
  }

  function calibration(line: string): string {
    const results = findDigits(line).join('');
    return results;
  }

  function sum(input: string[]) {
    let sum = 0;
    for (let line of input) {
      sum += parseInt(calibration(line))
    }
    console.log(sum);
    return sum;
  }

const parseInput = (rawInput: string) => {
  return rawInput.split('\n');
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return sum(input);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  checking = 2;
  return sum(input);
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
