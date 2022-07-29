export {};

function cancelPromise<P extends Promise<unknown>>(pendingPromise: P) {
  let _resolve: (val?: unknown) => void = () => {};
  let _reject: (reason?: unknown) => void = () => {};

  const cancelPromise = new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  }) as P & { resolve: typeof _resolve; reject: typeof _reject };

  cancelPromise.resolve = _resolve;
  cancelPromise.reject = _reject;

  return cancelPromise;
}

/**================================== TEST **/
let testPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(123);
  }, 1000);
});

let wrapPromise = cancelPromise(testPromise);
wrapPromise.then((res) => {
  console.log(res);
});
wrapPromise.resolve('被拦截了');
