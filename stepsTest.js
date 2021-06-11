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
      steps: []
    };
  }
}

// in pairs where the origin and goal are the 
// same number, set the solution to an empty string
const zeroSteps = () => {
  for (let i = 0; i < SIZE; i++) {
    solutionsGrid[i][i].solution = ""
  }
}

const oneSteps = () => {
  for (let i = 0; i < SIZE; i++) {
    for (token of TOKENS) {
      const result = doToken(i, token);
      if (solutionsGrid[i][result].solution === "none") {
        solutionsGrid[i][result].solution = token;
        solutionsGrid[i][result].steps.push({token: token, number: result})
      }
    }
  }
};

// does a new "step" every time you run it.
// so the first time it does all the two-step
// solutions, the second time it does all the
// three-step solutions, and so on.
const addSteps = () => {
  // flat array containing all solved pairs
  const solvedPairs = _.flatten(solutionsGrid).filter((item) => item.solution != "none")
  for (pair of solvedPairs) {
    // build each new solution atop an existing one
    const {origin, result, solution} = pair
    for (token of TOKENS) {
      const newResult = doToken(result, token)
      if (solutionsGrid[origin][newResult].solution === "none") {
        solutionsGrid[origin][newResult].solution = solution + token
        solutionsGrid[origin][newResult].steps.push({ token: token, number: newResult });
      }
    }
  }
}

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

const maxLengthPlusOne = getAllSolutions();

const allPairs = _.flatten(solutionsGrid);

for (pair of allPairs) {
  console.log(pair)
}