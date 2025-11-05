/**
   Kolejny wycinek nowych funkcjonalności JavaScript

   Już po ES6 (po 2015 roku).
 */
// ES7 --------------
// Sample #1 | operator podnoszenia do potęgi
(function exponentialOperator(){
  console.log('#1  ---- exponentialOperator() :');

  const two = 2;
  console.log(two ** 2); // 2 ^ 2
  console.log(two ** 4); // 2 ^ 4
}());

// Sample #2 | uproszczone sprawdzenie czy dany element istnieje w tablicy
(function arrayIncludes(){
  console.log('#2  ---- arrayIncludes() :');

  const lawyers = ['Louis', 'Rachel', 'Jessica', 'Michael', 'Harvey'];

  console.log('Dona is present?', lawyers.includes('Donna'));
  console.log('Jessica is present?', lawyers.includes('Jessica'));
  // I, tak - jest case-sensitive:
  console.log('JessiCa is present?', lawyers.includes('JessiCa'));
}());

// ES8 --------------
// Sample #3 | tablica wartości danego obiektu
(function objectValues(){
  console.log('#3  ---- objectValues() :');

  const barrel = {
    lid: 'plastic',
    body: 'wooden',
    content: 'pickles'
  };

  console.log('barrel values:', Object.values(barrel));
}());

// Sample #4 | dopełnienie wartości typu string o dany znak
(function padStartPadEnd(){
  console.log('#4  ---- padStartPadEnd() :');

  console.log('Today is: ', '9'.padStart(2, '0'));
  console.log('You got: ', '9,'.padEnd(5, '0'), '$');

  console.log('EnterNumber: ', '9'.padStart(5, '-'));
  console.log('EnterNumber: ', '91'.padStart(5, '-'));
  console.log('EnterNumber: ', '911'.padStart(5, '-'));
}());

// Sample #5 | operatory async i await pozwalające pisać kodzik asynchroniczny tak samo jak synchroniczny
(function asyncAwait(){
  console.log('#5  ---- asyncAwait() :');
  const fetchData = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(['hello', 'asyc'])
    }, 1000)
  });

  (() => {
    fetchData().then((arr) => console.log('#5  ---- then array:', arr))
  })();

  (async () => {
     // Dodwolna Promis będzie obsługiwalna przez async/await
     const myArray = await fetchData();
     console.log('#5  ---- await array:', myArray)
  })();

}());

// ES9
// Sample #6 | promise finally
(function promiseFinally(){
  console.log('#6  ---- promiseFinally() :');
  const fetchData = (breakIt = false) => new Promise((resolve, reject) => {
    setTimeout(() => {
      if(breakIt) {
        reject(new Error('breakIt flag is on!'))
      } else {
        resolve('Hello from promise')
      }
    }, 1000)
  });

  fetchData()
    .then((result) => console.log('#6  ---- result:', result))
    .finally(() => console.info('#6  ---- finally !'));

  fetchData(true)
    .then((result) => console.log('#6  ---- result 2:', result))
    .catch((err) => console.error('#6  ---- error 2:', err.message))
    .finally(() => console.info('#6  ---- finally 2 !'));

}());

// ES10
// Sample #7 | spłaszczanie wielowymiarowych tablic
(function arrayFlat(){
  console.log('#7  ---- arrayFlat() :');

  const twoDimensionsArray = [[9], [10, 11], 12]

  console.log(twoDimensionsArray)
  console.log(twoDimensionsArray.flat())

}());

// Sample #8 | składanie obiektu z tzw. entry: [ ['key',  'value'] ]
(function objectFromEntries(){
  console.log('#8  ---- objectFromEntries() :');

  const entries = [['first', 1], ['second', 2], ['third', 3]];
  const order = Object.fromEntries(entries)
  console.log(order)

  const mapEntries = new Map();
  mapEntries.set('name', 'John')
  mapEntries.set('occupation', 'IT Recruiter')

  console.log(Object.fromEntries(mapEntries));
}());

// ES11
// Sample #9 | dynamiczne importy
(function dynamicImports(){

    import('../exercise-service').then(module => {
        console.log('#9  ---- dynamicImports() :');
        console.log(module)
    })
}());

// Sample #10 | zunifikowany obiekt globalny (niezależnie czy webworker / browser / node)
(function globalThisObject(){
    console.log('#10  ---- globalThisObject() :')
    console.log(globalThis)
}());

// Sample #11 |
(function optionalChainingOperator(){
    console.log('#11  ---- optionalChainingOperator() :')
    const user = {};

    // To wywoła nam błąd (tych wartości nie ma w obiekcie)
    // console.log(user.address.street.building)

    // Dlatego zamiast w starym stylu:
    console.log(user && user.address && user.address.street && user.address.street.building)

    // Użyjemy:

    console.log(user?.address?.street?.building)
}());

