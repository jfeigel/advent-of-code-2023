import fs from "fs";

function parseInput() {
  return fs
    .readFileSync("src/day.1.input.txt")
    .toString()
    .split("\n")
    .filter((x) => x)
    .map((x) => x);
}

export function part1() {
  return parseInput()
    .map((line) => {
      const digits = line.match(/\d/g) || ["0"];
      return Number(digits[0] + digits[digits.length - 1]);
    })
    .reduce((total, digit) => total + digit, 0);
}

export function part2() {
  const digitMap = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  const parseDigit = (line: string, index: number) => {
    if (Number(line[index])) {
      return Number(line[index]);
    }

    for (const [numberValue, stringValue] of digitMap.entries()) {
      if (line.slice(index).startsWith(stringValue)) {
        return numberValue;
      }
    }

    return -1;
  };

  return parseInput()
    .map((line) => {
      let firstDigit = -1;
      let lastDigit = -1;

      for (let firstIndex = 0; firstIndex < line.length; firstIndex++) {
        firstDigit = parseDigit(line, firstIndex);
        if (firstDigit >= 0) break;
      }

      for (let lastIndex = line.length - 1; lastIndex >= 0; lastIndex--) {
        lastDigit = parseDigit(line, lastIndex);
        if (lastDigit >= 0) break;
      }

      return Number(`${firstDigit}${lastDigit}`);
    })
    .reduce((total, digit) => total + digit, 0);
}
