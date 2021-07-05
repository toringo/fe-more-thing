function multiRequest(urls, max) {
    const len = urls.length;
    const result = new Array(len).fill(false);
    let finishCount = 0;

    return new Promise((resolve, reject) => {
        // 请求maxNum个
        while (finishCount < max) {
            next();
        }

        function next() {
            console.log("next", finishCount);
            let current = finishCount++;

            if (current >= len) {
                !result.includes(false) && resolve(result);

                return;
            }

            const url = urls[current];
            fetch(url)
                .then((res) => {
                    result[current] = res;
                    console.log(`完成 ${current}`, new Date().toLocaleString());
                    if (current < len) {
                        next();
                    }
                })
                .catch((err) => {
                    // console.log(`完成 ${current}`, new Date().toLocaleString());
                    result[current] = err;
                    if (current < len) {
                        next();
                    }
                });
        }
    });
}

const urls = [
    "https://img.xjh.me/random_img.php",
    "https://img.xjh.me/random_img.php",
    "https://img.xjh.me/random_img.php",
    "https://img.xjh.me/random_img.php",
    "https://img.xjh.me/random_img.php",
    "https://img.xjh.me/random_img.php",
    "https://img.xjh.me/random_img.php",
    "https://img.xjh.me/random_img.php",
    "https://img.xjh.me/random_img.php",
    "https://img.xjh.me/random_img.php",
    "https://img.xjh.me/random_img.php",
    "https://img.xjh.me/random_img.php",
    "https://img.xjh.me/random_img.php",
];

console.log(multiRequest(urls, 2));
