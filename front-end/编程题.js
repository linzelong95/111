// 题目：输入一个已经按升序排序过的数组和一个数字，
// 在数组中查找两个数，使得它们的和正好是输入的那个数字。
// 要求时间复杂度是O(n)。如果有多对数字的和等于输入的数字，输出任意一对即可。
const getTwoNumbers = (arr, total) => {
  let first = 0;
  let last = arr.length - 1;
  while (first < last) {
    if (arr[first] + arr[last] === total) {
      break;
    } else if (arr[first] + arr[last] > total) {
      last--;
    } else {
      first++;
    }
  }
  return arr[first] + arr[last] === total ? [arr[first], arr[last]] : null;
};

console.log(getTwoNumbers2([1, 1, 1, 4], 5));
