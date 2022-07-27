Function.prototype.myCall = function (context, ...args) {
  const fn = this;
  const fnKey = Symbol();

  if (context === null || context === undefined) {
    context = globalThis;
  }

  context = Object(context);
  Object.defineProperty(context, fnKey, {
    value: fn,
    configurable: true,
    enumerable: false,
  });

  const fnRes = context[fnKey](...args);
  delete context[fnKey];

  return fnRes;
};

const obj = {
  name: 'GaoWuJie',
};

function test(a1, a2) {
  console.log('a2, a2, this---', a1, a2, this);
}

test.myCall(null, 111, 222);
console.log(obj);
