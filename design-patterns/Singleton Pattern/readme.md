---
title: 单例模式 - Singleton Pattern
date: 2021-02-19 23:03
---

## 单例模式

单例模式是一种特殊的创建性设计模式，一个类只能有一个实例。它的工作原理是：**如果单例类的实例不存在，则创建并返回一个新实例，但如果一个实例已经存在，则返回对现有实例的引用**。

### 一个简单的单例模式
```js
const singleton = {
    add,
    sub,
}
```
以上通过字面量的方式创建一个实例对象 `singleton` ，用来封装一些方法， `singleton` 就是单例模式的体现。

### 用函数构造单例模式
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

**优化后:**
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


#### constructor

现实生活中一个完美的例子就是 mongoose (MongoDB 著名的 Node.js ODM 库)。它利用了单例模式。

在这个例子中，我们有一个数据库类，它是一个单例模式。首先，我们通过使用新运算符来调用 Database 类构造函数来创建一个对象 mongo。这一次实例化一个对象，因为没有对象已经存在。第二次，当我们创建 mysql 对象时，没有新的对象被实例化，而是返回前面实例化的对象的引用，即 mongo 对象。

```js
class Database {
  constructor(data) {
    if (Database.exists) {
      return Database.instance;
    }
    this._data = data;
    Database.instance = this;
    Database.exists = true;
    return this;
  }

  getData() {
    return this._data;
  }

  setData(data) {
    this._data = data;
  }
}

// usage
const mongo = new Database('mongo');
console.log(mongo.getData()); // mongo

const mysql = new Database('mysql');
console.log(mysql.getData()); // mongo
```

以上代码可用ES6静态方法优化。详见当前文件下index.js。

#### 闭包

```js
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
console.log(Cat.getInstance() === Cat.getInstance()); // true

function Singleton(name) {
    this.name = name
}

var proxySingle = (function(){
    var instance
    return function(name) {
        if(!instance) {
            instance = new Singleton(name)
        }
        return instance
    }
})()
```

### 通用惰性单例

可以用更为通用的方式统一解决单例模式。可以函数式变成思想书写`Singleton`方式。

```js
 function Singleton(fn) {
  let instance;
  return function() {
   return instance || (instance = fn.apply(this, arguments))
  }
 }
```

