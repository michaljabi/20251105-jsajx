/**
 * b70-error-catching
 * Explain
 *
 * #Cel:
 * Poznanie dobrych praktyk związanych z definiowaniem, używaniem i obsługą błędów w JavaScript.
 * Przypomnienie o wbudowanych konstruktorach dziedziczących po klasie Error.
 */


/*
	 Do "rzucania błędów" czy "wyjątków" w JavaScript służy słowo kluczowe: throw
	 Ponieważ JavaScript jest językiem skryptowym, pozwala "rzucić" dosłownie wszystko

	 throw 'string'
	 throw 213123
	 throw new Error('WOOOW')

	 NIE jest to jednak dobry pomysł, aby rzucać dowolny typ danych [!],
	 ponieważ po drugiej stronie, inny programista nie będzie wiedział czego może się spodziewać
	 Powinno się korzystać wyłącznie z Error + z klas, które po nim dziedziczą

	 -- DRUGA STRONA --
	 obsługa błędów...

	 standardowo użycie konstrukcji:
	 throw new Error('you shall not pass');

	 Spowoduje zatrzymanie się interpretera w miejscu, w którym będzie wykonywana ta instrukcja.
	 Jeśli jednak nie chcemy aby nasz program zakończył działanie, musimy - obsłużyć błąd

	 służy do tego konstrukcja:

	 try {
	    // tutaj kod który może rzucić wyjątek
	 } catch (e) {
	    // pod 'e' dostaniemy błąd który został rzucony.
	 }

*/

// Przykłady poprawnej obsługi błędów:
function iWillThrow() {
	throw new Error('This is not working')
}

try {
	iWillThrow()
} catch (e) {
	console.log(e.message);
	console.log(e instanceof Error);
}

try {
	notExistingVariable
} catch (e) {
	console.log(e);
	console.log(e.message);
	// Łańcuch dziedziczenia:
	console.log(e instanceof ReferenceError);
	console.log(e instanceof Error);
}

// Błąd może nas w ogóle nie interesować:
try {
	iWillThrow();
} catch {}

// Typowe przypadki w których pojawia się błąd:
try {
	JSON.parse('I am not a json object 😎')
} catch (error) {
	console.log(error);
	console.log(error instanceof SyntaxError)
	console.log(error instanceof Error)
}

let maybeAnObject = null;
try {
	maybeAnObject.name = 'Katarzyna';
} catch (error) {
	console.log(error);
	console.log(error instanceof TypeError)
	console.log(error instanceof Error)
}

/*

		Jeśli nasz błąd zostaje obsłużony, to wtedy nie musimy się martwić o wykonanie pozostałej części programu
		Tak jak widzisz powyżej, dalej i w tym miejscu działa Quokka, ponieważ każdy z błędów został "złapany"

		Ważne jednak żeby rozumieć jak zachowuje się kod w momencie wystąpienia błędu, w zależności od tego
		w jakim punkcie instrukcji try {} catch {} się znajdujemy.
*/

//		Oto sposób wykonywania się instrukcji jeśli błąd faktycznie wystąpi:
try {
	iWillThrow();
	console.log('If this above will throw I will not be executed !')
	console.log('Me to ... :(')
} catch (e) {
	console.log(e);
	console.log('If this above throws, I will be executed !')
} finally {
	console.log('I will be executed either way ! ALWAYS !')
}
// Dochodzi tutaj (w przykładzie powyżej) jeszcze blok "finally {}" - którego instrukcje wykonają się zawsze,
// niezależne od tego czy w try {} pojawi się błąd czy nie!

try {
	console.log('this is throw-less');
	console.log('All of the instructions')
	console.log('will')
	console.log('be')
	console.log('executed')
} catch (e) {
	console.log(e)
	console.log('No error - so i will not be executed... :/')
} finally {
	console.log('I will be executed either way ! ALWAYS !')
}

// Klasa Error, zawsze tworzona jest z odpowiednim message, jednak w połączeniu z lukrem składniowym `class`
// Możemy na podstawie dziedziczenia przygotowywać swoje własne klasy z błędami:

class MyNetworkError extends Error {
	constructor (status = 0, message = '') {
		super(message);
		// Nasze wymyślne pole "status"
		this.status = status;
	}
}

// Zwróć uwagę, że to czy funkcja rzuci wyjątek czy nie - jest losowe :)
// Raz jak Quokka się przeładuje, będzie throw, innymi razy - nie
function connectToServer() {
	const whatsTheOdds = [true, false, true, false];
	const randFrom0To3 = Math.round(Math.random() * 3);
	console.log(randFrom0To3);
	if(whatsTheOdds[randFrom0To3]) {
		// Przykładowe użycie MyNetworkError:
		throw new MyNetworkError(500, 'Server unreachable');
	}
}

try {
	connectToServer();
	console.log('Connection successful')
} catch (error) {
	console.log(error);
	console.log(error.status);
	// Dziedziczenie:
	console.log(error instanceof MyNetworkError);
	console.log(error instanceof Error);
}


// Możemy dziedziczyć również po innych klasach które reprezentują Errory
// Oto lista:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types

// Przykłady wbudowanych konstruktorów klas z błędami:
console.log(EvalError);
console.log(RangeError);
console.log(ReferenceError);
console.log(SyntaxError);
console.log(TypeError);
console.log(URIError);

