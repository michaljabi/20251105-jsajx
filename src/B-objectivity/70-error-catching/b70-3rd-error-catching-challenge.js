import { assertThat } from '../../j4b1-assert.js'
/**
 * b70-error-catching
 * Challenge
 *
 * W naszym nowym frontendowym framework'u - zdecydowaliśmy się na obsługę templates.
 *
 * Przykładowo jeśli ktoś wpisze tak:
 * <span> {{hello}} </span>
 * i poda obiekt:
 * {hello: 'Witaj'}
 *
 * to wynik ma postać:
 * <span> Witaj </span>
 *
 * Potrzebujemy jednak zrobić obsługę błędów, ponieważ czasem developerzy definiują szablon np.:
 * <span> {{hello}} {{sample}} </span>
 * a podając obiekt mapujący, zapominają podać wszyskie pola:
 * {hello: 'Witaj'} // ale zobacz że nie ma `sample` !!!!
 *
 * Chcemy aby było to określane jako TemplateParseError
 * I pokazywało linię, w której błąd wystąpił.
 *
 * Całą logikę mamy przygotowaną. Ty musisz jedynie dodać wywołanie i obsługę błędu.
 *
 * * Reguły:
 * - musisz dodać klasę TemplateParseError z odpowiednimi własnościami
 * - musisz dodać "throw" dla errora
 * - nie możesz zmieniać logiki działania templateParse
 */

// Tutaj przygotuj klasę z błędem:
// ...

// Tej logiki nie zmieniaj, dodaj jedynie wywołanie błędu w oznaczonym miejscu
function templateParse(templateString = '', mappedValues = {}) {
	  const lines = templateString.split('\n');
	  const result = [];
	  lines.forEach((line, lineIdx) => {
	  	const placeholders = line.match(/(?<={{)\w+(?=}})/g) || [];
	  	for(let key of placeholders) {
	  		const value = mappedValues[key];
	  		if(!value) {
	  			// Tutaj dla klucza występującego w template, nie zostało została zdefiniowana wartość w mappedValues
				  // Trzeba rzucić błąd z numerem lineIdx

			  }
	  		line = line.replace('{{'+key+'}}', value);
		  }
		  result.push(line);
	  })
		return result.join('\n');
}

const parsed1 = templateParse(`<h1>{{title}}</h1>` , {title: 'The It Crowd'});

// Pomocnicza zmienna, do której trzeba wpisać zwracany error (patrz testy poniżej)
let error;

let parsed2 = templateParse(`
	<h1>{{title}}</h1>
	<h2>{{subtitle}} and {{others}}</h2>
` , {title: 'My super site', subtitle: 'shop whatever you want'});



// #Reguła:
// Nie możesz zmieniać kodu poniżej:
assertThat(
	'First template should be parsed without errors',
	expect => expect(parsed1).toBe('<h1>The It Crowd</h1>')
)  //=

assertThat(
	'Parsed 2 should be empty - due to errors',
	expect => expect(parsed2).toBe(``)
)  //=

assertThat(
	'error suppose to inherit from Error',
	expect => expect(error instanceof Error).toBe(true)
)  //=

assertThat(
	'error suppose to be TemplateParseError class',
	expect => expect(error instanceof TemplateParseError).toBe(true)
)  //=

assertThat(
	'error need to provide line of error (2)',
	expect => expect(error.line).toBe(2)
)  //=
