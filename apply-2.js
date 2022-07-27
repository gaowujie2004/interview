Function.prototype.myApply = function (context, argsList) {
  const fn = this;
  const fnKey = Symbol('fnKey');
  if (context === null || context === undefined) return fn(...argsList);

  context = Object(context);
  Object.defineProperty(context, fnKey, {
    value: fn,
    configurable: true, // delete
  });

  const fnRet = context[fnKey](...argsList);
  delete context[fnKey];
  return fnRet;
};

// 不使用ES6的 ... 运算符， 使用eval
Function.prototype.myApply = function (context, argsList) {
  const fn = this;
  const fnKey = Symbol('fnKey');
  if (context === null || context === undefined) return fn(...argsList);

  context = Object(context);
  Object.defineProperty(context, fnKey, {
    value: fn,
    configurable: true, // delete
  });

  // 'argsList[0],argsList[1]'
  const argumentsStr = argsList.reduce((memo, _, i) => `${memo}argsList[${i}],`, '').replace(/,$/, '');
  const fnRet = eval('context[fnKey](' + argumentsStr + ')');
  delete context[fnKey];
  return fnRet;
};

const obj = {
  name: 'GaoWuJie',
};

function test(a1, a2, a3) {
  console.log('a2, a2, a3, this---', a1, a2, a3);
}

test.myApply(obj, [111, 222, 333]);
