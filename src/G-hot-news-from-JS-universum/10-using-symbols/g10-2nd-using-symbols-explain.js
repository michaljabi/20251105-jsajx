/**
 * g10-using-symbols
 * Explain
 *
 * #Cel:
 * Poznanie nowego typu prostego - Symbol - obecnego w JS od 2015 roku (ES6).
 * Pomocnego jeśli chcemy uzyskać unikatowość, zabezpieczyć coś przed serailizacją, lub skorzystać z metaprogramowania w JS.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
 */


// Symbol jest specyficznym typem prostym, którego każde wywołanie daje zupełnie nową unikatową wartość:

const mySymbol = Symbol();

// Każde wywołanie jest unikatowe:
console.log(mySymbol);
console.log(mySymbol === Symbol())
console.log(Symbol() === Symbol())

// Symbolu nie da się utworzyć jako instancji:
// nie można go wywołać ze słowem kluczowym new !
try {
	new Symbol();
} catch ( e ) {
	console.log(e);
}

// Tak więc wywołanie Symbol() - to globalna "factory function" dla symboli.

// Przy wywołaniu nowego symbolu możesz podać wartość string jako jego "description"
// jednak jest to tylko dla potrzeb "debuggingu"

const mySuperSymbol = Symbol('hello world')
console.log(mySuperSymbol)

// description absolutnie nie ma wpływu na zachowanie się symbolu:
console.log(Symbol('ok') === Symbol('ok'))


// Symbol możemy wykorzystać do uzyskania pseudo-prywatnego pola w obiekcie:
// Będzie ono widoczne na zewnątrz - i jest sposób żeby się do niego dobrać,
// Jednak nie jest to oczywiste - i raczej nikt nie będzie ruszał naszego pola

// W swoim scope, zrobilibyśmy stałą "salary" pod którą ukryjemy symbol
const salary = Symbol();
const myUser = {
	name: 'Roy',
	// symbol z salary posłuży nam do zrobienia pola na obiekcie:
	[salary]: 3000
}
// w prywatnym scope:
console.log(myUser[salary])

// TYMCZASEM NA ZEWNĄTRZ:

// No to tak, robiąc console.log - widzę że coś jest, jakiś Symbol()
console.log(myUser)

// Tak się do niego nie dostanę - ponieważ każde wywołanie Symbol() - to nowa wartość symbolu
console.log(myUser[Symbol()])

// Sprawdzam czy mieszka w kluczach obiektu - i czy jest jako OwnProperty...
Object.keys(myUser) //=
Object.getOwnPropertyNames(myUser) //=


// Możemy się dostać nie mając stałej salary, po przez wyciągnięcie pól - symboli, dla obiektu:
Object.getOwnPropertySymbols(myUser) //=
const [hack] = Object.getOwnPropertySymbols(myUser);
console.log(myUser[hack]);
// JEST !

// Skoro Symbole mogą być używane jako nazwy properties obiektu np:
const user = {};
user.name = 'Michal';
user[Symbol()] = 's3cr3t!';

console.log(user);
// Zobaczmy co dzieje się z nimi po serializacji do JSON:
console.log(JSON.stringify(user))
// WOW !
// Symbol nie podlega serializacji (zupełnie jak np. metody na obiekcie)

// Symbole pomagają w tzw. meta programowaniu:
// Przykładowo możemy określić metodę odpowiadającą za możliwość iteracji po obiekcie:

const myNonIterableObject = {}

// Standardowo to niemożliwe:
try {
	for(let x of myNonIterableObject) {
		 console.log(x)
	}
} catch (e) {
	console.log(e)
}

// Jednak z pomocą stałego pola - Symbolu:
// Symbol.iterator + funkcja z generatorem =
const myIterableObject = {
	name: 'Mike',
	*[Symbol.iterator]() {
		yield '😊';
		yield '😀';
		yield '😁';
		// yield this;
	}
}
for(let smile of myIterableObject) {
	console.log(smile)
}

// Symbole posiadają również rejestr globalny.
// Można się do niego odnieść tak (używając składni .for('key')) :
const registerMyKey = Symbol.for('my-key');
// teraz symbol z kluczem 'my-key' jest w rejestrze globalnym
console.log(registerMyKey);
// odczytajmy go znów:
console.log(Symbol.for('my-key') === registerMyKey);

// Jeśli coś nim oznaczymy, np pole naszego usera:
const mySuperUser = {
	[registerMyKey]: 11231
}

// to możemy to przywrócić korzystając z globalnego rejestru (zamiast z lokalnej referencji):
console.log(mySuperUser[Symbol.for('my-key')])


