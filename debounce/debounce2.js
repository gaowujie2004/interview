// 防抖
// 在防抖周期内，再次调用wrap函数，就重新计时

function debounce3(fn, options) {
  options = {
    ...{ head: true, tail: false, wait: 1000 },
    ...(options || {}),
  };
  let timerId = 0;
  let fnRet = undefined;

  return function wrap(...args) {
    timerId && clearTimeout(timerId);

    // 管立即执行, 没有定时器说明没有延迟任务
    if (options.head && !timerId) {
      // 开启一个定时器，如果在防抖周期内，没有调用 wrap 函数，那么timerId就再次置空（可以立即执行）
      timerId = setTimeout(() => {
        timerId = 0;
      }, options.wait);
      fnRet = fn.apply(this, args);
    } else if (head.tail) {
      // head.tail && !timerId 是错的
      // 管理尾执行
      timerId = setTimeout(() => {
        timerId = 0; // 公用逻辑，控制开头重置
        fnRet = fn.apply(this, args);
      }, options.wait);
    }
  };
}
