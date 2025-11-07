console.log("CODE STARTS");

function getPassCode(code) {
  if (code !== "1234") {
    throw new Error("oh no... worng CODE!");
  }

  return true;
}

try {
  getPassCode("1234");
  getPassCode("1234");
  getPassCode("1234s");
  console.log('I will never fire')
  console.log('I will never fire')
  console.log('I will never fire')
  console.log('I will never fire')
  console.log('I will never fire')
  console.log('I will never fire')
  console.log('I will never fire')
} catch (e) {
  console.log(e.message);
}

console.log("CODE ENDS");


try {

    JSON.parse('{}') //=
    JSON.parse('[1]') //=
    JSON.parse('weyfguyfwegfuyg') //=
    JSON.parse('0') //=
    JSON.parse('2') //=

} catch(e) {
    console.log(e.message);
} finally {
    console.log('I will always fire')
}