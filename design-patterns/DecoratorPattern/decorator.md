---
title: 装饰器模式 - Decorator Pattern
date: 2021-02-25 06:47
---

### 1. 装饰器模式
装饰器属于结构性模式，允许你通过将对象放入包含行为的封装对象中来为原对象增加新的行为。要点如下:
- 为对象添加新功能
- 不改变其原有的结构和功能

**装饰器的构成:**
- 抽象组件(Component): 定义可以动态添加任务的对象的接口，是封装和被封装对象的公共接口。
- 具体组件(ConcreteComponent)：定义一个要被装饰器装饰的对象，即 Component 的具体实现
- 抽象装饰器(Decorator): 维护对组件对象和其子类组件的引用
- 具体装饰器(ConcreteDecorator)：向组件添加新的职责(额外行为)，具体装饰器会重写装饰器的基类的方法， 并在调用父类方法之前或之后进行额外的行为。
![](./_image/2021-02-25/2021-03-01-23-38-52.jpg)

由于 `JavaScript` 没有对抽象接口对象定义的写法。所以在 `js` 中只需要提供 **被装饰者** 和 **装饰器**，也就是上述的具体组件和具体装饰器。

#### #一个小例子
假如你要统计一个函数被调用的次数，定义一个装饰器如下:
```js
// 基础要被装饰的对象
function add(a, b) {
  return a + b;
}

function decoratorCount(fn) {
  let count = 0;
  // 重写fn函数
  return function reFn(...params) {
    console.log(`函数${fn.name}执行了${++count}次`);
    fn(...params);
  };
}
const addCount = new decoratorCount(add);
addCount(1, 3);
addCount(2, 3);
addCount(3, 3);
```
上述栗子也符合**装饰器会重写被装饰对象存在的方法**。

#### #用es6 class写一个装饰器模式
假如你要吃饭了，但是吃饭前你妈规定你必须洗完手才能吃饭。这个场景就是装饰器重写洗手这个操作。
```js
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
    console.log("开始干饭了");
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
decorateEat.do();
```
当然对于拥有原型链的 `js` 还有很多方法来写重写函数的装饰器，譬如重写被装饰者的原型，当然这不太符合 **不改变其原有的结构和功能** 的特点，需要注意。


