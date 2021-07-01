function ajax(promise, timeout) {
  const simulationPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("请求已取消");
    }, timeout);
  });

  return Promise.race([promise, simulationPromise]);
}

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 3000);
});

ajax(p1, 1000).then((res) => {
  console.log("res", res);
});
