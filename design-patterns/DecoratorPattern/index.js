"use strict";
function add(a, b) {
  return a + b;
}

function decoratorCount(fn) {
  let count = 0;

  return function reFn(...params) {
    console.log(`函数${fn.name}执行了${++count}次`);
    fn(...params);
  };
}
const addCount = new decoratorCount(add);
// addCount(1, 3);
// addCount(2, 3);
// addCount(3, 3);

class Eat {
  do() {
    console.log("开始吃饭了");
  }
}

class DecorateEat {
  constructor(decorator) {
    this.decorator = decorator;
  }
  washHands() {
    console.log("我洗完手了");
  }

  do() {
    this.washHands();

    this.decorator.do();
  }
}

const decorateEat = new DecorateEat(new Eat());
// decorateEat.do();

function bookDecorator(book) {
  book.decorator = "decorator";
  book.giveBack = function () {
    book.status = "borrow";
  };
}

@bookDecorator
class Book {
  status = "borrowed";
}

// console.log(Book.decorator);

// class Person {
//   getPerson() {
//     return this;
//   }
// }

// let person = new Person();
// let { getPerson } = person;

// console.log(getPerson() === person); // false

function log(target, name, descriptor) {
  const oldValue = descriptor.value;
  let count = 0;

  descriptor.value = function (...params) {
    console.log(`${name}: `, params, count++);

    return oldValue.apply(this, params);
  };
}

class Math {
  @log
  plus(a, b) {
    return a + b;
  }
}

const math = new Math();
// console.log(math.plus(2, 3));
// console.log(math.plus(2, 3));
// console.log(math.plus(2, 3));
// console.log(math.plus(2, 3));

// decorator 外部可以包装一个函数，函数可以带参数
function Decorator(type) {
  /**
   * 装饰器函数
   * @param {Object} target 被装饰器的类的原型
   * @param {string} name 被装饰的类、属性、方法的名字
   * @param {Object} descriptor 被装饰的类、属性、方法的descriptor
   */
  return (target, name, descriptor) => {
    // 以此可以获取实例化的时候此属性的默认值
    let v = descriptor.initializer && descriptor.initializer.call(this);

    // 返回一个新的描述对象作为被修饰对象的descriptor，或者直接修改 descriptor 也可以
    return {
      enumerable: true,
      configurable: true,
      get() {
        return v + type;
      },
      set(c) {
        v = c;
      },
    };
  };
}

// USE
// class Fudao {
//   @Decorator("string")
//   title = "企鹅辅导";
// }

// console.log(new Fudao().title);

function autobind(target, name, descriptor) {
  const fn = descriptor.value;

  return {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    get() {
      const newFn = fn.bind(this);

      Object.defineProperty(this, name, {
        configurable: true,
        writable: true,
        enumerable: false,
        value: newFn,
      });

      return newFn;
    },
  };
}

function readonly(target, name, descriptor) {
  descriptor.writable = false;

  return descriptor;
}
// readonly(Person.prototype, 'name', descriptor);
// 类似于
// Object.defineProperty(Person.prototype, 'name', descriptor);

class Person {
  // @autobind
  getPerson() {
    return this;
  }
  @readonly
  title = "readonly";
}
let person = new Person();
let getPerson = person.getPerson;
// person.title = "person";

// console.log(getPerson() === person);

// ES6类装饰器
function newSay(target) {
  console.log("newsay");
  target.sayHi = function () {
    this.say = "oh my zsh";
  };

  return target;
}
@newSay
class Say {
  text() {
    console.log(this.say);
  }
}

const s = new Say();
Say.sayHi();
console.log(s.text());
