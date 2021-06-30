Promise.any2 = function (arr) {
  if (!arr) throw new Error("参数不能为空");
  if (!Array.isArray(arr) && !Array.from(arr).length)
    throw new Error("参数必须是个可迭代对象");

  arr = Array.from(arr);
  let len = arr.length;
  let count = 0;

  return new Promise((resolve, reject) => {
    for (let i = 0; i < len; i++) {
      arr[i]
        .then((res) => resolve(res))
        .catch((err) => {
          count++;
          if (count === len) {
            reject(
              new AggregateError([new Error(err)], "All promises were rejected")
            );
          }
        });
    }
  });
};

const pErr = new Promise((resolve, reject) => {
  reject("总是失败");
});

const pSlow = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "最终完成");
});

const pFast = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "很快完成");
});

Promise.any2([pErr])
  .then((value) => {
    console.log(value);
  })
  .catch((err) => {
    console.log(err);
  });

// Promise.any([pErr])
//   .then((value) => {
//     console.log(value);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
