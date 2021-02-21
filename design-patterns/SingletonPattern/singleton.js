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