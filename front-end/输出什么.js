function fun(n, o) {
  console.log(o);
  return {
    fun: function (m) {
      return fun(m, n);
    },
  };
}
var a = fun(0).fun(1);
a.fun(2);
a.fun(3);
// 依次打印：
// undefined  0  1  1
