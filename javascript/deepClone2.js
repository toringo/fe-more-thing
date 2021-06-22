function deepClone(origin, target) {
  //origin:要被拷贝的对象
  var target = target || {};
  for (var prop in origin) {
    if (origin.hasOwnProperty(prop)) {
      if (typeof origin[prop] === "object") {
        //对象
        if (Object.prototype.toString.call(origin[prop]) == "[object Array]") {
          //数组
          target[prop] = [];
          deepClone(origin[prop], target[prop]);
        } else if (
          Object.prototype.toString.call(origin[prop]) == "[object Object]"
        ) {
          //普通对象
          target[prop] = {};
          deepClone(origin[prop], target[prop]);
        } else {
          //null
          target[prop] = null;
        }
      } else if (typeof origin[prop] === "function") {
        //函数
        var _copyFn = function (fn) {
          var result = new Function("return " + fn)();
          for (var i in fn) {
            result[i] = fn[i];
          }
          return result;
        };
        target[prop] = _copyFn(origin[prop]);
      } else if (typeof origin[prop] === "symbol") {
        //里面的symbol
        target[prop] = _copySymbol(origin[prop]);
      } else {
        //除了object、function、symbol，剩下都是直接赋值的原始值number,string,boolean,undefined
        target[prop] = origin[prop];
      }
    }
  }
  function _copySymbol(val) {
    var str = val.toString();
    var tempArr = str.split("(");
    var arr = tempArr[1].split(")")[0];
    return Symbol(arr);
  }
  //通过getOwnPropertySymbols找出来的symbol
  var _symArr = Object.getOwnPropertySymbols(origin);
  if (_symArr.length) {
    //查找成功
    _symArr.forEach((symKey) => {
      target[symKey] = origin[symKey];
    });
  }
  return target;
}

var student = {
  name: "alice",
  age: 12,
  isOldPerson: false,
  sex: undefined,
  money: null,
  grader: [
    {
      English: 120,
      math: 80,
    },
    100,
  ],
  study: function () {
    console.log("I am a student,I hava to study every day!");
  },
  key: Symbol("s1-key"),
  book: {
    English: true,
  },
};
var a = Symbol("a");
var b = Symbol.for("b");
// student[a] = "1111111111111";
// student[b] = "222222222222222";
var res = deepClone(student);
// console.log(res);

/**
 * ========================== 以下深拷贝比较完善 ==================
 */

// 记录对象是否循环引用
const visitedMap = new Map();

function deepClone2(obj, tar) {
  const target = tar || {};
  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      const cur = obj[i];
      const type = typeof cur;
      if (type === "object") {
        if (visitedMap.get(cur)) return visitedMap.get(cur);

        const objType = Object.prototype.toString.call(cur);
        if (objType === "[object Object]") {
          target[i] = deepClone2(cur, {});
        } else if (objType === "[object Array]") {
          target[i] = deepClone2(cur, []);
        } else {
          target[i] = null;
        }
        visitedMap.set(cur, target);
      } else if (type === "function") {
        const copyFn = (fn) => {
          const newFn = new Function("return " + fn)();
          for (const fn_ in fn) {
            newFn[fn_] = fn[fn_];
          }
          return newFn;
        };
        target[i] = copyFn(cur);
      } else if (type === "symbol") {
        target[i] = _copySymbol(cur);
      } else {
        target[i] = cur;
      }
    }
  }

  function _copySymbol(sym) {
    const str = sym.toString();
    const val = str.split("(")[1].split(")")[0];

    return Symbol(val);
  }

  return target;
}
const parent = {
  a: 12,
  b: {
    c: "6789",
    d: [{ aa: 34 }, 78],
    f: function () {
      console.log("f");
    },
  },
  [a]: Symbol("sym"),
};
parent.parent = parent;

const res2 = deepClone2(parent);
res2.b.d[0].aa = 7890;

const res3 = res2;
console.log({
  "res2[a] === parent[a]": res2[a] === parent[a],
  "res3[a] === res2[a]": res3[a] === res2[a],
  "res3.parent === res2.parent": res3.parent === res2.parent,
  "parent.parent===res2.parent": parent.parent === res2.parent,
  "res2.parent": res2.parent,
});
