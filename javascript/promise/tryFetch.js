function tryFetch(promise, max = 3, count = 1) {
    return promise()
        .then((res) => {
            return res;
        })
        .catch((err) => {
            if (max > count) {
                return tryFetch(promise, max, ++count);
            }
            return Promise.reject(err);
        });
}

const getData = () => {
    return new Promise((resolve, reject) => {
        if (Math.random() > 0.5) {
            reject(Math.round(Math.random() * 1000));
        }
        resolve(Math.round(Math.random() * 1000));
    });
};

tryFetch(getData)
    .then((res) => {
        console.log("try", res);
    })
    .catch((res) => {
        console.error("err", res);
    });

async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
}
async function async2() {
    setTimeout(() => {
        console.log("timer");
    }, 0);
    console.log("async2");
}
async1();
console.log("start");
