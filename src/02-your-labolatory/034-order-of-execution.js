setTimeout(() => {
  console.log("1st");
});

process.nextTick(() => {
    console.log("1st nextTick");
});

console.log("2nd");

Promise.resolve().then(() => {
  console.log("3rd");
});

//:
// 2nd - normal code
// 3rd - Microtask
// 1st - TASK


Promise.resolve().then(() => {
  console.log("3rd");
});

queueMicrotask(() => {
  console.log("4th");
});

Promise.resolve().then(() => {
  console.log("3rd");
});



