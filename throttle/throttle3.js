// 节流，在间隔内只执行一次。不清除定时器

function throttle3(fn, options) {
  options = {
    ...{ head: true, tail: false, wait: 1000 },
    ...(options || {}),
  };
  let prevCallTime = 0; //负责头
  let timerId = 0; //负责尾，setTimeout()返回值>0
  let fnRes;

  // 不用箭头函数，是为了使用this
  return function (...args) {
    const now = Date.now();
    // 立即执行
    if (options.head && now - prevCallTime >= options.wait) {
      prevCallTime = now;
      fnRes = fn.apply(this, args);

      if (timerId) {
        clearTimeout(timerId);
        timerId = 0;
      }
    } else if (options.tail && !timerId) {
      timerId = setTimeout(() => {
        timerId = 0;
        fnRes = fn.apply(this, args);
      }, options.wait);
    }

    return fnRes;
  };
}
