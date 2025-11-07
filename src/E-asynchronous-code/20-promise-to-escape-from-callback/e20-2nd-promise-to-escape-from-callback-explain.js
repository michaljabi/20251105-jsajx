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

// PROVIDER
function makeMeACoffee(serveCoffee) {
  // wait 200ms
  setTimeout(() => {
    serveCoffee("Mocha");
    serveCoffee("Espresso");
  }, 200);
}

// CONSUMER 1
makeMeACoffee((myCoffee) => {
  console.log(myCoffee);
});
// CONSUMER 2
makeMeACoffee((myCoffee) => {
  console.log(myCoffee);
});

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
  callbackFn("resolved", null);
  // Albo:
  // callbackFn(null, new Error('reject'));
}

// Przykład callback hell:
makeAjaxCall("https://first", (data, err) => {
  if (err) {
    console.log("error 😐", err);
    return;
  }
  makeAjaxCall("https://second" + data.url, (data, err) => {
    if (err) {
      console.log("error 😐", err);
      return;
    }
    makeAjaxCall("https://third" + data.url, (data, err) => {
      if (err) {
        console.log("error 😐", err);
        return;
      }
      console.log("THIS IS MADNESS !!!");
    });
  });
});

// Promise - TO THE RESCUE!
// Czy można rozwiązać to prościej - tak.
// Właśnie dla tego powstają promises. Ich zadaniem jest obsłużenie 2 stanów: resolve, reject
// Jednak używamy do tego 2 metod: `.then()` oraz `.catch()` i do nich przekazujemy callback functions
// Niby - to samo, jednak then oraz catch - również zawsze zwracają Promise - nawet, jeśli nic nie zwracamy,
// Lub przekażemy dane synchroniczne.

// Zobaczmy najprostrzy przykład wywołania:

const provider = Promise.resolve("hello");

// Odbiór promise:
// CONSUMER:
provider.then((message) => {
  console.log(message);
});

// całe piękno polega na tej własności:
provider
  .then((message) => {
    console.log(message);
    throw new Error("oh no...");
    return 1234;
  })
  .then((num) => {
    console.log(num);
    // throw new Error('oh no...')
    return Promise.resolve("other promise");
  })
  .then((msg) => {
    console.log(msg);
  })
  .catch((e) => {
    console.log(e.message);
  })
  .finally(() => {
    console.log("I will always fire");
  });

// możemy "chainować" wywołania then:
// Promise.resolve().then().then().then()

// zobacz jak upraszcza nam to przykład z callback hell:

// const array: Array<string | number> = [1, '2'];

function makeAjaxCallAsPromise(url) {
  // Albo:
  // return Promise.resolve("resolved");
  // Albo:
  // return Promise.reject(new Error('reject'));
  // Albo pełne API:
  // PROVIDER
  return new Promise((resolve, reject) => {
    //resolve("resolved")
    setTimeout(() => {
      if (url === "") {
        reject("reject");
      } else {
        resolve("resolved");
      }
    }, 2000);
  });
}

makeAjaxCallAsPromise("https://first")
  .then((url) => {
    return makeAjaxCallAsPromise("https://second" + url);
  })
  .then((url) => {
    return makeAjaxCallAsPromise("https://third" + url);
  })
  .then((data) => {
    console.log("THIS IS COOLNESS !!!", data);
  })
  .catch((err) => {
    console.log("error 😐", err.message);
  });

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
    resolve("OK");
    // lub:
    // reject(new Error('No way !'))
  }, 200);
});

// Zwróć uwagę, że powyższy zapis może być resolved - natychmiastowo (synchronicznie), lub asynchronicznie
// Dla uproszczenia - Promise posiada 2 metody statyczne, jeśli chcemy mieć Promise, która natychmiastowo jest resolved lub rejected.
// Zobacz jak to działa w praktyce.

// Zamiast pisać:
new Promise((resolve) => {
  resolve("Hello");
});
// można w skrócie napisać:
Promise.resolve("Hello");

// Podobnie z REJECT:
// Zamiast pisać:
new Promise((resolve, reject) => {
  reject("Oh no !");
});
// można w skrócie napisać:
Promise.reject("Oh no !");

// TO w połączeniu z tym że możemy chain'ować `.then()` i w kolejnych wywołaniach `.then()`
// podawać dane albo w postaci kolejnych Promise - albo dowolnych innych obiektów, które i tak zostaną opakowane,
// jako Promise.
// Sprawia - że możemy pozbyć się zagnieżdżeń wywołań asynchronicznych! I je uprościć!

// Natywne Promise - wchodzi do języka po 2015 roku
// Dzisiaj, wiele bibliotek JS, które opierają swoje działanie na operacjach asynchronicznych - korzysta z API do Promise.

// Nowoczesny sposób obsługi zapytań AJAX (fetch) - wbudowany w Evergreen Browsers, również oferuje swoje działanie,
// w oparciu o Promise:

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
