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
