import run from 'aocrunner';

interface set {
    red: number;
    green: number;
    blue: number;
}

interface game {
    id: number;
    sets: set[];
}

const [redLimit, greenLimit, blueLimit] = [12, 13, 14];

function sumPossibleGames(games: game[]): number {
    return games.reduce((acc, game) => {
        const { possible } = isGamePossible(game);
        return possible ? acc + game.id : acc;
    }, 0);
}

function sumMiniumSetsPower(games: game[]): number {
  return games.reduce((acc, game) => {
      const minimumSet = getMinimumSet(game.sets);
      return acc + getSetPower(minimumSet);
  }, 0);
}

function getSetPower(set: set): number {
  return set.red * set.green * set.blue;
}

function getMinimumSet(sets: set[]): set {
  const min = { red: 0, green: 0, blue: 0 };
  for (const set of sets) {
      for (const color in set) {
          if (set[color as keyof set] > min[color as keyof set]) {
              min[color as keyof set] = set[color as keyof set];
          }
      }
  }

  return min;
}

function isGamePossible(game: game): { possible: boolean; sets: set[] } {
    const sets = game.sets;
    const possible = sets.every((set) =>
        isSetPossible(set.red, set.green, set.blue)
    );
    return { possible, sets };
}

function isSetPossible(red: number, green: number, blue: number): boolean {
    return red <= redLimit && green <= greenLimit && blue <= blueLimit;
}

function getGames(input: string[]) {
  const games: game[] = [];

    for (let line of input) {
        const [meta, data] = line.split(': ');

        const idSetRegex: RegExp = /Game (\d+)/;
        const id: number = parseInt(idSetRegex.exec(meta)![1]);

        const game: game = { id: id, sets: [] };

        game.sets = data.split('; ').map((set) => {
            const output: set = { red: 0, green: 0, blue: 0 };
            set.split(', ').forEach((countColor) => {
                const [count, color] = countColor.split(' ');
                output[color as keyof set] = parseInt(count);
            });

            return output;
        });

        games.push(game);
    }
    return games;
}

const parseInput = (rawInput: string) => {
    return rawInput.split('\n');
};

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const games = getGames(input)
    return sumPossibleGames(games);
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const games = getGames(input);
    return sumMiniumSetsPower(games);
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
