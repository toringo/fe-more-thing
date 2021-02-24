/**
 * 计算任意位数的两个正整数字符串之和。
 * 要点：整数相加按照加法运算的规则去实现即可
 */

/**
 * 补位法
 * 将s1和s2的长度用0补齐到一样
 * 遍历相加
 * 时间复杂度O(n)，n是较长的数字字符串的长度，空间复杂度 O(1)。
 */
function bigStringSum(s1, s2) {
  while (s1.length > s2.length) s2 = "0" + s2;
  while (s1.length < s2.length) s1 = "0" + s1;
  // let res = "";
  const res = [];
  let carry = 0;
  let i = s1.length - 1;
  while (i >= 0) {
    const cur = +s1[i] + +s2[i] + carry;

    res.push(cur % 10);
    carry = Math.floor(cur / 10);
    i--;
  }

  // return carry ? "1" + res : res;
  return carry ? "1" + res.reverse().join("") : res.reverse().join("");
}

// console.log(bigStringSum("01", "9"));

var addStrings = function (num1, num2) {
  let i = num1.length - 1,
    j = num2.length - 1,
    add = 0;
  const ans = [];
  while (i >= 0 || j >= 0 || add != 0) {
    const x = i >= 0 ? num1.charAt(i) - "0" : 0;
    const y = j >= 0 ? num2.charAt(j) - "0" : 0;
    const result = x + y + add;
    ans.push(result % 10);
    add = Math.floor(result / 10);
    i -= 1;
    j -= 1;
  }
  return ans.reverse().join("");
};

function bigStringSum2(str1, str2) {
  function add(s1, s2) {
    let carry = 0;
    let ret = [];
    while (s1.length && s2.length) {
      const cur = Number(s1.pop()) + Number(s2.pop()) + carry;
      ret.push(cur % 10);
      carry = Math.floor(cur / 10);
    }
    const resReverse = ret.reverse();

    if (carry) {
      return s1.length
        ? add(s1, [carry]).concat(resReverse)
        : add(s2, [carry]).concat(resReverse);
    }

    return s1.length ? s1.concat(resReverse) : s2.concat(resReverse);
  }

  return add(str1.split(""), str2.split("")).join("");
}
console.time();
console.log(bigStringSum("999991", "9"));
console.timeEnd();
console.log(addStrings("999991", "9"));
