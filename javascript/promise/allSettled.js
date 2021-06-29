const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, "foo")
);
const promises = [promise1, promise2];
Promise.allSettled(promises).then((results) => console.log(results));

Promise.prototype.allSettled = function (arr) {
  if (!arr) throw new Error("参数不能为空");
  if (!Array.isArray(arr) && !Array.from(arr).length)
    throw new Error("参数必须是个数组");

  arr = Array.from(arr);

  const len = arr.length;
  const resolveArr = new Array(len);

  return new Promise((resolve, reject) => {
    for (let i = 0; i < len; i++) {
      Promise.resolve(arr[i])
        .then((value) => {
          resolveArr[i] = { status: "fulfilled", value };
          if (i === len - 1) {
            resolve(resolveArr);
          }
        })
        .catch((reason) => {
          resolveArr[i] = { status: "rejected", reason };
          if (i === len - 1) {
            resolve(resolveArr);
          }
        });
    }
  });
};
