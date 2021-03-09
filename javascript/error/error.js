try {
  const d = 23;
  d = 212;
} catch (error) {
  // console.log("error", error);
}

window.addEventListener("unhandledrejection", function (e) {
  e.preventDefault();
  console.log("捕获到 promise 错误了");
  console.log("错误的原因是", e.reason);
  console.log("Promise 对象是", e.promise);
  return true;
});

Promise.reject("promise error");
new Promise((resolve, reject) => {
  reject("promise error");
});
new Promise((resolve) => {
  resolve();
}).then(() => {
  throw "promise error";
});
