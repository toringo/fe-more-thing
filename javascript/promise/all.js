function err() {
  console.log("111");
  new Error("err");
  console.log("2222");
}

err();

Promise.prototype.all2 = function (promises) {
  if (!promises) throw new Error("参数不能为空");
  if (!Array.isArray(promises)) throw new Error("参数必须是个数组");

  const resolves = Array.from({ length: len });
  let resolvedNum = 0;

  return new Promise(function (resolve, reject) {
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i])
        .then((value) => {
          resolves[i] = value;
          if (++resolvedNum === len) {
            resolve(resolves);
          }
        })
        .catch(reject);
    }
  });
};

const promise1 = Promise.reject(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

// Promise.all2([promise1, promise2, promise3]).then((values) => {
//   console.log(values);
// });
