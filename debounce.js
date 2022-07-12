function debounce(fn, options) {
  options = Object.assign(
    {
      leading: false,
      trailing: true,
      wait: 300,
    },
    options || {}
  );
  let timerId = false;
  let fnCallRet = undefined;

  return function wrap() {
    timerId && clearTimeout(timerId); // 有定时器就清楚，说明现在不该你执行。
    const now = Date.now();

    // 立即执行
    if (options.leading && !timerId) {
      fnCallRet = fn.apply(this, arguments);
    }

    timerId = setTimeout(() => {
      timerId = false;
      // 以上逻辑与立即执行关联

      // 管理延迟执行
      if (options.trailing) {
        fnCallRet = fn.apply(this, arguments);
      }
    }, options.wait);

    return fnCallRet;
  };
}

// 延迟
function debounce(fn, wait) {
  let timerId = false;

  return function (...args) {
    timerId && clearTimeout(timerId);

    timerId = setTimeout(() => {
      timerId = false;
      fn.apply(this, args);
    }, wait);
  };
}
