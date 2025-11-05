/**
 * d40-generators-iterators
 * Explain
 *
 * #Cel:
 * Poznanie kolekcji iterowalnych w JavaScript, zapoznanie się z API do Iteratora.
 * Poznanie specjalnych funkcji - generatorów
 */


// Zacznijmy od 1 faktu:
// Najprostszą kolekcją iterowalną w JavaScript - jest String, udowadnia to poniższy zapis:
for(const l of 'letters') {
	console.log(l);
}

// Nie mniej łatwo przedostać się przez zawartość tablicy:
for(const num of [100, 200, 300]) {
	console.log(num);
}

// Podobnie będzie w przypadku - Set, Map etc.
for(const [key, value] of new Map([['id-1', 'HOT'], ['id-2', 'COFFEE'], ['id-1', 'OVERWRITTEN']])){
	console.log(key)
	console.log(value)
}

// Iterować możemy również po tzw. Generatorach, i za chwilę dojdziemy do wyprowadzenia tego prostego faktu.

// GENERATORY:
// Funkcje które mają możliwość "zatrzymania" swojego wykonania i zwrócenia wartości.

function *generate4Numbers() {
	yield 100;
	yield 200;
	yield 300;
	yield 400;
}

// Na początek potraktujmy generator jako standardową funkcję:
generate4Numbers() //=

// Widać że zwrócona wartość to iterator, a nie - jakbyśmy się mogli spodziewać - wartość np. 100.
// Żeby wyciągnąć kolejne wartości trzeba odnieść się do API dla iteratora
// Dokładnie wyciągamy to metodą .next()

// Zobaczmy więc:
generate4Numbers().next() //=
generate4Numbers().next() //=
generate4Numbers().next() //=

// Ok, dostajemy wartość w formacie obiektu z flagą `done` oraz nasze upragnione `value`
// Jednak coś jest nie tak... dostajemy cały czas 1 wartość a nie kolejne ?!
// Dzieje się tak ponieważ każde wywołanie generate4Numbers() tworzy nowy Iterator !
// W tym układzie mamy nowy wskaźnik na iterator - a on zaczyna iterację "od początku"
// Żeby wyciągnąć numery po kolei - musimy skorzystać z tego samego wskaźnika:

const iterator = generate4Numbers();
iterator.next() //=
iterator.next() //=
iterator.next() //=
iterator.next() //=
iterator.next() //=
iterator.next() //=

// Super, teraz działa tak jak powinno. Na sam koniec - jak nie ma już wartości pod yield - dostajemy
// { value: undefined, done: true }
// co w skrócie oznacza - iterator skończył działanie, nie ma więcej wartości

// Ten prosty przykład pokazuje nam sposób działania iterator'a.
// Pozwala on przejść przez kolekcję w jednym kierunku, po kolei przez elementy
// Nie można go ani cofnąć, ani "zrestartować" i odliczać od nowa.
// żeby zrobić "odliczanie od nowa" - potrzebujemy znów wywołać generate4Numbers();

// Jednak, skoro Generator - zwraca iterator, to można go potraktować jako
// Kolekcja iterowalna !!!:
for(const num of generate4Numbers()) {
	console.log(num)
}

// Sposób odnoszenia się po przez next() do iteratora, powoduje pewną zależność
// Możemy wyciągnąć ten sam INTERFEJS przechodzenia po obiektach z dowolnej kolekcji po której da się iterować:
const myTracks = new Set(['track1', 'track2', 'track3'])

const setIterator = myTracks.values();
setIterator.next() //=
setIterator.next() //=
setIterator.next() //=
setIterator.next() //=

// To samo możemy uzyskać od dowolnej kolekcji implementującej interfejs iteratora!!!
// wystarczy że posłużymy się odpowiednim symbolem:

const myString = 'Hi! 🤩';

// Zwróć uwagę na poniższy zapis.
// W meta-programowaniu JavaScript zapis Symbol.iterator - pozwala odnieść się do metody,
// która zwróci iterator - jeśli tylko dany obiekt go posiada.
// Podobnie my sami możemy definiować tego typu kolekcje!
const stringIterator = myString[Symbol.iterator]();

stringIterator.next() //=
stringIterator.next() //=
stringIterator.next() //=
stringIterator.next() //=
stringIterator.next() //=
stringIterator.next() //=

// Wracając do generatorów:
// Po przez metodę .next() możemy się z nimi komunikować !!!
function *coffeeMachine() {
	const coffeeAmount = yield 'Podaj ilość kawy w maszynie';
	const numberOfCups = yield 'Ile kubków przyrządzić?';
	const maxCups = Math.floor(coffeeAmount / 20); // 20g for a cup
	const coffeeMade = Math.min(maxCups, numberOfCups);
	if(coffeeMade < 1) {
		return 'Hmmm.... dzisiaj dzień bez kawy?'
	}
	return `Proszę, o to ${coffeeMade > 1 ? 'Twoje' : 'Twój'} ${coffeeMade} ${ coffeeMade > 4 ? 'kubków' : coffeeMade > 1 ? 'kubki' : 'kubek'} kawy!`;
}

const iter = coffeeMachine();

console.log(iter.next().value)
const amount = 222;
console.log(iter.next(amount).value)
const cups = 3;
console.log(iter.next(cups).value)

// Dzięki procesowi iteracji - możemy to zautomatyzować:
const goForCoffee = coffeeMachine();
for(const x of [0, 300, 30]) {
	console.log(goForCoffee.next(x).value)
}

// Idąc krok dalej i wykorzystując closure, wygląda to jeszcze lepiej:
function iNeedCoffee(amountOfCoffeeBeans = 100) {
	const goForCoffee = coffeeMachine();
	return (numberOfCups) => [0, amountOfCoffeeBeans, numberOfCups].forEach((amount) => {
		console.log(goForCoffee.next(amount).value)
	})
}

iNeedCoffee(1)(1)
iNeedCoffee(200)(15)
iNeedCoffee(2000)(15)


// I ponowny przykład ze świata generatorów:
// Ich zdolność zatrzymywania wykonań słowem yield powoduje - iż możemy utworzyć zapis,
// np. z pętlą nieskończoną:

function *endlessGenerator() {
	for(let x = 0;;x++) {
		yield x;
	}
}

const numIterator = endlessGenerator();
numIterator.next() //=
numIterator.next() //=
numIterator.next() //=
numIterator.next() //=
numIterator.next() //=
numIterator.next() //=
numIterator.next() //=
numIterator.next() //=
numIterator.next() //=

// ...(), ...(), ...()

// Wracając do Symbol.iterator, możemy utworzyć zapis:
const myUser = {
	name: 'Roy',
	fruits: ['apples', 'mangoes', 'cherries']
}
// Standardowo, JS nie wie jak iterować po czymś "nieiterowalnym" jak obiekt:
// for(const sth of myUser) {
// 	console.log(sth)
// }

// Jednak z pomocą i implementacją Symbol.iterator + generator:
const myIterableUser = {
	name: 'Roy',
	fruits: ['apples', 'mangoes', 'cherries'],
	// Możemy określić co ma się dziać po wrzuceniu obiektu do pętli for:
	*[Symbol.iterator]() {
		 for(const fruit of this.fruits) {
		 	  yield fruit;
		 }
	}
}

for(const sth of myIterableUser) {
	console.log(sth)
}
