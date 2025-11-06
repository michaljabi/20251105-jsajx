const array = [1, 2, 3, 4];

// 10 + 1 + 2 + 3 + 4
const sumWithInitial = array.reduce((accumulator, currentValue) => {
  console.log(accumulator);
  console.log(currentValue);
  return accumulator + currentValue;
});

console.log(sumWithInitial);

// przepraw wszystkie numery na rozdziały z pominięciem 3 rozdziału
array.filter((x) => x !== 3).map((x) => "Chapter #" + x); //=

console.log(array);
array; //=

const sentence = `This is it`;
// tzw. PURE Functions
// 1. Nie mają efektów ubocznych, nie dowołują się do outer-scope, nie są zależne od np. server side call
// 2. Same input => same output, dla tych samych danych wejściowych produkują te same dane wyjśniowe
// 3. najlepiej tzw. SINGLE Responsibility (czyli robię 1 rzecz konkretną i za to odpowiadam) (SOLID)
const wordToUpper = (w) => w.toUpperCase();
const banItWord = (w) => w.toLowerCase() !== "it";

// patterny które powstają w programowaniu funkcyjnym:
const banWord = (word) => (w) => w.toLowerCase() !== word.toLowerCase();

function fnBanWord(word) {
  console.log(word);
  return (w) => {
    console.log(w);
    return w.toLowerCase() !== word.toLowerCase();
  };
}

// fnBanWord('THIS')('this is it') //=

sentence
  .split(" ")
  // .map((c) => c.toUpperCase())
  .map(wordToUpper)
  // .filter((w) => w !== "IT")
  // .filter(banItWord)
  .filter(banWord("this"))
  //.filter(fnBanWord("this"))
  .join("_"); //=

wordToUpper("Michał"); //=
wordToUpper("Krysia"); //=
