import { assertThat } from "../../j4b1-assert.js";
/**
 * b20-what-is-this
 * Warm up
 *
 * Do dwóch obiektów "zapomniałem" dopisać jednej metody... pomożesz?
 *
 * * Reguły:
 * - Popraw kodzik tak, aby działał.
 * - Postaraj się zastosować zasadę "DRY" - Don't Repeat Yourself
 */

// jest różnica w this, z function expression - wpięte w obiekt
// vs
// arrow function expression - wpięte w obiekt

function sayYourName() {
  "use strict";
  console.log(this);
  return this.fullName;
}

const bindedThis = sayYourName.bind({ fullName: "Always Michał" });

// Arrow function jest NIEWRAŻLIWE na kontekst,
// pod `this` będzie to co jest w miejscu definiowania funkcji
const sayMyName = () => this.fullName;
/*
const sayMyName = () => { 
	return { name: 'ok' }
} ;
 */

const personJen = {
  fullName: "Jen Barber",
  profession: "IT Manager",
  /*
  // zapisy poniżej znaczą TO SAMO
  sayYourName: function () {
    return this.fullName;
  },
  // ten zapis to tzw. LUKIER składniowy (nowa froma zapisu metod po 2015)
  sayYourName() {
    return this.fullName;
  },
  */
  // w JS NIE MA tzw. "przeciążenia", metod czy konstuktorów, a w poniższym przypadku,
  // nie ma błędu, ale "ostatni wygrywa" i pole fullName będzie nadpisane wartością "John Barber"
  // fullName: "John Barber",
  // rozwiązanie nr1:
  /*sayYourName() {
	//console.log(this);
    return this.fullName;
  },*/
  sayYourName,
  sayMyName,
  bindedThis,
};

// to nie zadziała
// console.log(personJen.sayMyName());

const personRoy = {
  fullName: "Roy Trenneman",
  profession: "The IT Guy",
  /*
  sayYourName() {
	//console.log(this);
    return this.fullName;
  },
  */
  sayYourName,
  bindedThis,
};

// #Reguła:
// Nie możesz zmieniać kodu poniżej:
assertThat("Jen should be able to introduce herself", (expect) =>
  expect(personJen.sayYourName()).toBe("Jen Barber")
); //=
assertThat("Roy should be able to introduce himself", (expect) =>
  expect(personRoy.sayYourName()).toBe("Roy Trenneman")
); //=

personJen.bindedThis(); //=
personRoy.bindedThis(); //=

bindedThis() //= 