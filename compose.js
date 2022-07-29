// last = compose(f1, f2, f3);

function compose(...fns) {
  if (!fns.length) return (v) => v;
  if (fns.length === 1) return fns[0];

  return fns.reduce(
    (memo, cur) =>
      (...args) =>
        memo(cur(...args))
  );
}

function compose(...fns) {
  if (!fns.length) return (v) => v;
  if (fns.length === 1) return fns[0];

  return function (...args) {
    let ret = fns.pop()(...args);
    for (let i = fns.length - 1; i >= 0; i--) {
      ret = fns[i](ret);
    }

    return ret;
  };
}

function compose(...fns) {
  return (...args) => {
    const res = fns.pop()(...args);
    return fns.reduceRight((memo, curFn) => curFn(memo), res);
  };
}

function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1)); // 1+4+3+2+1=11
