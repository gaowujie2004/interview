// 柯里化，高阶函数，缓存参数
function currying(fn, ...outArgs) {
  const fullArgs = [...outArgs];

  function wrap(...innerArgs) {
    if (fullArgs.length < fn.length) {
      fullArgs.push(...innerArgs);
      return wrap;
    } else {
      return fn.apply(this, fullArgs);
    }
  }

  return wrap;
}
