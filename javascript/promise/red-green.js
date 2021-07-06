// 使用 Promise 实现红绿灯交替重复亮,红灯 3 秒亮一次，黄灯 2 秒亮一次，绿灯 1 秒亮一次；如何让三个灯不断交替重复亮灯？（用 Promise 实现）三个亮灯函数已经存在：

function red() {
    console.log("red");
}
function green() {
    console.log("green");
}
function yellow() {
    console.log("yellow");
}

function redGreen() {
    return light(3000, red)
        .then((res) => light(2000, green))
        .then((res) => light(1000, yellow))
        .then(redGreen);
}

function light(timeout, cb) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(cb());
        }, timeout);
    });
}

redGreen();