#### #ES7 中的 JavaScript 装饰器(decorator)
`ES7` 规范中定义了一种类似于 `java` 注解的语法糖来实现装饰器模式。`decorator` 是依赖于 `ES5` 的 `Object.defineProperty`，是一种类似 `class` 的语法糖。具体用法见[阮老师教程](https://es6.ruanyifeng.com/#docs/decorator)。
装饰器分为5种:
- 类装饰器
- 属性装饰器
- 方法装饰器
- 访问器装饰器
- 参数装饰器
```js
// 类装饰器
@classDecorator
class Bird {

  // 属性装饰器
  @propertyDecorator
  name: string;
  
  // 方法装饰器
  @methodDecorator
  fly(
    // 参数装饰器
    @parameterDecorator
      meters: number
  ) {}
  
  // 访问器装饰器
  @accessorDecorator
  get egg() {}
}
```

##### 1). 类装饰
```js
function bookDecorator(book) {
  console.log("bookDecorator");
  book.status = "borrow";
}

@bookDecorator
class Book {
  status = "borrowed";
}
console.log(Book.status);
```
代码输出，`bookDecorator` 和 `borrow`。可以看出，类装饰器在解释的时候就已经执行了，且装只在解释执行时应用一次。

看babel转义后的代码:
```js
var _class, _temp;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function bookDecorator(book) {
  console.log("bookDecorator");
  book.status = "borrow";
}

let Book =
  bookDecorator(
    (_class =
      ((_temp = class Book {
        constructor() {
          _defineProperty(this, "status", "borrowed");
        }
      }),
      _temp))
  ) || _class;
```
可以看出，装饰器用 `Object.defineProperty` 重新定义了属性`status`。

**常用 mixins 装饰器**
将一个类的所有方法和属性全部通过装饰的方式添加到另一个类上。当时这可以用继承来实现，这不是本文的重点。
```js
function mixin(...params) {
  return function (target) {
    Object.assign(target.prototype, ...params);
  };
}

const Eat = {
  init() {
    console.log("Eat");
  },
};

@mixin(Eat)
class Food {}

let food = new Food();
food.init();
```

##### 2). 方法装饰器
**用装饰器方式装饰上面干饭函数**
```js
function washHands(target, name, descriptor) {
  const oldValue = descriptor.value;
  descriptor.value = function (...params) {
    console.log("干饭人洗手了");
    return oldValue.apply(this, params);
  };

  return descriptor;
}

class Eat2 {
  @washHands
  do() {
    console.log("开始干饭了");
  }
}
const eat = new Eat2();
eat.do();
```

`babel` 翻译后代码如下:
```js
function _applyDecoratedDescriptor(
  target,
  property,
  decorators,
  descriptor,
  context
) {
    ...
    Object.defineProperty(target, property, desc);
    ...
    return desc;
}
let Eat2 =
  ((_class = class Eat2 {
    do() {
      console.log("开始干饭了");
    }
  }),
  _applyDecoratedDescriptor(
    _class.prototype,
    "do",
    [washHands],
    Object.getOwnPropertyDescriptor(_class.prototype, "do"),
    _class.prototype
  ),
  _class);
```
如上，`babel` 不管是装饰类还是装饰类属性，都是通过 `ast` 语法分析，将 `@` 装换成 `_applyDecoratedDescriptor` ，最终装换成  `Object.defineProperty` 来对属性、方法等进行拦截重新定义，已达到装饰的作用。

#### #装饰器的执行顺序
```js
function decorator(key) {
  console.log("evaluate: ", key);
  return function () {
    console.log("call: ", key);
  };
}

@decorator("Class Decorator")
class C {
  @decorator("Static Property")
  static prop;

  @decorator("Static Method")
  static method(foo) {}

  constructor(foo) {}

  @decorator("Instance Method")
  method(foo) {}

  @decorator("Instance Property")
  prop;
}
```
输出内容是:
```txt
evaluate:  Class Decorator
evaluate:  Static Property
evaluate:  Static Method
evaluate:  Instance Method
evaluate:  Instance Property
call:  Static Property
call:  Static Method
call:  Instance Method
call:  Instance Property
```
执行实例属性 `prop` 晚于实例方法 `method` 然而执行静态属性 `static prop` 早于静态方法 `static method`。 这是因为对于属性/方法/访问器装饰器而言，执行顺序取决于声明它们的顺序。

然而参数装饰器执行顺序是相反的， 最后一个参数的装饰器会最先被执行，如下
```js
function f(key: string): any {
  console.log("evaluate: ", key);
  return function () {
    console.log("call: ", key);
  };
}

class C {
  method(
    @f("Parameter Foo") foo,
    @f("Parameter Bar") bar
  ) {}
}
// evaluate:  Parameter Foo
// evaluate:  Parameter Bar
// call:  Parameter Bar
// call:  Parameter Foo
```

#### #Typescript中的装饰器
由于js不具有抽象组件接口和抽象装饰器接口的实现，恰巧 `typescript` 具备接口的定义。下面按照装饰器的组成部分用 `TS` 写装饰器。
**抽象组件**
```ts
abstract class Component {
  public operation(): string {
    return 'hello';
  }
}
```

**具体组件**
```ts
class ConcreteComponent extends Component {
  public operation(): string {
    return 'ConcreteComponent';
  }
}
```

**装饰器角色**
```ts
class Decorator implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  public operation(): string {
    return this.component.operation();
  }
}
```

**具体装饰者**
```ts
class ConcreteDecoratorA extends Decorator {
  constructor(component: Component) {
    super(component);
  }

  private method(): void {
    console.log('methodA修饰');
  }

  // 重写operate
  public operation(): string {
    this.method();
    super.operation();

    return '重写operate';
  }
}
```


### 2. 装饰器模式的使用场景
- 在无修改代码的情况下即可使用对象，且希望在运行时为对象新增额外的行为， 可以使用装饰模式。
- 限制类或者对象方法扩展可以用装饰器模式。
- 装饰能将业务逻辑组织为层次结构， 你可为各层创建一个装饰， 在运行时将各种不同逻辑组合成对象。 
- Before/After钩子。
- 监听属性改变或者方法调用。
- 对方法的参数做转换。
- 添加额外的方法和属性。
- 运行时类型检查。
- 自动编解码。
- 依赖注入。


**下面是一些例子：**
#### 1). @autobind实现this指向原对象
如下例子，如果实现 `getPerson` 返回的 `this` 永远指向它的实例 `person` ，该怎么做?
```js
class Person {
  getPerson() {
    return this;
  }
}

let person = new Person();
let { getPerson } = person;

console.log(getPerson() === person); // false
console.log(person.getPerson() === person); // true
```
聪明的你可能想到了 **箭头函数** :
```js
...
getPerson = () => {
    return this;
}
...
console.log(getPerson() === person); // true
console.log(person.getPerson() === person); // true
```

使用装饰器来装饰 `getPerson` 这个方法:
>  [代码来源](https://segmentfault.com/a/1190000015970099)
```js
function autobind(target, key, descriptor) {
  var fn = descriptor.value;
  var configurable = descriptor.configurable;
  var enumerable = descriptor.enumerable;

  // 返回descriptor
  return {
    configurable: configurable,
    enumerable: enumerable,
    get: function get() {
      // 将该方法绑定this
      var boundFn = fn.bind(this);
      // 使用Object.defineProperty重新定义该方法
      Object.defineProperty(this, key, {
        configurable: true,
        writable: true,
        enumerable: false,
        value: boundFn
      })

      return boundFn;
    }
  }
}

class Person {
  @autobind
  getPerson() {
    return this;
  }
}

let person = new Person();
let { getPerson } = person;

console.log(getPerson() === person); // true
console.log(person.getPerson() === person); // true
```

例如还有 `@debounce`、`@deprecate` 、`@readonly`等常见装饰器，可详见第三方库[core-decorators.js](https://github.com/jayphelps/core-decorators.js)


#### 2).  限制属性，扩展方法。
如 `@Readonly` 限制属性只读等。

#### 3).  重写方法
给原有的函数方法加入额外的作用，如**打印函数**，**附加调用事件**等。

常见的三方库中支持装饰器写法的有很多，如 [react-redux](https://github.com/reduxjs/react-redux/blob/master/src/connect/connect.js)、[Mobx](https://mobx.js.org/README.html)、[Angular](https://angular.cn/)等等。


### 总结
- @decorator 这种方式只是 `ESNext` 规范的语法糖而已。
- 装饰器不能用于普通函数，只能用用于类和类的方法。
- 如果想在函数上使用装饰器，可以像文中第一个例子一样，不用 `@fn` 这种语法糖的形式。

**优点:**
- 不改变原对象及可扩展对象的行为。
- 可以在运行时添加和删除对象的功能。
- 符合单一职责原则，可以将不同行为的大类拆分成多个小类组成。可以将用多个小类装饰封装对象来组合几种行为。

**缺点:**
- 多个装饰器装饰在封装栈中执行顺序固定。
- 易读性比较差。



### 参考链接
- https://es6.ruanyifeng.com/#docs/decorator
- https://imweb.io/topic/5b1403bbd4c96b9b1b4c4e9e
- https://refactoringguru.cn/design-patterns/decorator
- https://segmentfault.com/a/1190000015970099