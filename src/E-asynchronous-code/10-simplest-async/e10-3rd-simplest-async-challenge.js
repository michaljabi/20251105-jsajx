import { assertThat } from "../../j4b1-assert.js";
/**
 * e10-simplest-async
 * Challenge
 *
 * A myśleliśmy, że świat będzie pełen słoneczka, tęczy i jednorożców.
 * Nasza dzielna kontrybucja do ołpen-sorsa Dżej Kuery - ma drobnego buga.
 * Zakładamy, że każde zapytanie Ajax do serwera z metody "getJSON",
 * będzie poprawnie rozwiązane i przyniesie dane!
 *
 * Nie przewidzieliśmy że:
 * - adres będzie niepoprawny
 * - serwer nie odpowie z danymi
 * - serwer odpowie błędem
 *
 * Mamy już pomysł na fix'a 0.2.101283 - trzeba dorobić 2 wartości dla callback'a
 * Jedna - po prostu tak jak do tej pory będzie nam dawała dane.
 * Druga to będzie "error" - ustawiony na null jeśli wszystko będzie OK,
 * jeśli nie - to tam damy error a data ustawi się na null.
 *
 * Pomóż nam to złożyć, proszę.
 *
 * * Reguły:
 * - Kod zmieniaj tylko w środku implementacji getJSON()
 */

const DZej = {
  getJSON(url, callback) {
    // #Reguła:
    // Kodzik można pisać i zmieniać tylko w tym bloku.
    console.log(url);
    if (url.endsWith("/it")) {
      // ok
      callback({ message: "did you try?" }, null);
    } else {
      // error
      callback(null, { status: 404, message: "Invalid URL!" });
    }
  },
};

// #Reguła:
// Nie możesz zmieniać kodu poniżej:
let firstAjaxResult = {};
DZej.getJSON("https://reynholm-industries.com/it", (data, error) => {
  firstAjaxResult = { error, data };
});
assertThat("", (expect) =>
  expect(firstAjaxResult).toEqual({
    error: null,
    data: { message: "did you try?" },
  })
); //=

let secondAjaxResult = {};
DZej.getJSON("https://reynholm-industries.com/not-existing", (data, error) => {
  secondAjaxResult = { error, data };
});
assertThat("", (expect) =>
  expect(secondAjaxResult).toEqual({
    error: { status: 404, message: "Invalid URL!" },
    data: null,
  })
); //=

// Czym jest CALLBACK hell ?
const fakeFetch = () => {};

fakeFetch("https://reynholm-industries.com/user/1", (error, user) => {
	if(!error) {
		throw new Error(error.message)
	}
	fakeFetch(`https://reynholm-industries.com/user/${user.id}/posts`, (error, posts) => {
		if(!error) {
			throw new Error(error.message)
		}
		const [first] = posts;
		fakeFetch(`https://reynholm-industries.com/user/${user.id}/posts/${first.id}`, (error, content) => {
			if(!error) {
				throw new Error(error.message)
			}
			console.log('first post content', content)
		});
	});
});

const promiseFetch = async () => {};
// Promise to the rescue:

let userId = 0;
promiseFetch("https://reynholm-industries.com/user/1")
	.then(user => {
		userId = user.id
		return promiseFetch(`https://reynholm-industries.com/user/${userId}/posts`)//.catch(() => {})
	})
	.then(posts => {
		const [first] = posts;
		return promiseFetch(`https://reynholm-industries.com/user/${userId}/posts/${first.id}`)
	})
	.then(content => {
		console.log('first post content', content)
	})
	.catch(err =>{
		console.error(err.message)
	})
	.finally(() => {
		console.log('Wykonuje się zawsze')
	})
	