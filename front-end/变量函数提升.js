// ====================================
var h = 1;
function foo() {
  if (!h) {
    var h = 2;
  }
  alert(h);
}
foo(); // 2
// var的声明会提前
// var h = 1;
// function foo() {
//   var h;
//   if (!h) {
//     h = 2;
//   }
//   alert(h);
// }

// -----------
function getName() {
  console.log(3);
}
var getName = function () {
  console.log(2);
};
getName(); // 2

// -----------
var getName = function () {
  console.log(2);
};
function getName() {
  console.log(3);
}
getName(); // 2

// 无论是函数优先提升，还是变量优先提升，变量的赋值总是在这两者的下边，所以打印出来的是2

// 函数优先提升，打印出来是2
// function getName() {
//   console.log(3);
// }
// var getName
// console.log(typeof getName) // 打印出来是function，注意，同名变量慢于函数提升，undefined并不会覆盖function
// getName= function () {
//   console.log(2);
// };

// 变量优先提升，打印出来也是2
// var getName
// function getName() {
//   console.log(3);
// }
// getName= function () {
//   console.log(2);
// };
