// 防抖
function myDebounce(fn, ms) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
}

// 测试
// function task() {
//   console.log('run task')
// }
// const debounceTask = myDebounce(task, 1000)
// window.addEventListener('scroll', debounceTask)

// 节流
function myThrottle(fn, ms) {
  let pre = Date.now();
  return function (...args) {
    const now = Date.now();
    if (now - pre >= ms) {
      pre = now;
      fn.apply(this, args);
    }
  };
}

// 节流(setTimeout)
function myThrottle2(fn, ms) {
  let canRun = true;
  return function (...args) {
    if (!canRun) {
      return;
    }
    canRun = false;
    setTimeout(() => {
      fn.apply(this, args);
      canRun = true;
    }, ms);
  };
}

// 测试
// function task() {
//   console.log('run task')
// }
// const throttleTask = myThrottle(task, 1000)
// window.addEventListener('scroll', throttleTask)
