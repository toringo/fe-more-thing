// 实现 mergePromise 函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组 data 中。
function mergePromise(...arr) {
	const all = arr.reduce((all, arr) => [...all, ...arr], []);
	const data = Promise.allSettled(all);

	return data;
}

function fetchImage(url) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = url;
		img.onload = function (e) {
			resolve(e);
		};
		img.onerror = function (err) {
			reject(err);
		};
	});
}
