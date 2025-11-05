import { addNumbers, averageFrom } from "./main/helpers/my-things.js";
import { firstLetterToUpper as capitalize } from "./main/tools/tool-1.js";
import { countWords } from "./main/tools/tool-2.js";
import someUtil, { toSecondPower } from "./main/utils/some-util.js";

//const lastLetter = someUtil.lastLetter;
//const numberOfChars = someUtil.numberOfChars;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring
const { lastLetter, numberOfChars } = someUtil;

export const stringHelper = {
  lastLetter,
  numberOfChars,
  countWords,
  capitalize,
};

export const numberHelper = {
  toSecondPower,
  addNumbers,
  averageFrom,
};

// Destrukturyzacja - przypadki użycia


/*
// Pseudokod react

function useState(initial) {
  function changeState(newState) {
    initial = newState;
  }

  return [initial, changeState];
}

const [no, update] = useState(2);

console.log(no);
update(20)
console.log(no)
*/

function toSecondPowerDesc(n) {
  return [n, n ** 2];
}

const [x, xToSecond] = toSecondPowerDesc(3)

console.log(x)
console.log(xToSecond)

console.log(toSecondPowerDesc(3))


const myDate = '11/01/2025'

const [m, d, y] = myDate.split('/');// .map(Number) | .map((x) => Number(x));

console.log(m);
console.log(d);
console.log(y);