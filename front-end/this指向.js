var User = {
  count: 1,
  action: {
    getCount: function () {
      return this.count;
    },
  },
};

var getCount = User.action.getCount;
setTimeout(() => {
  console.log("result 1", User.action.getCount());
});

console.log("result 2", getCount());
// 'result 2' undefined
// 'result 1' undefined

// 对象中的属性的值如果不是原始类型（是对象），存储的是指向这个对象的指针（内存地址）
// 所以 var getCount 被赋值后，拷贝的是 同名方法的内存地址
// 打印 result 2 时 getCount 被调用，调用者是全局，浏览器环境就是 window.getCount()
// 非箭头函数调用时，内部的this指向这个函数的调用者
// 简单的讲就是.前面的对象，所以两个位置调用getCount 时内部this的指向：
// User.action.getCount()指向 User.action
// getCount() 指向 全局（浏览器环境：window）
// setTimeout 会创建异步任务，即将回调函数放到队列中（而不是在本次执行任务中），在本次代码全部执行完（同步执行的代码部分），才会轮到队列中的任务执行。
// 所以 result1 在 result2 后面被打印出来

var length = 10;
function fn() {
  console.log(this.length);
}
var obj = {
  length: 5,
  method: function (fn) {
    console.log(this.length);
    fn();
    arguments[0]();
  },
};
obj.method(fn, 1);
// 5
// 10
// 2

// 非箭头函数调用时，内部的this指向这个函数的调用者.
// 首先method被obj调用，所以method执行时内部this指向obj，this.length为5。
// fn被直接调用，相当于被全局调用。浏览器环境就是window对象。所以此时fn内部的this指向window
// 浏览器环境中，在全局声明的变量，window都可以访问到。
// 所以fn中this.length打印的是全局变量length。
// 主要陷阱是arguments[0]()。
// 错误理解是先解析 arguments[0]，获取到 fn方法，最终类似前面的fn()。
// 可实际上，这里相当于：arguments 调用了下标为0的元素指向的方法fn。所以fn中this指向arguments，即arguments.length，结果为2。

var arr = [
  function () {
    console.log(this.length);
  },
  2,
  3,
  4,
];
arr[0](); // 4

var obj = {
  length: 10,
  fn: function () {
    console.log(this.length);
  },
};
obj["fn"](); // 10
