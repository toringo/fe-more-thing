// 先定义三个常量表示状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
    status = PENDING;
    // executor 是一个执行器，进入会立即执行
    constructor(executor) {
        try {
            executor(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
    }
    // resolve和reject为什么要用箭头函数？
    // 如果直接调用的话，普通函数this指向的是window或者undefined
    // 用箭头函数就可以让this指向当前实例对象
    // 成功之后的值
    value = null;
    // 失败之后的原因
    reason = null;

    // onFulfilledCallback = null;
    // onRejectedCallback = null;
    onFulfilledCallbackArr = [];
    onRejectedCallbackArr = [];

    resolve = (value) => {
        if (this.status === PENDING) {
            this.status = FULFILLED;
            this.value = value;
            // this.onFulfilledCallback && this.onFulfilledCallback(value);
            while (this.onFulfilledCallbackArr.length) {
                this.onFulfilledCallbackArr.shift()(value);
            }
        }
    };
    reject = (reason) => {
        if (this.status === PENDING) {
            this.status = REJECTED;
            this.reason = reason;
            // this.onRejectedCallback && this.onRejectedCallback(reason);
            while (this.onRejectedCallbackArr.length) {
                this.onRejectedCallbackArr.shift()(reason);
            }
        }
    };

    then(onFulfilled, onRejected) {
        // if (this.status === FULFILLED) {
        //     onFulfilled(this.value);
        // } else if (this.status === REJECTED) {
        //     onRejected(this.reason);
        // } else if (this.status === PENDING) {
        //     // ==== 新增 ====
        //     // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
        //     // 等到执行成功失败函数的时候再传递
        //     // this.onFulfilledCallback = onFulfilled;
        //     // this.onRejectedCallback = onRejected;
        //     onFulfilled =
        //         typeof onFulfilled === "function"
        //             ? onFulfilled
        //             : (value) => value;
        //     onRejected =
        //         typeof onRejected === "function"
        //             ? onRejected
        //             : (reason) => {
        //                   throw reason;
        //               };

        //     this.onFulfilledCallbackArr.push(onFulfilled);
        //     this.onRejectedCallbackArr.push(onRejected);
        // }
        const promiseThen = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                const x = onFulfilled(this.value);
                // 传入 resolvePromise 集中处理
                resolvePromise(x, resolve, reject);
            } else if (this.status === REJECTED) {
                onRejected(this.reason);
            } else if (this.status === PENDING) {
                onFulfilled =
                    typeof onFulfilled === "function"
                        ? onFulfilled
                        : (value) => value;
                onRejected =
                    typeof onRejected === "function"
                        ? onRejected
                        : (reason) => {
                              throw reason;
                          };
                this.onFulfilledCallbackArr.push(onFulfilled);
                this.onRejectedCallbackArr.push(onRejected);
            }
        });

        return promiseThen;
    }
}

function resolvePromise(x, resolve, reject) {
    // 判断x是不是 MyPromise 实例对象
    if (x instanceof MyPromise) {
        // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
        // x.then(value => resolve(value), reason => reject(reason))
        // 简化之后
        x.then(resolve, reject);
    } else {
        // 普通值
        resolve(x);
    }
}

const promise = new MyPromise((resolve, reject) => {
    // reject("error");
    // resolve(1000);
    setTimeout(() => {
        // resolve(1000);
        reject("error");
    }, 1000);
});
// promise.then((value) => {
//     console.log(1);
//     console.log("resolve", value);
// });

// promise.then((value) => {
//     console.log(2);
//     console.log("resolve", value);
// });

// promise.then((value) => {
//     console.log(3);
//     console.log("resolve", value);
// });
promise
    .then((value) => {
        console.log(1);
        console.log("resolve", value);
        return other();
    })
    .then((value) => {
        console.log(2);
        console.log("resolve", value);
    });
