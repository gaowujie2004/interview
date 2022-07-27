// 自己的逻辑
// let Fn = Test.bind(....);
// Fn 没有Prototype 属性，不是构造函数

Function.prototype.myBind = function (context, ...outArgs) {
  const fn = this;
  const fnKey = Symbol('fnKey');

  const bindRetFn = (...innerArgs) => {
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
  };

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

// new Fn，其实还是 new  Test
const Fn = Test.myBind(obj, 111);
Fn.prototype.fnMethod = () => {};
const newRes = new Fn(2);

console.log('newRes', newRes);
console.log('obj', obj);

console.log('\n\n\n\n');
