function maxSubsequence(arr) {
  let max = 0;
  let l = 0;
  let r = 0;
  const d = new Array(arr.length);
  d[0] = 0;
  for (let i = 0; i < arr.length; i++) {
    d[i + 1] = Math.max(d[i] + arr[i], arr[i]);
    if (d[i] + arr[i] < arr[i]) {
      l = i;
    }
    if (d[i + 1] >= max) {
      r = i;
      max = d[i + 1];
    }
  }
  return [max, arr.slice(l, r + 1)];
}

console.log(maxSubsequence([2, 4, -7, 5, 2, -1, 2, -4, 3]));
