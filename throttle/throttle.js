// 节流，配置版
function throttle(fn, options) {
  options = Object.assign({ wait: 300, head: true, tail: false }, options);
  let timerId = false;
  let prevCallTime = 0;
  return function (...args) {
    const now = Date.now();

    // 开启立即执行模式，但时间要达到才行
    if (options.head && now - prevCallTime >= options.wait) {
      prevCallTime = now;
      fn.apply(this, args);

      // todo: 清空定时器，立即执行过就不要再延迟执行了
      if (timerId) {
        clearTimeout(timerId);
        timerId = false;
      }
    } else if (options.tail && !timerId) {
      // 在一次节流周期内，如果再次执行当前函数，则进入到这个代码块
      // 安装一个定时器，
      // 开启延迟模式 & 不要重复安装。
      timerId = setTimeout(() => {
        prevCallTime = Date.now();
        timerId = false;
        fn.apply(this, args);
      }, options.wait);
    }
  };
}
