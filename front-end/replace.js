// replace 第二个参数：
// result: 本次匹配到的结果
// $1,...$9: 正则表达式中有几个()，就会传递几个参数，$1~$9分别代表本次匹配中每个()提取的结果，最多9个
// offset:记录本次匹配的开始位置
// source:接受匹配的原始字符串

const str = "sjg{0}kjgj{1}";
str.replace(/\{\d+\}/g, (rs, offset) => {
  console.log(rs, offset);
  return "new string";
});
// {0} 3
// {1} 10

// 如果有小括号
" abcd ".replace(/(^\s+)|(\s+$)/g, function (rs, $1, $2, offset, source) {
  //arguments中的每个元素对应一个参数
  console.log(arguments);
});

// [" ", " ", undefined, 0, " abcd "] //第1次匹配结果
// [" ", undefined, " ", 5, " abcd "] //第2次匹配结果

//把 "Doe, John" 转换为 "John Doe" 的形式：
var str2 = "Doe, John";
str.replace(/(\w+)\s*, \s*(\w+)/, "$2 $1");
// 说明：$1,$2上就是按顺序对应小括号里面的小正则 捕获到的内容。

// 实现驼峰命名转成下划线命名
function humpToLine(str) {
  return str.replace(/[A-Z]/g, (rs) => `_${rs.toLowerCase()}`);
}
humpToLine("getUserName");
