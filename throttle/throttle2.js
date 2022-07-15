function throttle(fn, options) {
  console.log('throttle2222');
  options = {
    ...{ head: true, tail: false, wait: 1000 },
    ...(options || {}),
  };
  let timerId = 0; // setTimeout()返回值是，正整数
  let prevCallTime = 0;
  let fnRet = undefined;

  return function wrap(...args) {
    const now = Date.now();

    if (options.head && now - prevCallTime >= options.wait) {
      prevCallTime = now;
      fnRet = fn.apply(this, args);

      // todo: 一次周期内，开头执行了，这次周日的尾部就不要执行了。
      // 除非处于节流状态，即 now - prevCallTime < wait
      if (timerId) {
        clearTimeout(timerId);
        timerId = 0;
      }
    } else if (options.tail && !timerId) {
      timerId = setTimeout(() => {
        timerId = 0;
        fnRet = fn.apply(this, args);
      }, options.wait);
    }

    return fnRet;
  };
}
