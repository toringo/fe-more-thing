---
title: 单例模式 - Singleton Pattern
date: 2021-02-19 23:03
---

### 单例模式

单例模式是一种特殊的创建性设计模式，一个类只能有一个实例。它的工作原理是：**如果单例类的实例不存在，则创建并返回一个新实例，但如果一个实例已经存在，则返回对现有实例的引用**。

#### 一个简单的单例模式

```js
const singleton = {
    add,
    sub,
}
```

以上通过字面量的方式创建一个实例对象 `singleton` ，用来封装一些方法， `singleton` 就是单例模式的体现。

#### 用函数构造单例模式

用属性缓存实例对象，如果存在即返回，不存在直接赋值返回。

```js
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
console.log(Singleton.getInstance("tori") === Singleton.getInstance("go")); //true
```

不足: 由于内部含有单例的操作和对象 `new` 的操作，不能使用 `new` 操作符，且不符合 "单一职责"原理。

**优化可以使用 `new` 版本:**

```js
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
s1.showName(); // tori
let s2 = new Singleton2("go");
s2.showName(); // go
console.log(s1 === s2); // true
```

**通用型单例模式代理版：目的将管理单例操作，与对象创建操作进行拆分，实现更小的粒度划分，符合“单一职责原则” ：**

```js
let CreateSingleton = (function() {
    let instance;

    function Singleton3(fn) {
        const FnConstructor = fn;
        const arg = [].slice.call(arguments, 1);
        // es6 new.target可以判断是new调用还是函数直接调用，es5 可以换成 this.constructor === fn
        instance = new.target ?
            instance instanceof FnConstructor ?
            instance :
            new FnConstructor(...arg) :
            instance || FnConstructor.apply(this, arg);

        return instance;
    }

    return Singleton3;
})();

function Singleton3(name) {
    this.name = name;
}
Singleton3.prototype.getName = function() {
    console.log(this.name);
};
function d1(name) {
    return name;
}
console.log(
    CreateSingleton(d1, "tori") === CreateSingleton(d1, "go"),
    CreateSingleton(d1, "go")
); // true tori

let s1 = new CreateSingleton(Singleton3, "tori");
let s2 = new CreateSingleton(Singleton3, "go");
console.log(s1 === s2); // true
```

#### 用ES6创建单例模式

在 `constructor` 实现。

```js
class SingletonClass {
    constructor(name) {
        if (!SingletonClass.instance) {
            this.name = this.name;

            return (SingletonClass.instance = this);
        }

        return SingletonClass.instance;
    }
}
console.log(new SingletonClass("tori") === new SingletonClass("go")); // true
```

**用ES6静态方法优化:**

```js
class Cat {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log(this.name);
    }
}
class SingletonClass2 {
    static getInstance(ClassFn) {
        if (!this.instance) {
            const arg = [].slice.call(arguments, 1);
            this.instance = new ClassFn(...arg);
        }

        return this.instance;
    }
}
const c1 = SingletonClass2.getInstance(Cat, "tori");
const c2 = SingletonClass2.getInstance(Cat, "go");
c2.say(); // tori
console.log(c1 === c2); // true
```

### 使用场景

#### 弹窗（登录框，提示框）

[登录框-Demo](https://github.com/toringo/fe-more-thing/design-patterns/SingletonPattern/example/modal.html)
[提示框-Demo](https://github.com/toringo/fe-more-thing/design-patterns/SingletonPattern/example/alert.html)
[React-单例组件](https://github.com/toringo/fe-more-thing/design-patterns/SingletonPattern/example/react-message.html)

> 惰性单例的意思是：**需要时才创建类实例对象**。也有称**懒汉式**和**饿汉式**，区别就是创建需要维护的单一实例的方式不同。

#### 管理模块

```js
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
```

#### 命名空间

```js
const nameSpace = (function () {
  let init = 12;
  function add() {}

  function sum() {}

  return {
    add,
    sum,
  };
})(); 
```

#### 其他一些场景

- vuex 和 redux 中的 store
- 数据库连接池的设计一般也是采用单例模式。mongoose (MongoDB 著名的 Node.js ODM 库)。它利用了单例模式。
在这个例子中，我们有一个数据库类，它是一个单例模式。首先，我们通过使用新运算符来调用 Database 类构造函数来创建一个对象 mongo。这一次实例化一个对象，因为没有对象已经存在。第二次，当我们创建 mysql 对象时，没有新的对象被实例化，而是返回前面实例化的对象的引用，即 mongo 对象。
- 多线程的线程池的也是案例模式。方便线程之间通信和控制。

总之，只要有数据资源共享和通信，一般会有单例模式的应用场景。
