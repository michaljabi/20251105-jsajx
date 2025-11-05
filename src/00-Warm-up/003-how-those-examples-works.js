import { assertThat } from "../j4b1-assert.js";

const x = 10;

// możesz wyświetlić wartość za pomocą: console.log
console.log(x + 100);

// Możesz również zrobić to w kodzie, za pomocą: //= (jeśli używasz JavaScript REPL)
x + 200; //=

// Pod przykładem będą testy, które same z siebie sprawdzają poprawność:

assertThat("x should be 10", (expect) => expect(x).toBe(10)); //=

assertThat("x + 300 should equal 310", (expect) => expect(x + 300).toBe(310)); //=
// Testy muszą mieć na końcu //= żeby pokazać wynik !!!
// Będą to miały z automatu, jeśli nic nie ruszysz.

// Testy pokażą wynik negatywny, jeśli coś jest nie tak.
// Zauważ, że jest napisane - co jest nie tak. !

// Spróbuj naprawić poniższe 3 testy, żeby pokazywały "✅ PASS",
// Jednak NIE MOŻESZ RUSZAĆ kodu samego testu. Nie wolno Ci go zmieniać:

// #Reguła:
// Nie możesz zmieniać kodu poniżej:
assertThat("myValue should equal 680",
  (expect) => expect(myValue).toBe(680)
); //=

assertThat("myValue + 20 should equal 700", (expect) =>
  expect(myValue + 20).toBe(700)
); //=

// JavaScript Repl wyświetli nam z lewej strony odpowiednie znaczki, jeśli kod:
// został wykonany: zielony
// nie został wykonany: szary
// generuje błąd: czerwony
function helloWorld() {
  const iAmNotUsed = ":(";
}

// ❌ FAIL 😭 - nie wyświetli po lewej stronie nic czerwonego,
// ponieważ błąd nastąpił w środku funkcji assertThat.
// Zauważ, że to nam nie przeszkadza, ponieważ dokładnie widzimy, jaki jest błąd
// np.: ❌ FAIL 😭 myValue is not defined
// oznacza błąd interpretera: myValue is not defined
