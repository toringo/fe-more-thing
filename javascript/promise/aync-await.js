// 在不使用async/await的情况下，顺序执行一组异步代码函数，并输出最后的结果。

const funca = (c) => Promise.resolve(1 + c),
	funcb = (c) =>
		new Promise((resolve) => {
			setTimeout(() => {
				resolve(2 + c);
			}, 3000);
		}),
	funcc = (c) => Promise.resolve(3 + c),
	funcd = (c) => Promise.resolve(4 + c);

function transformData(params) {
	return composeAsync(funca, funcb, funcc, funcd)(params);
}

function composeAsync(...dd) {
	return (x) => dd.reduce(applyAsync, Promise.resolve(x));
}

function applyAsync(acc, cur) {
	console.log("applyAsync", acc, cur);
	return acc.then(cur);
}

// transformData(0)
//   .then((result) => console.log(result, "last result"))
//   .catch((e) => console.log(e));

// 同时至多加载三张图片，且按照顺序加载；
async function concurrentAsync(arr, max, cb) {
	const executing = [];
	const ret = [];
	for (const item of arr) {
		const p = Promise.resolve().then(() => cb(item, arr.indexOf(item)));
		ret.push(p);
		if (max <= arr.length) {
			// 当任务完成后，从正在执行的任务数组中移除已完成的任务
			const e = p.then(() => executing.splice(executing.indexOf(e), 1));
			executing.push(e); // 保存正在执行的异步任务
			if (executing.length >= max) {
				console.log("race", executing.length, arr.indexOf(item));
				await Promise.race(executing); // 等待较快的任务执行完成
			}
		}
	}

	return Promise.all(ret);
}

const baseUrl = "http://img.aizhifou.cn/";
const urls = [
	"1.png",
	"2.png",
	"3.png",
	"4.png",
	"5.png",
	"6.png",
	"7.png",
	"8.png",
	"9.png",
	"10.png",
];
const loadImg = function (url, i) {
	return new Promise((resolve, reject) => {
		try {
			// 加载一张图片
			let image = new Image();
			image.onload = function () {
				console.log("url, i", url, i);
				resolve(i);
			};
			image.onerror = function () {
				reject(i);
			};
			image.src = baseUrl + url;
		} catch (e) {
			reject(i);
		}
	});
};

concurrentAsync(urls, 3, loadImg);
