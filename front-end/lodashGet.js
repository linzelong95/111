function lodashGet(obj, path, defaultValue) {
  const paths = Array.isArray(path)
    ? path
    : path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
  return paths.reduce((target = {}, path) => target[path] ?? defaultValue, obj);
}

var obj = { a: [{ b: { c: 3 } }] };

var result = lodashGet(obj, "a[0].b.c");
console.log(result);
// => 3

result = lodashGet(obj, ["a", "0", "b", "c"]);
console.log(result);
// => 3

result = lodashGet(obj, "a.b.c", "default");
console.log(result);
// => 'default'
