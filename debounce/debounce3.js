// 防抖，只要执行就清除定时器。
function debounce3(fn, options) {
  options = {
    ...options,
    ...({ wait: 1000, head: true, tail: false } || {}),
  };
  const NotTimer = 0;
  let fnRet;
  let timerId = 0; // setTimeout()返回值是正整数

  return function wrap(...args) {
    timerId && clearTimeout(timerId);

    if (options.head && timerId === NotTimer) {
      fnRet = fn.apply(this, args);

      // 重置 timerId = 0;
      timerId = setTimeout(() => {
        timerId = NotTimer;
      }, options.wait);
    } else if (options.tail) {
      // 头不执行了，就开始执行尾
      timerId = setTimeout(() => {
        timerId = NotTimer; // 尾执行了，新一轮又开启了。
        fnRet = fn.apply(this, args);
      }, options.wait);
    }

    return fnRet;
  };
}
