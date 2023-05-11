function numSplit(str) {
  return str.replace(/(?<!\.\d*)\B(?=(\d{3})+(?!\d))/g, ",");
}

console.log(numSplit("1234567.1234"));
console.log(numSplit("12345678.1234"));
