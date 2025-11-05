import { assertThat } from "../../j4b1-assert.js";
/**
 * a10-the-need-of-modularity
 * Warm up
 *
 * Lata świetlne przed ES6 (2015)....
 *
 * Wszystko takie wymieszane w tych skołpach dżawaskripta...
 *
 * * Reguły:
 * - można dopisywać nowy kod.
 * - istniejący kod powinien działać tak jak do tej pory (console.logi etc.)
 * - nie można w nowym kodzie użyć odniesienia ani przypisania do zmiennej `myValue`
 * - nie można zmieniać istniejącego kodu.
 */

var myValue = 2000;
console.log("Current value is", myValue);



const o = 1
run();

// Function declaration (deklaracja funkcji)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function#difference_between_function_constructor_and_function_declaration
function run() {
  var myValue = 3000
  console.log("Current value is", o, myValue);
}

// Function expression (wyrażenie funkcyjne - ANONIMOWE - może być ARROW)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
const myRun = () => {
  var myValue = 3000;
  console.log("Current value is", myValue);
};
myRun()

// IIFE - 1 sposób na uzyskanie modułowości w JS.
// https://developer.mozilla.org/en-US/docs/Glossary/IIFE
;(() => {
  var myValue = 3000;
  console.log("Current value is", myValue);
})();

// console.log(myValue);

// #Reguła:
// Nie możesz zmieniać kodu poniżej:
assertThat("myValue suppose to be 2000", (expect) =>
  expect(myValue).toBe(2000)
); //=
