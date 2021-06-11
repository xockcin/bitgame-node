const TOKENS = ["+", "<", "~", ">", "-"];
const SIZE = 16;

const _ = require("lodash");

const doToken = (number, token) => {
  switch (token) {
    case "<":
      return (number * 2) % SIZE;
    case ">":
      return Math.floor(number / 2);
    case "~":
      return SIZE - 1 - number;
    case "+":
      return number === SIZE - 1 ? 0 : number + 1;
    case "-":
      return number === 0 ? SIZE - 1 : number - 1;
    case "!":
      return 255;
    case " ":
      return 0;
    default:
      console.log("default")
  }
};

//initialize solutions grid
let solutionsGrid = [...Array(SIZE)].map((e) => Array(SIZE));
for (let i = 0; i < SIZE; i++) {
  for (let j = 0; j < SIZE; j++) {
    solutionsGrid[i][j] = {
      origin: i,
      result: j,
      solution: "none",
    };
  }
}

// in pairs where the origin and goal are the
// same number, set the solution to an empty string
const zeroSteps = () => {
  for (let i = 0; i < SIZE; i++) {
    solutionsGrid[i][i].solution = "";
  }
};

// do all one-step solutions
const oneSteps = () => {
  for (let i = 0; i < SIZE; i++) {
    for (token of TOKENS) {
      const result = doToken(i, token);
      if (solutionsGrid[i][result].solution === "none") {
        solutionsGrid[i][result].solution = token;
      }
    }
  }
};

// does a new "step" every time you run it.
// so the first time it does all the two-step
// solutions, the second time it does all the
// three-step solutions, and so on, building on
// the already-existing solutions.
const addSteps = () => {
  // flat array containing all solved pairs
  const solvedPairs = _.flatten(solutionsGrid).filter(
    (item) => item.solution != "none"
  );
  for (pair of solvedPairs) {
    // build each new solution atop an existing one
    const { origin, result, solution } = pair;
    for (token of TOKENS) {
      const newResult = doToken(result, token);
      if (solutionsGrid[origin][newResult].solution === "none") {
        solutionsGrid[origin][newResult].solution = solution + token;
      }
    }
  }
};

// starts by doing zersteps and onesteps, then
// does addsteps over and over until there are
// no more unsolved, and returns the number of
// steps.
const getAllSolutions = () => {
  zeroSteps();
  oneSteps();
  let steps = 2;
  //i.e. while there are still any unsolved pairs
  while (
    _.flatten(solutionsGrid).filter((item) => item.solution === "none").length >
    0
  ) {
    addSteps();
    steps++;
  }
  return steps;
};

// run getallsolutions and save number of steps
const maxLengthPlusOne = getAllSolutions();

const getStats = (pairs) => {
  const stats = {};
  for (let i = 0; i < maxLengthPlusOne; i++) {
    stats[i.toString()] = 0;
  }
  for (item of pairs) {
    const stepCount = item.solution.length.toString();
    stats[stepCount]++;
  }
  return stats;
};

const pairsBySize = (pairs) => {
  const stats = {};
  for (let i = 0; i < maxLengthPlusOne; i++) {
    stats[i.toString()] = [];
  }
  for (item of pairs) {
    const stepCount = item.solution.length;
    stats[stepCount].push(item);
  }
  return stats;
};

const allPairs = _.flatten(solutionsGrid);
const myStats = getStats(allPairs);
const bySize = pairsBySize(allPairs);

// create steps array
const getSteps = (pair) => {
  const steps = [];
  const { origin, solution } = pair;
  let number = origin;
  for (token of solution) {
    number = doToken(number, token);
    steps.push(number);
  }
  return steps;
};

// add steps array to all pairs
for (pair of allPairs) {
  let steps = getSteps(pair);
  console.log(pair);
  console.log(steps);
  console.log("\n");
}

/************* Register *************/

const regTokens = ["&", "|", "^"];

doRegToken = (number, register, token) => {
  switch (token) {
    case "&":
      return number & register;
    case "|":
      return number | register;
    case "^":
      return number ^ register;
  }
};

const createRegGrid = (size) => {
  let grid = [...Array(size)].map((e) => Array(size));

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      grid[i][j] = {
        regOne: i,
        regTwo: j,
        results: {
          and: doRegToken(i, j, "&"),
          or: doRegToken(i, j, "|"),
          xor: doRegToken(i, j, "^"),
        },
      };
    }
  }
  return grid;
};

const regGrid = createRegGrid(SIZE)

const allReg = _.flatten(regGrid)

console.log(allReg)