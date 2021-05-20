const TOKENS = ["&","|","^"]
const SIZE = 16

const _ = require("lodash");

let grid = [...Array(SIZE)].map((e) => Array(SIZE));

for (let i = 0; i < SIZE; i++) {
  for (let j = 0; j < SIZE; j++) {
    grid[i][j] = {
      regOne: i,
      regTwo: j,
      results: []
    }
  }
}

doRegToken = (number,register, token) => {
  switch (token) {
    case "&":
      return number & register
    case "|":
      return number | register
    case "^":
      return number ^ register
  }
}

for (let i = 0; i < SIZE; i++) {
  for (let j = 0; j < SIZE; j++) {
    for (token of TOKENS) {
      const result = doRegToken(i,j,token)
      grid[i][j].results.push([token, result])
    }
    console.log(`${i} ${j}`)
    console.log(grid[i][j].results)
  }
}
