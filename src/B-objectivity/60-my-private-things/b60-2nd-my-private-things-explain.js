/**
 * b60-my-private-things
 * Explain
 *
 * #Cel:
 * Poznanie różnych sposobów na osiągnięcie prywatności danych.
 * Nie jest to zagadnienie oczywiste w świecie JavaScript, ponieważ w definicjach klas, jak i w prototypach
 * nie istnieje* na ten moment rozwiązanie czy modyfikator "private" umożliwiający:
 * zmianę wartości pola instancji tylko w jej wnętrzu
 *
 * * (aktualnie propozycja - stage 2)
 */

// Przejdziemy przez różne rodzaje i sposoby symulowania tego, że dana wartość — powinna być, lub jest prywatna

// 1) Science fiction / conventions:
const person = {
  _name: "Maurice",
};

console.log(person);
person._name = "Roy";

// Nie takie prywatne jednak:
console.log(person);

// 2) Using closure with factory function
function laptopFactory(producer, model, ramAmount) {
  let extendableRam = ramAmount;
  return {
    producer,
    model,
    // Tutaj moglibyśmy zastosować getter:
    memory() {
      return extendableRam + " GB";
    },
    extendMemory(extendBy) {
      extendableRam += extendBy;
    },
  };
}

const myLaptop = laptopFactory("Dell", "Precision 5530", 4);

console.log(myLaptop);
console.log(myLaptop.memory());

myLaptop.extendMemory(4);
myLaptop.extendMemory(4);

console.log(myLaptop.memory());

// 3) using closure in constructor function
function MyPerson(name, salary) {
  let _salary = salary;
  this.name = name;
  this.changeSalary = function (riseAmount = 0) {
    _salary += riseAmount;
  };
  this.getSalary = function () {
    return _salary;
  };
}

const myWorker = new MyPerson("Jen", 6000);
myWorker.getSalary(); //=
myWorker.changeSalary(2500);
myWorker.getSalary(); //=

// W roku 2022 wydany jest nowy sposób zapisu pól prywatnych,
// Jednak żeby działało to wstecznie kompatybilne — zaproponowano "dość dziwny" syntax:
// 4) hot news
class Person {
  name = "John";

  // Pole prywatne w środku klasy:
  #salary = 3000;

  makeARise() {
    this.#salary += 1000;
  }

  showMySalary() {
    return this.#salary;
  }
}

const mrJohn = new Person();
console.log(mrJohn);
console.log(mrJohn.showMySalary());
mrJohn.makeARise();
console.log(mrJohn.showMySalary());
// pole prywatne nie jest wioczne:
console.log(mrJohn);
// pole prywatne nie jest dostępne:
// console.log(mrJohn.#salary);
