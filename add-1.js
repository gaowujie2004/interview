//  add(1)(2)(3)()=6   add(1,2,3)(4)()=10
function add(...outArgs) {
  if (!outArgs.length) return;
  const fullArgs = [...outArgs];

  function addWrap(...innerArgs) {
    if (!innerArgs.length) {
      return fullArgs.length ? fullArgs.reduce((memo, cur) => memo + cur) : undefined;
    }

    fullArgs.push(...innerArgs);
    return addWrap;
  }

  return addWrap;
}

function add(...args) {
  let allArgs = [...args];
  function fn(...newArgs) {
    allArgs = [...allArgs, ...newArgs];
    return fn;
  }
  fn.toString = function () {
    if (!allArgs.length) {
      return;
    }
    return allArgs.reduce((sum, cur) => sum + cur);
  };
  return fn;
}

/**================================== TEST **/
a1 = add(1)(2)(3)();
a2 = add(1, 2, 3)(4)();

console.log(a1, a2);
