function wrap(pro) {
  let obj = {};
  // 构造一个新的promise用来竞争
  let p1 = new Promise((resolve, reject) => {
    obj.resolve = resolve;
    obj.reject = reject;
  });

  obj.promise = Promise.race([p1, pro]);
  return obj;
}

let testPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(123);
  }, 1000);
});

let wrapPromise = wrap(testPromise);
wrapPromise.promise.then((res) => {
  console.log(res);
});
wrapPromise.resolve('被拦截了');
