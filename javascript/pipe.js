/**
 * const square = v => v * v
const double = v => v * 2
const addOne = v => v + 1
const res = pipe(square, double, addOne)
console.log(res(3)) // 19; addOne(double(square(3)))
 */

function pipe(...args) {
  // const args = Array.prototype.slice.call(arguments);

  return function (n) {
    return args.reduce((pre, fn) => fn(pre), n);
  };
}

const square = (v) => v * v;
const double = (v) => v * 2;
const addOne = (v) => v + 1;
const res = pipe(square, double, addOne);
console.log(res(3)); // 19; addOne(double(square(3)))
