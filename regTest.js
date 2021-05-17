const TOKENS = ["+", "<", "~", ">", "-"];
const SIZE = 256;

const _ = require("lodash");

let grid = [...Array(SIZE)].map((e) => Array(SIZE));

for (let i = 0; i < SIZE; i++) {
  for (let j = 0; j < SIZE; j++) {
    grid[i][j] = {
      origin: i,
      result: j,
      solution: "none",
    };
  }
}

class Byte {
  constructor(number) {
    this.number = number;
    this.register = 0;
  }
  doToken(token) {
    switch (token) {
      case "<":
        this.number = (this.number * 2) % SIZE;
        break;
      case ">":
        this.number = Math.floor(this.number / 2);
        break;
      case "~":
        this.number = SIZE - 1 - this.number;
        break;
      case "+":
        this.number = this.number === SIZE - 1 ? 0 : this.number + 1;
        break;
      case "-":
        this.number = this.number === 0 ? SIZE - 1 : this.number - 1;
        break;
      case "!":
        this.number = SIZE - 1;
        break;
      case " ":
        this.number = 0;
        break;
      case "=":
        this.register = this.number;
        break;
      case "&":
        this.number = this.number & this.register;
        break;
      case "|":
        this.number = this.number | this.register;
        break;
      case "^":
        this.number = this.number ^ this.register;
        break;
    }
  }
}

const oneSteps = () => {
  for (let i = 0; i < SIZE; i++) {
    for (token of TOKENS) {
      
    }
  }
};

const myNumber = new Byte(5);
console.log(myNumber);
myNumber.doToken("<");
console.log(myNumber);
myNumber.doToken("+");
console.log(myNumber);
myNumber.doToken("=");
console.log(myNumber);
myNumber.doToken(">");
console.log(myNumber);
myNumber.doToken("&");
console.log(myNumber);
