Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx === null || ctx === undefined ? window : ctx;
  const fn = Symbol();
  ctx[fn] = this;
  const result = ctx[fn](...args);
  delete ctx[fn];
  return result;
};

Function.prototype.myApply = function (ctx, args) {
  ctx = ctx === null || ctx === undefined ? window : ctx;
  const fn = Symbol();
  ctx[fn] = this;
  const result = Array.isArray(args) ? ctx[fn](...args) : ctx[fn]();
  delete ctx[fn];
  return result;
};

Function.prototype.myNewBind = function (ctx, ...args1) {
  // 函数 1
  ctx = ctx === null || ctx === undefined ? window : ctx;
  let self = this;
  let fn = function (...args2) {
    // 函数 2
    return self.apply(this instanceof fn ? this : ctx, args1.concat(args2));
  };
  fn.prototype = Object.create(self.prototype); // 维持其原型
  fn.prototype.constructor = fn;
  return fn;
};
