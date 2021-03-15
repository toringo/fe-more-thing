/**
 * 质数定义：只能被1或者自身整除的自然数（不包括1），称为质数。
　　利用它的定义可以循环判断该数除以比它小的每个自然数（大于1），如果有能被它整除的，则它就不是质数。
	
	求n以内质数
 */

// 1. 根据质数的定义求
function prime(num, isPrimeFn) {
  let flag = false;
  const primeArr = [];
  for (let i = 2; i < num; i++) {
    flag = isPrimeFn(i);

    if (flag) {
      primeArr.push(i);
    }
  }

  return primeArr;
}

function isPrime(num) {
  let flag = true;
  if (num < 2) {
    throw new Error("输入不能小于2");
  }

  for (let i = 2; i < num - 1; i++) {
    if (num % i === 0) {
      flag = false;
      break;
    }
  }

  return flag;
}

// console.log(prime(233));

/**
 * 2. 利用一个定理——如果一个数是合数，那么它的最小质因数肯定小于等于他的平方根。
 * 合数是与质数相对应的自然数。一个大于1的自然数如果它不是合数，则它是质数。
 * 上面的定理是说，如果一个数能被它的最小质因数整除的话，那它肯定是合数，即不是质数。
 * 所以判断一个数是否是质数，只需判断它是否能被小于它开跟后后的所有数整除，这样做的运算就会少了很多，因此效率也高了很多。
 * */
function isPrime2(num) {
  let flag = true;
  if (num < 2) {
    throw new Error("输入不能小于2");
  }
  const max = Math.floor(Math.sqrt(num));
  // console.log("max", max);
  for (let i = 2; i <= max; i++) {
    if (num % i === 0) {
      flag = false;
      break;
    }
  }

  return flag;
}

// 3.筛法求质数，效率最高，但会比较浪费内存
/**
 *
 * 首先建立一个boolean类型的数组，用来存储你要判断某个范围内自然数中的质数，
 * 例如，你要输出小于200的质数，你需要建立一个大小为201（建立201个存储位置是为了让数组位置与其大小相同）的boolean数组，初始化为true。
 * 其次用第二种方法求的第一个质数（在此是2），然后将是2的倍数的数全置为false（2除外），
 * 即2、4、6、8……位置上置为false。然后是3的倍数的全置为false（3除外），一直到14（14是200的开平方），
 * 这样的话把不是质数的位置上置为false了，剩下的全是质数了，挑着是true的打印出来就行了。
 */
function prime3(num) {
  const primeArr = Array.from({ length: num + 1 }).fill(true);
  primeArr[1] = false;
  const sqrt = Math.floor(Math.sqrt(num));
  for (let i = 0; i <= sqrt; i++) {
    for (let j = i; j * i <= num; j++) {
      primeArr[i * j] = false;
    }
  }

  return primeArr.filter((prime, index) => prime && index + 1);
}

console.log(prime(233, isPrime2));
console.log(prime(233, isPrime));
console.log(prime3(233));
