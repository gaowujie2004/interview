function debounce2(fn, options = {}) {
  options = Object.assign(
    {
      head: false,
      tail: true,
      wait: 300,
    },
    options
  );

  let timerId = false;
  let fnRet = undefined;

  return function () {
    timerId && clearTimeout(timerId);

    // 立即执行
    if (options.head && !timerId) {
      fnRet = fn.apply(this, arguments);
    }

    timerId = setTimeout(() => {
      timerId = false;
      // 以上与「立即执行」逻辑关联

      if (options.tail) {
        fnRet = fn.apply(this, arguments);
      }
    }, options.wait);

    return fnRet;
  };
}
