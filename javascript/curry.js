function createCurry() {
  const fn = Array.prototype.slice.call(arguments, 0, 1)[0];
  let args = Array.prototype.slice.call(arguments, 1);
  console.log(fn, args);

  return function () {
    const cbArgs = Array.prototype.slice.apply(arguments);
    args = args.concat(cbArgs);
    if (args.length < fn.length) {
      return createCurry.apply(this, [fn].concat(args));
    }

    return fn.apply(this, args);
  };
}

function add(a, b) {
  console.log("add", a, b);
  return a + b;
}

const addCurry = createCurry(add);
console.log(addCurry(2)(3));
