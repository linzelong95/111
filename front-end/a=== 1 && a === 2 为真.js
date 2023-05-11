let current = 0;

Object.defineProperty(window, "a", {
  get() {
    current++;
    return current;
  },
});

console.log(Boolean(a === 1 && a === 2));
