const TOKENS = ["+","<", "~", ">","-"];
const SIZE = 256

const _ = require('lodash')

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
      return 255
    case " ":
      return 0
  }
};

let grid = [...Array(SIZE)].map((e) => Array(SIZE));

for (let i = 0; i < SIZE; i++) {
  for (let j = 0; j < SIZE; j++) {
    grid[i][j] = {
      origin: i,
      result: j,
      solution: "none"
    }
  }
}

const zeroSteps = () => {
  for (let i = 0; i < SIZE; i++) {
    grid[i][i].solution = ""
  }
}

const oneSteps = () => {
  for (let i = 0; i < SIZE; i++) {
    for (token of TOKENS) {
      const result = doToken(i, token)
      if (grid[i][result].solution === "none") {
        grid[i][result].solution = token
      }
    }
  }
}

const addSteps = () => {
  const solved = _.flatten(grid).filter((item) => item.solution != "none")
  for (item of solved) {
    prevOrigin = item.origin
    prevResult = item.result
    prevSolution = item.solution
    for (token of TOKENS) {
      const newResult = doToken(prevResult, token)
      if (grid[prevOrigin][newResult].solution === "none") {
        grid[prevOrigin][newResult].solution = prevSolution + token
      }
    }
  }
}

const getAllSolutions = () => {
  zeroSteps()
  oneSteps()
  let steps = 1
  //i.e. while there are still any unsolved pairs
  while (_.flatten(grid).filter((item) => item.solution === "none").length > 0) {
    addSteps()
    steps++
  }
  return steps
}

const maxLength = getAllSolutions()

const getStats = (pairs) => {
  const stats = {}
  for (let i = 0; i <= maxLength; i++) {
    stats[i.toString()] = 0
  }
  for (item of pairs) {
    const stepCount = item.solution.length.toString()
    stats[stepCount]++
  }
  return stats
}

const myStats = getStats(solved)
console.log(myStats)