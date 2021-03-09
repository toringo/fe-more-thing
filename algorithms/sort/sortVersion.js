// versions是一个项目的版本号列表，因多人维护，不规则， 要求从小到大排序，注意'1.45'比'1.5'大
var versions = ["1.45.0", "1.5", "6", "3.3.3.3.3.3.3"];
// var sorted = ["1.5", "1.45.0", "3.3.3.3.3.3", "6"];

function sortedVersion(arr) {
  arr = arr.map((item) => item.split("."));

  return arr
    .sort((a, b) => {
      const length = Math.max(a.length, b.length);
      for (let i = 0; i < length; i++) {
        const x = Number(a[i] || 0);
        const y = Number(b[i] || 0);

        if (x - y !== 0) return x - y;
      }
    })
    .map((i) => i.join("."));
}

console.log(sortedVersion(versions));
