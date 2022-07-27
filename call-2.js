Function.prototype.myCall = function (context, ...args) {
  const fnKey = Symbol('fnKey');
  const fn = this;

  if (context === null || context === undefined) {
    return fn(...args);
  }
  context = Object(context); // 如果是引用值，则返回自身；否则返回包装后的引用值；

  Object.defineProperty(context, fnKey, {
    value: fn,
    configurable: true, // 这样才能删除
    // 如果设置了，则其余选项都是false
  });
  const fnRet = context[fnKey](...args);
  delete context[fnKey];

  return fnRet;
};

const obj = {
  name: 'GaoWuJie',
};

function test(a1, a2) {
  console.log('a2, a2, this---', a1, a2, this);
}

test.myCall(obj, 111, 222);
console.log(obj);
