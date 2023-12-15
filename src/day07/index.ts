import run from 'aocrunner';
import { countUnique } from '../utils/strings.js';

const testString = `
    32T3K 765
    T55J5 684
    KK677 28
    KTJJT 220
    QQQJA 483
`;

type hand = {
    value: string;
    power: number;
    score: number;
};

let cardRank = '23456789TJQKA';
const test = ['ABBCC', 'AAAAA', 'ABCAB', 'CBBBA', 'ABCDC', 'ABCDE'];

function determinePower(value: string, unique: number): number {
    let output: number;
    switch (unique) {
        case 1: // five of a kind
            output = 7;
            break;
        case 2: {
            output = isFourOfAKind(value) ? 6 : 5;
            console.log(value, output)
            break;
        }
        case 3: {
            output = isThreeOfAKind(value) ? 4 : 3;
            console.log(value, output)
            break;
        }
        case 4:
            output = 2;
            break;
        default:
            output = 1;
    }
    return output;
}

function isFourOfAKind(value: string): boolean {
    let runs = value.match(/(.)\1+/g);
    if (runs === null)  return false;
    if (runs.length > 1) {
        return runs[0] === runs[1] ? true : false;
    }

    if (runs[0].length === 4) return true;
    if (runs[0].length === 3) {
        if (runs[0][0] === value[4]) return true;
    }
    return false

}

function isThreeOfAKind(value: string): boolean {
    let val = value
        .split('')
        .sort((a, b) => cardRank.indexOf(a) - cardRank.indexOf(b));
    if (val[0] === val[1]) {
        return val[1] === val[2] ? true : false;
    }
    return val[2] === val[3] ? true : false;
}

function hasHigherCard(hand: hand, opp: hand): boolean | string {
    for (let i = 0; i < 5; i++) {
        const rank = cardRank.indexOf(hand.value[i]);
        const oppRank = cardRank.indexOf(opp.value[i]);
        if (rank === oppRank) continue;
        return rank > oppRank ? true : false;
    }
    return 'Draw';
}

function sortHands(a: hand, b: hand) {
    if (a.power === b.power) return hasHigherCard(a, b) ? 1 : -1;
    return a.power - b.power;
}

function calculateScore(hands: hand[]) {
    let output = 0;
    hands.forEach((hand, idx) => {
        output += hand.score * (idx + 1);
    });
    return output;
}

function processJoker(hand: hand): hand {
    let newHands = [];
    let chars = new Set(hand.value.split(''));
    for (let char of chars) {
        let newHand = hand.value.replace('J', char)
        let unique = countUnique(newHand);
        newHands.push({
            value: hand.value,
            power: determinePower(newHand, unique),
            score: hand.score
        })
    }
 // hejkkhdfsdf
}

const parseInput = (rawInput: string): hand[] => {
    const lines = rawInput.split('\n');
    const data = lines.map((line) => line.split(' '));
    const hands: hand[] = data.map(([hand, score]) => {
        const unique = countUnique(hand);
        return {
            value: hand,
            power: determinePower(hand, unique),
            score: parseInt(score),
        };
    });
    return hands;
};

const part1 = (rawInput: string) => {
    const hands = parseInput(rawInput);
    hands.sort((a, b) => sortHands(a, b));
    return calculateScore(hands);
};

const part2 = (rawInput: string) => {
    cardRank = "J23456789TQKA"
    let hands = parseInput(rawInput);
    for (let hand of hands) {
        if (hand.power !== 7 && hand.value.includes("J")) {
            hand = processJoker(hand);
        }
    }
    hands.sort((a, b)=> sortHands(a, b));
    return calculateScore(hands);
};

run({
    part1: {
        // tests: [
        //     {
        //         input: testString,
        //         expected: 6440,
        //     },
        // ],
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

