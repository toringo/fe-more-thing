class Cat {
  say() {
    console.log("say");
  }
}

Cat.getInstance = (function () {
  let cat = null;

  return function () {
    if (!cat) {
      cat = new Cat();
    }

    return cat;
  };
})();

console.log("闭包", Cat.getInstance() === Cat.getInstance());

class GlobalCat {
  constructor() {
    if (!GlobalCat.instance) {
      GlobalCat.instance = new Cat();
    }

    return GlobalCat.instance;
  }
}
console.log("constructor", new GlobalCat() === new GlobalCat());

// es6模式优化后
class Singleton2 {
  constructor(name) {
    this.name = name;
  }
  static getInstance(name) {
    if (!this.instance) {
      this.instance = new Singleton2(name);
    }

    return this.instance;
  }
}

const s1 = Singleton2.getInstance("tori");
const s2 = Singleton2.getInstance("go");
console.log("static", s1 === s2);

// 通用性单例模式 函数写法
function CreateSingleton(fn) {
  let instance;

  return function () {
    return instance || (instance = fn.apply(this, arguments));
  };
}

function d1(name) {
  return name;
}
const sd1 = CreateSingleton(d1);
console.log("sd1", sd1("tori") === sd1("78"), sd1("tori"), sd1("78"));
