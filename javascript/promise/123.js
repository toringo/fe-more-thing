function setTimeout123(arr) {
    return arr.reduce((prePromise, cur) => {
        return prePromise.then(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log(cur);
                    resolve(cur);
                }, 1000);
            });
        });
    }, Promise.resolve());
}

// setTimeout123([1, 2, 3]);
const arr = [1, 2, 3];
arr.reduce(
    (p, x) =>
        p.then(
            () => new Promise((r) => setTimeout(() => r(console.log(x)), 1000))
        ),
    Promise.resolve()
);
