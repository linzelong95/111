// 实现一个LazyMan，可以按照以下方式调用:
// LazyMan(“Hank”)输出:
// Hi! This is Hank!

// LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~

// LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!

function timeoutPromise(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

class _LazyMan {
  constructor(name) {
    this.tasks = [];
    this.timer = null;
    this.sayHi(name);
  }

  runTasks() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(async () => {
      for (const task of this.tasks) {
        await task();
      }
    }, 0);
    return this;
  }

  sayHi(name) {
    this.tasks.push(() => {
      console.log(`Hi. This is ${name}!`);
    });
    return this.runTasks();
  }

  eat(meal) {
    this.tasks.push(() => {
      console.log(`Eat ${meal}~`);
    });
    return this.runTasks();
  }

  sleep(ts) {
    this.tasks.push(() => timeoutPromise(ts));
    return this.runTasks();
  }

  sleepFirst(ts) {
    this.tasks.unshift(() => timeoutPromise(ts));
    return this.runTasks();
  }
}

function lazyMan(name) {
  return new _LazyMan(name);
}

// lazyMan("Hank");
// lazyMan("Hank").sleep(10).eat("dinner");
// lazyMan("Hank").eat("dinner").eat("supper");
lazyMan("Hank").sleepFirst(10).eat("dinner");
