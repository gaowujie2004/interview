// 参考网络
Function.prototype.myBind = function (context, ...outArgs) {
  const fn = this;
  const fnKey = Symbol();

  if (context === null || context === undefined) {
    context = globalThis;
  }

  function bindResFn(...innerArgs) {
    if (this instanceof fn) {
      // bindResFn 被当做构造函数，new 会自动返回 this。
      Object.defineProperty(this, fnKey, {
        value: fn,
        configurable: true,
      });
      this[fnKey](...outArgs, ...innerArgs);
      delete this[fnKey];
    } else {
      // 普通函数调用
      context = Object(context);
      Object.defineProperty(context, fnKey, {
        value: fn,
        configurable: true,
      });
      const fnRes = context[fnKey](...outArgs, ...innerArgs);
      delete context[fnKey];

      return fnRes;
    }
  }

  bindResFn.prototype = fn.prototype;
  return bindResFn;
};

/**================================== TEST **/
const obj = {
  name: 'GaoWuJie',
};

function Test(a1, a2) {
  console.log('Test this --', this);
  this.a = `a1:${a1}, a2:${a2}`;
}

const Fn = Test.myBind(obj, 111);
const newRes = new Fn(2);
console.log('newRes', newRes);
console.log('obj', obj);

console.log('\n\n\n\n');
