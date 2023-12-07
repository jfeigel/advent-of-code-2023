import fs from "fs";

function parseInput() {
  return fs
    .readFileSync("src/day.2.input.txt")
    .toString()
    .split("\n")
    .filter((x) => x)
    .map((x) => x);
}

type Cubes = {
  [color: string]: number;
};

const MAX_DIE: Cubes = {
  red: 12,
  green: 13,
  blue: 14,
};

export function part1() {
  return parseInput()
    .map((line, lineNumber) =>
      parseRounds(line).every((round) => {
        for (const color in round) {
          if ((round[color] || 0) > MAX_DIE[color]) return false;
        }

        return true;
      })
        ? lineNumber + 1
        : 0,
    )
    .reduce((total, num) => total + num, 0);
}

export function part2() {
  const minValues = parseInput().map((line) =>
    parseRounds(line).reduce<Cubes>(
      (result, round) => {
        for (const color in round) {
          result[color] = Math.max(result[color], round[color] || 0);
        }

        return result;
      },
      {
        red: 0,
        green: 0,
        blue: 0,
      },
    ),
  );

  return minValues.reduce(
    (sum, round) =>
      sum + Object.values(round).reduce((power, cube) => power * cube, 1),
    0,
  );
}

const parseRounds = (line: string) =>
  line
    .split(": ")[1]
    .split("; ")
    .map((round) =>
      round.split(", ").reduce<Partial<Cubes>>((parsedRound, cube) => {
        const [num, color] = cube.split(" ");
        parsedRound[color] = Number(num);
        return parsedRound;
      }, {}),
    );
