/**
 * 给定数组 ['1a','2b','13c','5a']
 * 输出出现次数最多的字母前数字之和 6。输出：6
 * 字母最多是a, 1+5=6
 */

/**
 * 思路一
 * 先找出出现最多的次数的字母，记录下标，最后求和
 */

function sum(arr) {
  if (!arr.length) return;
  if (arr.length === 1) return Number(arr[0].replace(/[a-zA-Z]/g, ""));

  arr = arr
    .map((b) =>
      b.replace(/(\d+)([a-zA-Z]+)/, function ($0, $1, $2) {
        return $2 + $1;
      })
    )
    .sort();
  let sum = Number(arr[0].replace(/[a-zA-Z]/g, ""));
  let flag = arr[0].replace(/\d/g, "");
  let count = 1;
  let preCount = 0;
  let res = sum;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i].replace(/\d/g, "") === flag) {
      count++;
      sum += Number(arr[i].replace(/[a-zA-Z]/g, ""));
    } else {
      if (count > preCount) {
        preCount = count;
        res = sum;
      }
      count = 1;
      flag = arr[i].replace(/\d/g, "");
      sum = Number(arr[i].replace(/[a-zA-Z]/g, ""));
    }
  }

  return res;
}

console.log(sum(["1a", "2b", "13c", "5a"]));
console.log(sum(["1a", "2b", "13c", "2b", "5a", "2b", "2b", "1a", "1a"]));
