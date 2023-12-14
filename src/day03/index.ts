import run from 'aocrunner';

type Point = {
    x: number;
    y: number;
};

type PotentialPart = {
    isPartNumber: boolean;
    value: number;
    pointRange: Point[];
};

function getGearRatios(parts: PotentialPart[], potentialGears: Point[]) {
    const gearRatios: number[] = [];

    for (const gear of potentialGears) {
        const adjacentParts: Set<number> =
            adjacentNumbers(gear, parts) || (new Set() as Set<number>);
        if (adjacentParts.size === 2) {
            gearRatios.push(
                Array.from(adjacentParts).reduce<number>((a, b) => a * b, 1)
            );
        }
    }

    return gearRatios;
}

function getAdjacentPoints(point: Point) {
    const adjacentPoints: Point[] = [
        { x: point.x - 1, y: point.y - 1 },
        { x: point.x, y: point.y - 1 },
        { x: point.x + 1, y: point.y - 1 },
        { x: point.x - 1, y: point.y },
        { x: point.x + 1, y: point.y },
        { x: point.x - 1, y: point.y + 1 },
        { x: point.x, y: point.y + 1 },
        { x: point.x + 1, y: point.y + 1 },
    ];

    return adjacentPoints;
}

function isPartNumber(potentialPart: PotentialPart, markers: Point[]) {
    if (potentialPart.isPartNumber) return true;

    for (const point of potentialPart.pointRange) {
        if (isAdjacentToMarker(point, markers)) return true;
    }
}

function isAdjacentToMarker(point: Point, markers: Point[]) {
    const adjacentPoints = getAdjacentPoints(point);
    for (const point of adjacentPoints) {
        if (
            markers.some((marker) => marker.x === point.x && marker.y === point.y)
        ) {
            return true;
        }
    }
}

function adjacentNumbers(point: Point, parts: PotentialPart[]): Set<number> {
    const adjacentPoints = getAdjacentPoints(point);

    const adjacentParts: Set<number> = new Set();
    for (const point of adjacentPoints) {
        for (const part of parts) {
            if (
                part.pointRange.some(
                    (marker: Point) =>
                        marker.x === point.x && marker.y === point.y
                )
            ) {
                adjacentParts.add(part.value);
            }
        }
    }

    return adjacentParts;
}

const parseInput = (rawInput: string) => {
    let { x, y } = { x: 0, y: 0 };
    const potentialParts: PotentialPart[] = [];
    const partMarkers: Point[] = [];
    const potentialGears: Point[] = [];

    const input = rawInput.split('\n');
    for (let line of input) {
        y += 1;
        x = 0;

        let pointRange: Point[] = [];

        let potentialPartNumber = '';
        function submitPotentialPart() {
            if (potentialPartNumber !== '') {
                potentialParts.push({
                    isPartNumber: false,
                    value: parseInt(potentialPartNumber),
                    pointRange: pointRange,
                });
            }
            potentialPartNumber = '';
            pointRange = [];
        }

        const isMarker = /[^\d.]/;
        const isPartNumber = /\d/;

        for (const char of line) {
            x += 1;

            if (isMarker.test(char)) {
                partMarkers.push({ x, y });
                submitPotentialPart();
                if (char === '*') {
                    potentialGears.push({ x, y });
                }
            } else if (isPartNumber.test(char)) {
                potentialPartNumber += char;
                pointRange.push({ x, y });
                if (x === line.length) {
                    submitPotentialPart();
                }
            } else {
                submitPotentialPart();
            }
        }
    }

    const parts = potentialParts.filter((part) =>
        isPartNumber(part, partMarkers)
    );
    return { parts: parts, potentialGears: potentialGears };
};

const part1 = (rawInput: string) => {
    const { parts } = parseInput(rawInput);
    const output = parts.reduce((sum, part) => sum + part.value, 0);
    return output;
};

const part2 = (rawInput: string) => {
    const { parts, potentialGears } = parseInput(rawInput);
    const gearRatios = getGearRatios(parts, potentialGears);
    return gearRatios.reduce<number>((a, b) => a + b, 0);
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
