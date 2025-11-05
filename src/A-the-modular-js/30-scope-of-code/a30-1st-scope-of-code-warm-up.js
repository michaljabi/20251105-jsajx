import { assertThat } from "../../j4b1-assert.js";
/**
 * a30-scope-of-code
 * Warm up
 *
 * * Reguły:
 * - nie możesz zmieniać istniejącego kodu
 * - dopisuj kod tylko tam gdzie wyraźnie napisane jest, że można
 */
let fullName = "";

function computeFullName() {
  const firstName = 'John';
  const lastName = `Kowalsky`;
  // Kod możesz pisać tylko w tym miejscu:

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  fullName = `${firstName} ${lastName}`
}

computeFullName();

// #Reguła:
// Nie możesz zmieniać kodu poniżej:
assertThat('Should have fullName of "John Kowalsky"', (expect) =>
  expect(fullName).toBe("John Kowalsky")
); //=


console.log(` 2 + 2 = ${ 2 + 2 }`);


// Matrix w JS (literał obiektowy):
console.log(` mój JS: ${ {} }`);
console.log(` mój JS: ${ new Object() }`);

// 
console.log(` mój JS: ${ JSON.stringify({}) }`);

console.log(`pusty Array ${ [] }`)

console.log(`inny Array ${ [1,{},3] }`)

// literał tablicowy:
// zamiast:
console.log(new Array())
// napisze:
console.log([])

// literał RegExpowy:
console.log(new RegExp("\\d"))
// napiszę:
console.log(/\d/)
// Uwaga tutaj wyjątek, new RegExp będzie stosowany ! jeśli chce sobie ze stringa zrobić wyrażenie regularne


// 
console.log({}, {} , {}, {})