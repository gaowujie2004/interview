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
      // 与立即执行关联
      timerId = setTimeout(() => {
        timerId = false;
      }, options.wait);

      fnCallRet = fn.apply(this, arguments);
    } else if (options.trailing) {
      timerId = setTimeout(() => {
        timerId = false;

        // 管理延迟执行
        fnCallRet = fn.apply(this, arguments);
      }, options.wait);
    }

    return fnCallRet;
  };
}
