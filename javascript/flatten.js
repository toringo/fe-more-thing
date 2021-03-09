function flatten(arr) {
  return arr.reduce(
    (all, cur) => all.concat(Array.isArray(cur) ? flatten(cur) : [cur]),
    []
  );
}

console.log(flatten([1, 2, [3, [4]]]));
