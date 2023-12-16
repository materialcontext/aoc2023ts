import run from 'aocrunner';

let check = "one";
const testString = `
    RL

    AAA = (BBB, CCC)
    BBB = (DDD, EEE)
    CCC = (ZZZ, GGG)
    DDD = (DDD, DDD)
    EEE = (EEE, EEE)
    GGG = (GGG, GGG)
    ZZZ = (ZZZ, ZZZ)
`;
type tree = {
    [key: string]: node;
};

type node = {
    node: string;
    left: string;
    right: string;
};

function climbTree(moves: string[], tree: tree, currentNode = tree['AAA']) {
    let steps = 0;
    while (moves.length) {
        const move = moves.shift()!;
        moves.push(move);
        if (move === 'L') {
            currentNode = tree[currentNode.left];
        } else {
            currentNode = tree[currentNode.right];
        }
        steps++;
        if (currentNode.node.endsWith('Z') && check == "two") break;
        if (currentNode.node === 'ZZZ') break;
    }
    return steps;
}

function lcm(arr: number[]): number {
  return arr.reduce((acc, n) => (acc * n) / gcd(acc, n));
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function parseInput(rawInput: string) {
    const regex = /(\w+) = \((\w+), (\w+)\)/g;
    let moves = rawInput.match(/([LR]+)\n/)![1].split('');
    let matches = rawInput.matchAll(regex);
    const tree: tree = {};
    const aStarts: node[] = [];

    for (const match of matches) {
        const [_, node, left, right] = match;
        tree[node] = { node, left, right };
        if (node.endsWith('A')) {
            aStarts.push(tree[node]);
        }
    }

    return { moves, tree, aStarts };
}

const part1 = (rawInput: string) => {
    const { moves, tree } = parseInput(rawInput);
    return climbTree(moves, tree);
};

const part2 = (rawInput: string) => {
    check = "two";
    const { moves, tree, aStarts } = parseInput(rawInput);
    const branches = [...aStarts];
    let steps: number[] = [];
    branches.forEach((branch) => {
       steps.push(climbTree(moves, tree, branch));
    });
    return lcm(steps);
};

run({
    part1: {
        tests: [
            {
                input: testString,
                expected: 2,
            },
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
