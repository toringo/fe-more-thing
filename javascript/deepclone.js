// 基础考虑数组版本
function deepClone(target) {
  if (typeof target === "object") {
    let cloneTarget = {};
    if (
      Object.prototype.toString.call(target).slice(-14) === "[object Array]"
    ) {
      cloneTarget = [];
    }

    for (let item in target) {
      cloneTarget[item] = deepClone(target[item]);
    }

    return cloneTarget;
  } else {
    return target;
  }
}

const res = {
  a: [1, 2, 3],
  b: {
    c: 23,
    d: function () {},
  },
  c: undefined,
  s: Symbol("89"),
};

// const res2 = deepClone(res);
// res2.b.d = 34;
// console.log(res, res2);

res.res = res;

function deepClone2(tar, map = new Map()) {
  if (isObject(tar)) {
    const temp = map.get(tar);
    if (temp) return temp;

    let ret = {};
    if (Object.prototype.toString.call(tar) === "[object Array]") {
      ret = [];
    }

    map.set(tar, ret);
    for (let item in tar) {
      ret[item] = deepClone2(tar[item], map);
    }

    return ret;
  } else {
    return tar;
  }
}

const s = deepClone2(res);
console.log(s.s === res.s);

function isObject(tar) {
  const type = typeof tar;

  return tar !== null && (type === "object" || type === "function");
}

function cloneSymbol(tar) {
  return Object(Symbol.prototype.valueOf.call(tar));
}
