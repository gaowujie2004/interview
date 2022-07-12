function throttle(fn, options = {}) {
  options = Object.assign({ wait: 300, immediately: true, end: false }, options);

  let timerId = -1;
  let prevCallTime = 0;

  return function (...args) {
    const now = Date.now();

    // 管是否立即执行
    if (!options.immediately) {
      prevCallTime = now;
    }

    if (now - prevCallTime >= options.wait) {
      // 说明 immediately === true
      prevCallTime = now;
      if (timerId !== -1) {
        clearTimeout(timerId);
        timerId = -1;
      }

      return fn.apply(this, args);
    } else if (options.end && timerId === -1) {
      // 延迟型
      timerId = setTimeout(() => {
        timerId = -1;
        performance = Date.now();
        fn.apply(this, args);
      }, options.wait);
    }
  };
}
