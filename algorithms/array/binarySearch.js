/**
 * 参考链接
 * https://segmentfault.com/a/1190000016825704
 */

// 二分查找 前提条件排序数组
// 时间复杂度：O(logN)。
// 空间复杂度：O(1)。

function binarySearch(arr, tar) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (arr[mid] === tar) {
      return mid;
    }
    if (arr[mid] < tar) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

// 递归
function binarySearchRecursive(arr, tar, left, right) {
  if (left > right) return -1;

  const mid = left + Math.floor((right - left) / 2);
  if (tar === arr[mid]) {
    return mid;
  }

  if (arr[mid] > tar) {
    return binarySearchRecursive(arr, tar, left, mid - 1);
  }
  if (arr[mid] < tar) {
    return binarySearchRecursive(arr, tar, mid + 1, right);
  }
}

/**
 * 二分查找左边界查找  「数组有序，但包含重复元素」 「数组部分有序，且不包含重复元素」
 * 循环后，无论怎样，left,mid,right都会指向同一个位置，
 * 而如果这个位置的值等于目标值，则它就一定是最左侧的目标值；
 * 如果不等于目标值，则说明没有找到目标值，
 * 这也就是为什么返回值是nums[left] == target ? left : -1。
 *  */
function binarySearchLeft(arr, tar) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (arr[mid] < tar) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return arr[left] === tar ? left : -1;
}
console.log(binarySearchLeft([1, 2, 3, 1, 1, 3, 5, 5], 5));

/**
 * 二分查找左边界查找2  「数组部分有序且包含重复元素的情况」
 * 向左收缩的时候，不能简单的令 right = mid，
 * 因为有重复元素的存在，这会导致我们有可能遗漏掉一部分区域，
 * 此时向左收缩只能采用比较保守的方式
 *  */
function binarySearchLeft2(arr, tar) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (arr[mid] < tar) {
      left = mid + 1;
    } else if (arr[mid] > tar) {
      right = mid;
    } else {
      right--;
    }
  }

  return arr[left] === tar ? left : -1;
}
console.log(binarySearchLeft2([1, 2, 3, 1, 1, 3, 5, 5], 5));

/**
 * 二分查找 部分有序 没有连续重复值 查找最小左边界
 */
function binarySearchMin(arr) {
  if (arr.length == 1) return arr[0];
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] > arr[arr.length - 1]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return arr[left];
}
console.log(binarySearchMin([4, 5, 6, 7, 1, 2, 3]));

/**
 * 二分查找 部分有序 有连续重复值 查找最小左边界
 */
function binarySearchMin2(arr) {
  if (arr.length == 1) return arr[0];
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const mid = left + ((right - left) >> 1);
    if (arr[mid] > arr[right]) {
      // mid 位于旋转点左侧
      left = mid + 1;
    } else if (arr[mid] < arr[right]) {
      // mid 位于旋转点右侧
      right = mid;
    } else {
      // 注意相等的时候的特殊处理，因为要向左查找左边界，所以直接收缩右边界
      right--;
    }
  }
  return arr[left];
}
console.log(binarySearchMin2([4, 4, 4, 4, 4, 1, 2, 3]));

// const arr = [1, 2, 3,4,5,6];

// console.log(binarySearch(arr, 5));
// console.log(binarySearchLeft(arr, 5));
// console.log(binarySearchRecursive(arr, 5, 0, arr.length - 1));
