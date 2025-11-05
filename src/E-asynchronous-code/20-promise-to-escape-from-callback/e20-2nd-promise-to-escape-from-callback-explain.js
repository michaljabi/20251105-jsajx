/**
 * e20-promise-to-escape-from-callback
 * Explain
 *
 * #Cel:
 * Poznanie jednego z najlepszych pomysłów w świecie JS - Promise.
 * Skoro każda akcja asynchroniczna może się:
 *  - udać [resolve]
 *  - nie udać :) [reject]
 * Dostajemy obiekt - który pozwala nam obsłużyć te dwa stany
 * Dodatkowo wszystko co jest opakowane Promise, może być synchroniczne lub asynchroniczne
 *
 */

// Przypomnijmy sobie o callbacku:

function makeMeACoffee(serveCoffee) {
	// wait 200ms
	setTimeout(() => {
		serveCoffee('Mocha')
	}, 200)
}

makeMeACoffee((myCoffee) => {
	console.log(myCoffee)
})


// W tym układzie - to tzw. "Wesoła ścieżka" (Happy path).
// 1) wrzucam callback
// 2) dostaje kawę

// Wiem, że w rzeczywistym świecie - nie zawsze wszystko jest takie proste...
// Czasem - kawy nie będzie, coś po drodze się nie wykona lub powstaną inne problemy...

// Generalnie - callback sprawdza się dobrze jeśli:
// a) Zawsze może się wykonać (np. dla event DOM - click w button)
// b) Nie następuje po sobie klika operacji asynchronicznych / synchronicznych - jedna po drugiej (gdzie są od siebie zależne)


// Próba zastosowania callback'ów do operacji asynchronicznych, które mogą się wykonać - lub zwrócić error,
// doprowadza nas do takich konstrukcji:

function makeAjaxCall(url, callbackFn) {
	// Albo:
	callbackFn('resolved', null);
	// Albo:
	// callbackFn(null, new Error('reject'));
}

// Przykład callback hell:
makeAjaxCall('https://first', (data, err) => {
	if(err) {
		console.log('error 😐', err)
		return;
	}
	makeAjaxCall('https://second' + data.url, (data, err) => {
		if(err) {
			console.log('error 😐', err)
			return;
		}
		makeAjaxCall('https://third' + data.url, (data, err) => {
			if(err) {
				console.log('error 😐', err)
				return;
			}
			console.log('THIS IS MADNESS !!!')
		})
	})
})

// Promise - TO THE RESCUE!
// Czy można rozwiązać to prościej - tak.
// Właśnie dla tego powstają promises. Ich zadaniem jest obsłużenie 2 stanów: resolve, reject
// Jednak używamy do tego 2 metod: `.then()` oraz `.catch()` i do nich przekazujemy callback functions
// Niby - to samo, jednak then oraz catch - również zawsze zwracają Promise - nawet, jeśli nic nie zwracamy,
// Lub przekażemy dane synchroniczne.

// Zobaczmy najprostrzy przykład wywołania:

const provider = Promise.resolve('hello');

// Odbiór promise:
// CONSUMER:
provider.then((message) => {
	console.log(message)
})

// całe piękno polega na tej własności:
provider
	.then((message) => {
		console.log(message)
		return 1234;
	})
	.then((num) => {
		console.log(num);
		return Promise.resolve('other promise');
	})
	.then((msg) => {
		console.log(msg);
	})

// możemy "chainować" wywołania then:
// Promise.resolve().then().then().then()

// zobacz jak upraszcza nam to przykład z callback hell:

function makeAjaxCallAsPromise(url) {
	// Albo:
	return Promise.resolve('resolved');
	// Albo:
	// return Promise.reject(new Error('reject'));
}

makeAjaxCallAsPromise('https://first')
	.then((data) => {
		return makeAjaxCallAsPromise('https://second' + data.url);
	})
	.then((data) => {
		return makeAjaxCallAsPromise('https://third' + data.url);
	})
	.then((data) => {
		console.log('THIS IS COOLNESS !!!', data);
	})
	.catch((err) => {
		console.log('error 😐', err)
	})

// Z promise - mamy 2 opcje:

// stan: resolved
// stan: rejected

// Te dwa stany na wzajem się wykluczają - co w praktyce oznacza, że Promise która jest rejected - nie może być
// resolved - i odwrotnie! Nie możemy również mieć Promise - która jednocześnie jest resolved i rejected.

// Pełne API do utworzenia Promise, wygląda następująco:

const promiseProvider = new Promise((resolve, reject) => {
	// zrób coś synchronicznie, lub asynchronicznie
	// ponieważ mamy dostęp do resolve i reject jako callbacks:
	setTimeout(() => {
		resolve('OK')
		// lub:
		// reject(new Error('No way !'))
	}, 200)
})


// Zwróć uwagę, że powyższy zapis może być resolved - natychmiastowo (synchronicznie), lub asynchronicznie
// Dla uproszczenia - Promise posiada 2 metody statyczne, jeśli chcemy mieć Promise, która natychmiastowo jest resolved lub rejected.
// Zobacz jak to działa w praktyce.

// Zamiast pisać:
new Promise((resolve => {
	resolve('Hello')
}))
// można w skrócie napisać:
Promise.resolve('Hello')

// Podobnie z REJECT:
// Zamiast pisać:
new Promise(((resolve, reject) => {
	reject('Oh no !')
}))
// można w skrócie napisać:
Promise.reject('Oh no !')

// TO w połączeniu z tym że możemy chain'ować `.then()` i w kolejnych wywołaniach `.then()`
// podawać dane albo w postaci kolejnych Promise - albo dowolnych innych obiektów, które i tak zostaną opakowane,
// jako Promise.
// Sprawia - że możemy pozbyć się zagnieżdżeń wywołań asynchronicznych! I je uprościć!

// Natywne Promise - wchodzi do języka po 2015 roku
// Dzisiaj, wiele bibliotek JS, które opierają swoje działanie na operacjach asynchronicznych - korzysta z API do Promise.

// Nowoczesny sposób obsługi zapytań AJAX (fetch) - wbudowany w Evergreen Browsers, również oferuje swoje działanie,
// w oparciu o Promise:

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
