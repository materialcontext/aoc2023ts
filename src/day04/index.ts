import run from "aocrunner";

function getTotalPoints(winsArr: number[]) {
  const totalPoints = winsArr.reduce((acc, cur) => {
    if (cur === 0) return acc;
    return acc + Math.pow(2, cur - 1);
  }, 0);

  return totalPoints;
}

function getTotalCards(winsArr: number[]) {
  const cardsArr: number[] = new Array(winsArr.length).fill(1);
    winsArr.forEach((win, idx) => {
      for (let h = 0; h < cardsArr[idx]; h++) {
        for (let i = 1; i <= win; i++) {
          if (idx + i >= winsArr.length) {
            break;
          }
          cardsArr[idx + i]++;
        }
      }
    });

    return cardsArr.reduce((acc, cur) => acc + cur, 0);
}

const parseInput = (rawInput: string) => {
  const input = rawInput.split('\n');
  const winsArr: number[] = [];

  for (const line of input) {
    const data = line.split(':')[1].trim();
    const [winning, yours] = data
      .split('|')
      .map((x) => x.trim().split(/\s+/))
      .map((x) => x.map((y) => parseInt(y, 10)));

      const wins = yours.reduce<number>((acc, cur) => {
        if (winning.includes(cur)) {
          acc++;
        }
        return acc;
      }, 0);
      winsArr.push(wins);
  }
  return winsArr;
};

const part1 = (rawInput: string) => {
  const wins = parseInput(rawInput);
  return getTotalPoints(wins);
};

const part2 = (rawInput: string) => {
  const wins = parseInput(rawInput);
  return getTotalCards(wins);
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
