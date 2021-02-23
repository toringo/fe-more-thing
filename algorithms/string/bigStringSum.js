/**
 * 计算任意位数的两个正整数字符串之和。
 * 要点：整数相加按照加法运算的规则去实现即可
 */

function bigStringSum(str1, str2) {
  while (str1.length > str2.length) str2 = "0" + str2;
  while (str1.length < str2.length) str1 = "0" + str1;
  let res = "";
  let carry = 0;
  for (let i = str1.length - 1; i >= 0; i--) {
    const sum = +str1[i] + +str2[i] + carry;
    res = (sum % 10) + res;
    carry = sum > 9 ? 1 : 0;
  }

  return carry == 1 ? "1" + res : res;
}

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
console.log(bigStringSum2("999991", "9"));
console.timeEnd();
console.log(addStrings("999991", "9"));
