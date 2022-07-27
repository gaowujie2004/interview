Function.prototype.myBind = function (context, ...outArgs) {
  const fn = this;
  const fnKey = Symbol();

  if (context === null || context === undefined) {
    context = globalThis;
  }

  function bindResFn(...innerArgs) {
    if (new.target) {
      // 被当做构造函数
      return new fn(...outArgs, ...innerArgs);
    } else {
      // 普通函数调用
      // 如果是引用类型，则直接返回。
      context = Object(context);
      Object.defineProperty(context, fnKey, {
        value: fn,
        configurable: false,
        enumerable: false,
      });
      const fnRes = context[fnKey](...outArgs, ...innerArgs);
      delete context[fnKey];

      return fnRes;
    }
  }

  bindResFn.prototype.__proto__ = fn.prototype;
  return bindResFn;
};

const obj = {
  name: 'GaoWuJie',
};

function test(a1, a2) {
  console.log('this --', this);
  this.a = 'aa';

  return this;
}

const fn = test.myBind(obj, 111);

const newRes = new fn(2);
console.log(newRes);
