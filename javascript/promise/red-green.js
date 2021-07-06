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
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(red());
		}, 3000);
	})
		.then((res) => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(green());
				}, 2000);
			});
		})
		.then((res) => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(yellow());
					redGreen();
				}, 1000);
			});
		});
}

redGreen();
