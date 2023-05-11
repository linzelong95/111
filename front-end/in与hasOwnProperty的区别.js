// 使用 for in 循环遍历对象的属性时，原型链上的所有属性都将被访问
for (const key in obj) {
  //只遍历对象自身的属性，而不包含继承于原型链上的属性。
  if (obj.hasOwnProperty(key)) {
    // 使用 hasOwnProperty 方法， 这将会避免原型对象扩展带来的干扰
  }
}
