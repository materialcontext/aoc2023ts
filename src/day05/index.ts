import run from 'aocrunner';
import { almanac, range, map } from '../utils/types.js';

const parseInput = (rawInput: string) => {
    const regex = /:\s+((?:\d+\s*)+)/gm;
    const matches = [...rawInput.matchAll(regex)];
 
    // output data structure
    const almanac: almanac = {
        seeds: [],
        seedRanges: [],
        data: [],
    };

    matches.forEach((match, idx) => {
        let { seeds, seedRanges } = almanac;

        if (idx === 0) {
            // get seeds for part 1 and seed ranges for part 2
            match[1]
                .split(' ')
                .map((x) => parseInt(x))
                .forEach((seed) => seeds.push(seed));

            for (let i = 0; i < seeds.length; i += 2) {
                seedRanges.push([seeds[i], seeds[i] + seeds[i + 1] - 1]);
            }
        } else {
            // process the map data
            let matches = match[1]
                .trim()
                .split('\n')
                .map((x) => x.split(' ').map((y) => parseInt(y)));

            matches.sort((a, b) => a[1] - b[1]);

            // fill gaps
            let fills = [];

            for (let i = 0; i < matches.length - 1; i++) {
                const end = matches[i][1] + matches[i][2];
                const next = matches[i + 1][1];
                if (end !== next) {
                    fills.push([next, next, next - end]);
                }
            }

            matches = matches.concat(fills);

            // convert the data to [start, end, offset] and add it to the almanac
            almanac.data.push(mapData(matches as map[]));
        }
    });
    return almanac;
};

/* converts initial data to [start, end, offset] */
const mapData = (map: [...range, number][]): map[] => {
    const newRanges: map[] = [];
    map.forEach(([dest, src, range]) => {
        const [start, end, offset] = [src, src + range - 1, dest - src];
        newRanges.push([start, end, offset]);
    });
    return newRanges;
};

/* moves a number from one data mapping to the next */
const transform = (n: number, start: number, end: number, offset: number) => {
    return start <= n && n <= end ? n + offset : n;
};

/* moves an entire data range from one mapping to the next */
const transformRange = (seedRange: range, map: map[]): range[] => {
    const [low, high] = seedRange;
    for (let i = 0; i < map.length; i++) {
        const [start, end, offset] = map[i];
        let newLow = transform(low, start, end, offset);
        let newHigh = transform(high, start, end, offset);
        if (newLow !== low && newHigh !== high) {
            return [[newLow, newHigh]];
        }
        if (newLow != low) {
            const mapEnd = transform(map[i][1], start, end, offset);
            if (map[i + 1]) {
                const [nStart, nEnd, nOff] = map[i + 1];
                const nextStart = transform(nStart, nStart, nEnd, nOff);
                newHigh = transform(high, nStart, nEnd, nOff);
                return [
                    [newLow, mapEnd],
                    [nextStart, newHigh],
                ];
            }
            return [
                [newLow, mapEnd],
                [mapEnd + 1, high],
            ];
        }
        if (newHigh != high) {
            const mapStart = transform(map[i][0], start, end, offset);
            return [
                [low, mapStart - 1],
                [mapStart, newHigh],
            ];
        }
    }
    return [seedRange];
};

/* gets a location from a seed */
const getSeedLocation = (seed: number, data: map[][]) => {
    let newSeed = seed;
    for (const maps of data) {
        let applies = maps.find((map) => newSeed != transform(newSeed, ...map));
        if (applies) newSeed = transform(newSeed, ...applies);
    }
    return newSeed;
};

/* recursively gets a range of locations from a range of seeds */
const getRangeLocation = (
    ranges: range[],
    data: map[][],
    depth: number
): range[] => {
    let newRanges: range[] = [];
    for (let range of ranges) {
        const nextRange = transformRange(range, data[depth]);
        newRanges = newRanges.concat(nextRange);
    }
    if (depth === data.length - 1) return newRanges;
    return getRangeLocation(newRanges, data, depth + 1);
};

const part1 = (rawInput: string) => {
    const { seeds, data } = parseInput(rawInput);

    let locs = [];
    for (let seed of seeds.slice(0)) {
        locs.push(getSeedLocation(seed, data));
    }
    return Math.min(...locs);
};

const part2 = (rawInput: string): number => {
    const { seedRanges, data } = parseInput(rawInput);
    let locs: range[] = [];
    for (const seedRange of seedRanges) {
        locs.push(...getRangeLocation([seedRange], data, 0));
    }
    locs.sort((a, b) => a[0] - b[0]);
    return locs[0][0];
};

run({
    part1: {
        // tests: [
        //   {
        //     input: ``,
        //     expected: ``,
        //   },
        // ],
        solution: part1,
    },
    part2: {
        // tests: [
        //   {
        //     input: ``,
        //     expected: ``,
        //   },
        // ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});

