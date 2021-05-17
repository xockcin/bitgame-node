const _ = require('lodash')

const SIZE = 16
const TOKENS = ["+", "<", "~", ">", "-"];

const doToken = (number, token) => {
  switch (token) {
    case "<":
      return (number * 2) % 256;
    case ">":
      return Math.floor(number / 2);
    case "~":
      return 255 - number ;
    case "+":
      return number === 255 ? 0 : number + 1 ;
    case "-":
      return number === 0 ? 255 : number - 1 ;
  }
}

let grid = [...Array(SIZE)].map((e) => Array(SIZE));

class Pair {
  constructor(origin, goal) {
    this.origin = origin;
    this.goal = goal;
    this.solution = "none";
  }
}

for (let i = 0; i < SIZE; i++) {
  for (let j = 0; j < SIZE; j++) {
    grid[i][j] = new Pair(i, j);
  }
}

class Number {
  constructor(number) {
    this.number = number;
  }
  doTokenSet(tokens) {
    return tokens.map((token) => doToken(this.number, token));
  }
}

const getSolutions = (size,tokens) => {

  let grid = [...Array(size)].map((e) => Array(size))

  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      grid[i][j] = new Pair(i, j);
    }
  }

  for (let i = 0; i < SIZE; i++) {
    for (token of tokens) {
      const newNumber = doToken(i, token)
      //console.log(`origin: ${i}\nresult: ${newNumber}\ntoken: ${token}\n`)
    }
  }
  return grid
}

const newGrid = getSolutions(SIZE,TOKENS)
console.log(newGrid)