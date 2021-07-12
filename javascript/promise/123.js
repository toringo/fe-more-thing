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
