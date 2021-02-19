// ======== 简单版本实现单例模式 ========
function Singleton(name) {
    this.name = name;
}
Singleton.getInstance = function() {
    if (!this.instance) {
        this.instance = new Singleton(...arguments);
    } else {
        this.apply(this.instance, arguments);
    }

    return this.instance;
};
Singleton.prototype.getName = function() {
    console.log(this.name);
};

// let a = Singleton.getInstance("tori");
// a.getName(); //tori
// let b = Singleton.getInstance("go");
// b.getName(); //go
// console.log(a === b); //true

// ======= 用 IIFE 优化实现单例模式
const Singleton2 = (function() {
    let instance;

    function Singleton2() {
        instance =
            instance ||
            (this instanceof Singleton2 ? this : new Singleton2(...arguments));
        instance.init(...arguments);

        return instance;
    }

    Singleton2.prototype.init = function(name) {
        this.name = name;
    };

    return Singleton2;
})();

Singleton2.prototype.showName = function() {
    console.log(this.name);
};

// let s1 = new Singleton2("tori");
// s1.showName();
// let s2 = new Singleton2("go");
// s2.showName();
// console.log(s1 === s2); // true

// ================== 通用型创建单例 ================
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
    return {};
}
console.log(
    CreateSingleton(d1, "tori") === CreateSingleton(d1, "go"),
    CreateSingleton(d1, "go")
);

let s1 = new CreateSingleton(Singleton3, "tori");
let s2 = new CreateSingleton(Singleton3, "go");
console.log(s1 === s2); // true

// ================== ES6创建单例 ================
class SingletonClass {
    constructor(name) {
        if (!SingletonClass.instance) {
            this.name = this.name;

            return (SingletonClass.instance = this);
        }

        return SingletonClass.instance;
    }
}
// console.log(new SingletonClass("tori") === new SingletonClass("go"));
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

// const c1 = SingletonClass2.getInstance(Cat, "tori");
// const c2 = SingletonClass2.getInstance(Cat, "go");
// c2.say();
// console.log(c1 === c2);