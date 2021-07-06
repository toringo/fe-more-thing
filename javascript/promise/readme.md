### 几道题目

1. 使用 Promise 实现每隔 1 秒输出 1,2,3
2. 使用 Promise 实现红绿灯交替重复亮,红灯 3 秒亮一次，黄灯 2 秒亮一次，绿灯 1 秒亮一次；如何让三个灯不断交替重复亮灯？（用 Promise 实现）三个亮灯函数已经存在：

```js
function red() {
    console.log("red");
}
function green() {
    console.log("green");
}
function yellow() {
    console.log("yellow");
}
```

3. 实现 mergePromise 函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组 data 中。
4. 根据 promiseA+实现一个自己的 promise
5. 封装一个异步加载图片的方法
6. 限制异步操作的并发个数并尽可能快的完成全部
