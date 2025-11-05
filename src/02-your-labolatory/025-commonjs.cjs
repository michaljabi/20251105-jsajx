// rozszerzenie .cjs spowoduje że ten plik będzie mógł używać składni CommonJS
// pomimo tego że w package.json mamy wyraźnie type: "module" - co wskazuje na ESM

module.exports = {
  myLuckyNumber: 3000,
};


// w inym pliku:
// const myObject = require('./025-commonjs')