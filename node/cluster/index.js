const express = require("express");
const port = 3000;
const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`CPU 数量是 ${totalCPUs}`);
  console.log(`正在运行 ${process.pid}`);

  // 分叉工作进程
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`销毁进程 ${worker.process.pid}`);
    console.log("分叉另一个工作进程！");
    cluster.fork();
  });
} else {
  const app = express();
  console.log(`启动进程 ${process.pid}`);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/api/:n", function (req, res) {
    let n = parseInt(req.params.n);
    let count = 0;

    if (n > 5000000000) n = 5000000000;

    for (let i = 0; i <= n; i++) {
      count += i;
    }

    res.send(`count 结果是 ${count}`);
  });

  app.listen(port, () => {
    console.log(`App 监听端口 ${port}`);
  });
}
