import fs from "fs";

function parseInput() {
  return fs
    .readFileSync("src/day.3.input.txt")
    .toString()
    .split("\n")
    .filter((x) => x)
    .map((x) => x);
}

export function part1() {
  const input = parseInput();
  const partNumbers: number[] = [];
  const regex = /[^\d\.]/;

  for (let i = 0; i < input.length; i++) {
    const matches = [...input[i].matchAll(/\d+/g)];
    if (matches.length === 0) continue;

    for (let match of matches) {
      const start = match.index! === 0 ? 0 : match.index! - 1;
      const lastIndex = match.index! + match[0].length;
      const end = lastIndex === input[i].length ? lastIndex : lastIndex + 1;

      if (
        (i > 0 && regex.test(input[i - 1].substring(start, end))) ||
        regex.test(input[i].substring(start, end)) ||
        (i < input.length - 1 && regex.test(input[i + 1].substring(start, end)))
      ) {
        partNumbers.push(Number(match[0]));
      }
    }
  }

  return partNumbers.reduce((total, partNumber) => total + partNumber, 0);
}

export function part2() {
  const input = parseInput();
  const gearNumbers: { [key: string]: number[] } = {};
  const regex = /\*/;

  for (let i = 0; i < input.length; i++) {
    const matches = [...input[i].matchAll(/\d+/g)];
    if (matches.length === 0) continue;

    for (let match of matches) {
      const start = match.index! === 0 ? 0 : match.index! - 1;
      const lastIndex = match.index! + match[0].length;
      const end = lastIndex === input[i].length ? lastIndex : lastIndex + 1;

      if (i > 0 && regex.test(input[i - 1].substring(start, end))) {
        const key = `${i - 1}.${
          start + input[i - 1].substring(start, end).indexOf("*")
        }`;
        gearNumbers[key] = [...(gearNumbers[key] || []), Number(match[0])];
      }

      if (regex.test(input[i].substring(start, end))) {
        const key = `${i}.${
          start + input[i].substring(start, end).indexOf("*")
        }`;
        gearNumbers[key] = [...(gearNumbers[key] || []), Number(match[0])];
      }

      if (
        i < input.length - 1 &&
        regex.test(input[i + 1].substring(start, end))
      ) {
        const key = `${i + 1}.${
          start + input[i + 1].substring(start, end).indexOf("*")
        }`;
        gearNumbers[key] = [...(gearNumbers[key] || []), Number(match[0])];
      }
    }
  }

  return Object.values(gearNumbers).reduce(
    (total, partNumbers) =>
      partNumbers.length !== 2
        ? total
        : total + partNumbers[0] * partNumbers[1],
    0,
  );
}
