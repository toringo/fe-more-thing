Promise.prototype.race2 = function (arr) {
  if (!arr) throw new Error("参数不能为空");
  if (!Array.isArray(arr) && !Array.from(arr).length)
    throw new Error("参数必须是个数组");

  arr = Array.from(arr);

  return new Promise((resolve, reject) => {
    arr.forEach((promise, index) => {
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
};
