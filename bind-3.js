// 自己的逻辑

Function.prototype.myBind = function (context, ...outArgs) {
  const fn = this;
  const fnKey = Symbol('fnKey');

  function bindRetFn(...innerArgs) {
    if (new.target) {
      return new fn(...outArgs, ...innerArgs);
    } else {
      if (context === null || context === undefined) {
        return fn(...outArgs, ...innerArgs);
      }

      context = Object(context);
      Object.defineProperty(context, fnKey, {
        value: fn,
        configurable: true, // delete need
      });
      const fnRet = context[fnKey](...outArgs, ...innerArgs);
      delete context[fnKey];

      return fnRet;
    }
  }

  bindRetFn.prototype = fn.prototype;
  return bindRetFn;
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
