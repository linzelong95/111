function myInstanceOf(target, origin) {
  if (
    target === null ||
    typeof target !== "object" ||
    typeof target !== "function"
  ) {
    return false;
  }
  let __proto__ = target.__proto__;
  while (true) {
    if (__proto__ === null) {
      return false;
    }
    if (__proto__ === origin.prototype) {
      return true;
    }
    __proto__ = __proto__.__proto__;
  }
}
