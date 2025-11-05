/**
 * b50-setters-getters
 * Explain
 *
 * #Cel:
 * Poznanie `set` i  `get`  używanych bezpośrednio na obiekcie - lub w definicji klasy.
 * Pozwalających na wywołanie dodatkowej logiki i specjalnego zachowania w momencie gdy przypisujemy `set`,
 * lub odczytujemy `get` - jakąś wartość (pole instancji)
 *
 * Często przydaje się do ustalania tzw. "computed properties" - gdzie wartość pola, obliczana jest
 * na podstawie innych danych zawartych wewnątrz obiektu / klasy.
 */

// setter i getter zachowuje się w JS podobnie jak w innych językach programowania
// dostajemy 2 słowa kluczowe: `set` oraz `get`
// możemy je zastosować przed metodą, zapisaną w konkretnym formacie
// jednak po "2 stronie" obiekt posiada getter / setter wystawiony jako normalne pole.

// Przykładem opłacalności tego zastosowania
// jest moment w którym wartość danego pola jest "przeliczana" i zależy od innych pól
// w tym układzie używając gettera, możemy obliczyć tę wartość
// dlatego na dane tego typu mówimy: `computed properties`
const person = {
	name: 'Maurice',
	lastName: 'Moss',
	get fullName() {
		return this.name + ' '+ this.lastName;
	}
}
console.log(person.fullName)

person.name = 'Roy';
console.log(person.fullName)

person.lastName = 'Trenneman';
console.log(person.fullName)

// Podobnie możemy je zastosować w klasie:
class MyItProfessional {
	constructor (name = '', ageOfWork = 0) {
		this.name = name;
		this.ageOfWork = ageOfWork;
	}

	get position() {
		return this.ageOfWork < 2 ? 'junior' : this.ageOfWork < 5 ? 'mid' : 'senior';
	}

	set position(value) {
		switch(value) {
			case 'junior':
				this.ageOfWork = 1;
			break;
			case 'mid':
				this.ageOfWork = 2;
			break;
			case 'senior':
				this.ageOfWork = 5;
			break;
			default:
				console.warn('sorry, unknown position:', value);
		}
	}
}

const maurice = new MyItProfessional('Maurice', 10);
console.log(maurice.position);
console.log(maurice.ageOfWork);
maurice.position = 'mid';
console.log(maurice.ageOfWork);
maurice.position = 'expert';
console.log(maurice.ageOfWork);

// tutaj dodaliśmy również setter - za pomocą którego możemy sterować wartością innego pola.

// Idea jest tutaj prosta:

// SETTER:
// poza przypisaniem konkretnej wartości mamy możliwość uruchomienia logiki, zupełnie tak, jakby ktoś
// używał metody zamiast zwykłego wpisania wartości do pola

// GETTER
// poza odczytaniem konkretnej wartości - znów mamy możliwość uruchomienia logiki, złożenia wartości pola z kilku
// innych pól etc.

// Za równo setter jak i getter - pod 2 stronie - na instancji, wyglądają jak "zwykłe pole" i tak się zachowują
// (a nie jak by sugerował zapis - jako metody!)
