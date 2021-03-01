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

// @bookDecorator
// class Book {
//   status = "borrowed";
// }

// console.log(Book.decorator);

class Person {
  getPerson() {
    return this;
  }
}

let person = new Person();
let { getPerson } = person;

console.log(getPerson() === person); // false
