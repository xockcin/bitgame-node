//initialize a grid of 16 by 16 empty strings
const solutions = [...Array(16)].map((e) => Array(16))
for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    solutions[i][j] = ""
  }
}

const makeNumbers = (steps) => {
  let result = []
  for (let i = 0; i < 3**steps; i++) {
    result.push(i.toString(3).replace(/0/g, "<").replace(/1/g, ">").replace(/2/g, "~"))
  }
  return result
}


//takes number and token, returns
//number.
const doToken = (number,token) => {
  switch (token) {
    case "<":
      return (number * 2) % 256
    case ">":
      return Math.floor(number / 2)
    case "~":
      return 255 - number
  }
}

let tokenSets = makeNumbers(4)
console.log(tokenSets)
console.log(tokenSets[1])
console.log(tokenSets[7])
console.log(tokenSets[19])

let bySteps = [[],[],[],[]]
for (let item in tokenSets) {
  let index = item.length - 1
  bySteps[index].push(item)
}

console.log(bySteps[0])

//tokenSets.map(item => console.log(item))