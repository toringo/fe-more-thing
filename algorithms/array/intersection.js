/**
 * 两个数组的交集(350)
 * 输入: nums1 = [1,2,2,1], nums2 = [2,2]   输出: [2,2]
 * 输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]  输出: [4,9]
 */

function intersection(arr1, arr2) {
  let bigArr, shortArr;
  if (arr1.length > arr2.length) {
    bigArr = arr1;
    shortArr = arr2;
  } else {
    shortArr = arr1;
    bigArr = arr2;
  }
  const ret = [];
  let i = shortArr.length;
  while (i--) {
    if (bigArr.includes(shortArr[i])) {
      ret.push(shortArr[i]);
    }
  }

  return ret;
}
console.time();
console.log("普通遍历", intersection([1, 2, 2, 1], [2, 2]));
console.timeEnd();

function intersection2(arr1, arr2) {
  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);

  let i = 0;
  let j = 0;
  const ret = [];

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] === arr2[j]) {
      ret.push(arr1[i]);
      i++;
      j++;
    } else if (arr1[i] > arr2[j]) {
      j++;
    } else {
      i++;
    }
  }

  return ret;
}
console.time();
console.log("sort 双指针", intersection2([1, 2, 2, 1], [2, 2]));
console.timeEnd();
