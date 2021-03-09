function binarySearch(arr, target) {
  let mid;
  let low = 0;
  let high = arr.length - 1;

  while (high >= low) {
    mid = Math.floor(low + (high - low) / 2);
    if (arr[mid] === target) {
      return mid;
    }
    if (arr[mid] > target) {
      high = mid - 1;
    }
    if (arr[mid] < target) {
      low = mid + 1;
    }
  }

  return -1;
}

function binarySearch2(arr, tar, low, high) {
  if (low > high) return -1;

  const mid = Math.floor(low + (high - low) / 2);
  if (arr[mid] === tar) {
    return mid;
  }
  if (arr[mid] > tar) {
    return binarySearch2(arr, tar, low, mid - 1);
  }

  if (arr[mid] < tar) {
    return binarySearch2(arr, tar, mid + 1, high);
  }
}

function search(arr, tar) {
  let i = 0;
  let j = arr.length - 1;
  while (j >= i) {
    if (arr[i] === tar) return i;
    if (arr[j] === tar) return j;
    i++;
    j--;
  }

  return -1;
}

const arr = [];
const tar = 10;
console.log(
  binarySearch(arr, tar),
  search(arr, tar),
  binarySearch2(arr, tar, 0, arr.length - 1)
);
