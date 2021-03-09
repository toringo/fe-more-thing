function getObjectProperty(obj, str) {
  if (!str) return obj;
  if (!obj) return null;

  let ret = obj;
  const strArr = str
    .replace(/(\[)|(\.\[)/g, ".")
    .replace(/]/g, "")
    .split(".")
    .reverse();

  while (strArr.length) {
    const cur = ret[strArr.pop()];
    if (typeof cur === "object") {
      ret = cur;
    } else {
      return cur || null;
    }
  }

  return ret;
}

console.time();
console.log(
  getObjectProperty({ a: { b: [1, [2, { a: [1] }]] } }, "a.b.[1].[1].a[0]")
);
console.log(getObjectProperty({ a: { b: [1, [2]] } }, "a.b[3]"));
console.log(getObjectProperty({ a: { b: [1, [2]] } }, "a.b"));
console.log(
  getObjectProperty({ a: { b: [1, [2, { a: [1] }]] } }, "a.b.[1].[1].a[3]")
);
console.log(
  getObjectProperty({ a: { b: [1, [2, { a: [1] }]] } }, "a.b.[1].[1].a")
);
console.timeEnd();
