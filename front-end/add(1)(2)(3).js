function add(num) {
  var fn = function (nextNum) {
    const sum = num + nextNum;
    return add(sum);
  };

  fn.valueOf = function () {
    return num;
  };

  fn.toString = function () {
    return String(num);
  };

  return fn;
}

console.log(+add(1));
console.log(+add(1)(2));
console.log(+add(1)(2)(3));
