function green() {
  console.log("green");
}

function red() {
  console.log("red");
}

function yellow() {
  console.log("yellow");
}

function timeoutPromise(ms, cb) {
  return new Promise((resolve) => {
    cb();
    setTimeout(resolve, ms);
  });
}

// 使用 await
// async function step() {
//   await timeoutPromise(3000, green);
//   await timeoutPromise(1000, yellow);
//   await timeoutPromise(3000, red);
//   step();
// }

function step() {
  Promise.resolve()
    .then(() => timeoutPromise(3000, green))
    .then(() => timeoutPromise(1000, yellow))
    .then(() => timeoutPromise(3000, red))
    .then(() => step());
}

step();
