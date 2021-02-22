// ========= 命名空间 =====
const nameSpace = (function () {
  let init = 12;
  function add() {}

  function sum() {}

  return {
    add,
    sum,
  };
})();

// ======== 模块管理 ========
const allModule = (function () {
  //ajax模块
  const ajax = {
    get: function (api, obj) {
      console.log("ajax get调用");
    },
    post: function (api, obj) {},
  };

  //dom模块
  const dom = {
    get: function () {},
    create: function () {},
  };

  //event模块
  const event = {
    add: function () {},
    remove: function () {},
  };

  return {
    dom,
    ajax,
    event,
  };
})();

// ======== 简单版本实现单例模式 ========
function Singleton(name) {
  this.name = name;
}
Singleton.getInstance = function () {
  if (!this.instance) {
    this.instance = new Singleton(...arguments);
  } else {
    this.apply(this.instance, arguments);
  }

  return this.instance;
};
Singleton.prototype.getName = function () {
  console.log(this.name);
};

// let a = Singleton.getInstance("tori");
// a.getName(); //tori
// let b = Singleton.getInstance("go");
// b.getName(); //go
// console.log(a === b); //true

// ======= 用 IIFE 优化实现单例模式
const Singleton2 = (function () {
  let instance;
  function Singleton2() {
    instance =
      instance ||
      (this instanceof Singleton2 ? this : new Singleton2(...arguments));
    instance.init(...arguments);

    return instance;
  }

  Singleton2.prototype.init = function (name) {
    this.name = name;
  };

  return Singleton2;
})();

Singleton2.prototype.showName = function () {
  console.log(this.name);
};

let s1 = new Singleton2("tori");
s1.showName();
let s2 = new Singleton2("go");
s2.showName();
console.log(s1 === s2); // true

// class Cat {
//   say() {
//     console.log("say");
//   }
// }

// Cat.getInstance = (function () {
//   let cat = null;

//   return function () {
//     if (!cat) {
//       cat = new Cat();
//     }

//     return cat;
//   };
// })();

// console.log("闭包", Cat.getInstance() === Cat.getInstance());

// class GlobalCat {
//   constructor() {
//     if (!GlobalCat.instance) {
//       GlobalCat.instance = new Cat();
//     }

//     return GlobalCat.instance;
//   }
// }
// console.log("constructor", new GlobalCat() === new GlobalCat());

// // es6模式优化后
// class Singleton2 {
//   constructor(name) {
//     this.name = name;
//   }
//   static getInstance(name) {
//     if (!this.instance) {
//       this.instance = new Singleton2(name);
//     }

//     return this.instance;
//   }
// }

// const s1 = Singleton2.getInstance("tori");
// const s2 = Singleton2.getInstance("go");
// console.log("static", s1.name, s2.name, s1 === s2);

// // 通用性单例模式 函数写法
// function CreateSingleton(fn) {
//   let instance;

//   return function () {
//     return instance || (instance = fn.apply(this, arguments));
//   };
// }

// function d1(name) {
//   return name;
// }
// const sd1 = CreateSingleton(d1);
// console.log("sd1", sd1("tori") === sd1("78"), sd1("tori"), sd1("78"));

// let Alert = (function () {
//   let instance;
//   function Alert(content) {
//     if (!instance) {
//       instance = this;
//     }
//     instance.init(content);
//     return instance;
//   }
//   Alert.prototype.init = function (content) {
//     this.content = content;
//   };
//   return Alert;
// })();
// Alert.prototype.showContent = function () {
//   console.log(this.content);
// };
// let a = new Alert("this is a");
// a.showContent(); //this is a
// let b = new Alert("this is b");
// b.showContent(); //this is b
// console.log(a === b); //true
