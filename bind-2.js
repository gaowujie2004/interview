Function.prototype.myBind = function (context, ...outArgs) {
  const fn = this;
  const fnKey = Symbol();

  if (context === null || context === undefined) {
    context = globalThis;
  }
  context = Object(context);
  Object.defineProperty(context, fnKey, {
    value: fn,
    enumerable: false,
    configurable: true,
  });

  function bindResFn(...innerArgs) {
    if (this instanceof fn) {
      // bindResFn 被当做构造函数，new 会自动返回 this。
      Object.defineProperty(this, fnKey, {
        value: fn,
        enumerable: false,
        configurable: true,
      });
      this[fnKey](...outArgs, ...innerArgs);
      delete this[fnKey];
    } else {
      // 普通函数调用
      // 如果是引用类型，则直接返回。

      const fnRes = context[fnKey](...outArgs, ...innerArgs);
      delete context[fnKey];

      return fnRes;
    }
  }

  bindResFn.prototype = fn.prototype;
  return bindResFn;
};

const obj = {
  name: 'GaoWuJie',
};

function Test(a1, a2) {
  console.log('this --', this);
  this.a = 'aa';
}

const Fn = Test.myBind(obj, 111);
const newRes = new Fn(2);
console.log(newRes);

console.log('\n\n\n\n');

const fn = Test.myBind(obj, 1111);
fn(222);
console.log(obj);
