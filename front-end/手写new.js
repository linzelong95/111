// new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

// 创建一个空的简单JavaScript对象（即{}）；
// 为步骤1新创建的对象添加属性__proto__，将该属性链接至构造函数的原型对象 ；
// 将步骤1新创建的对象作为this的上下文 ；
// 如果该函数没有返回对象，则返回this（即新建的对象）。

function _new(fn) {
  // 1 获取除fn以外的所有arguments
  // 使用slice删除arguments第一个元素就得到其他arguments
  const args = Array.prototype.slice.call(arguments, 1); // ['哈哈',123]
  // 新建一个对象 用于函数变对象
  const newObj = {};
  // 原型链被赋值为原型对象
  newObj.__proto__ = fn.prototype;
  // this 指向新对象
  fn.apply(newObj, args);
  // 返回这个新对象
  return newObj;
}

function _new(fn, ...args) {
  const newObj = Object.create(fn.prototype);
  const value = fn.apply(newObj, args);
  return value instanceof Object ? value : newObj;
}

// 测试
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function () {
  console.log("你好：", this.name);
};
_new(Person, "name", 18);

// 首先会创建一个新的空对象，如我们上面的obj。
// obj对象会继承构造函数即Person的原型，即obj.__proto__ === Person.prototype，这样obj就可以调用Person上的原型方法了。
// 将Person的this指向obj，也就是将Person上的属性添加到新的obj对象上去，obj则可以调用Person中定义的属性了。
// 如果Person构造函数没有返回对象，则返回新创建的对象（即this），否则返回return的对象。
