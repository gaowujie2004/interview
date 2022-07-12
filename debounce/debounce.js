function debounce(fn, options) {
  console.log('myDebounce');

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
    window.lastClick = performance.now();

    timerId && clearTimeout(timerId); // 有定时器就清楚，说明现在不该你执行。
    const now = Date.now();

    // 立即执行，与延迟执行是互斥的，所以这样写
    if (options.leading && !timerId) {
      // 与立即执行关联
      timerId = setTimeout(() => {
        timerId = false;
      }, options.wait);

      fnCallRet = fn.apply(this, arguments);
    } else if (options.trailing) {
      timerId = setTimeout(() => {
        // 延迟执行开始，说明一轮新的防抖开始了。
        timerId = false;
        fnCallRet = fn.apply(this, arguments);
      }, options.wait);
    }

    return fnCallRet;
  };
}
