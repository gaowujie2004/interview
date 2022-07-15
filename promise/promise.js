/**
 * let promise2 = p.then(callback1, callback2),
 * promise2 的状态和结果，由 callback1、callback2的函数返回值决定
 *
 * @param {*} promise2  promise2, 即 p.then()  then() 返回的Promise实力
 * @param {*} x         p.then(onCallback1, onCallback2)  onCallback1\2函数的返回值
 * @param {*} resolve   决定promise2，是成功还是失败
 * @param {*} reject    同上
 */
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw new TypeError('不能这样做');
    /**
     * let promise2 = Promise.resolve.then(val => promise2)
     */
  }

  if ((x && typeof x === 'object') || typeof x === 'function') {
    const then = x.then;
    // todo: 注意这个
    let called = false;

    try {
      if (typeof then === 'function') {
        then.call(
          x,
          (value) => {
            if (called) return;
            called = true;
            // todo: 关键
            resolvePromise(promise2, value, resolve, reject);
          },
          (reason) => {
            if (called) return;
            called = true;
            reject(reason);
          }
        );
      } else {
        resolve(x);
      }
    } catch (err) {
      reject(err);
    }
  } else {
    // 基本值
    resolve(x);
    return;
  }
}

const PENDING = 'pending';
const FULFilled = 'fulfilled';
const REJECTED = 'rejected';

class Promise {
  #PromiseResult = undefined;
  #PromiseState = PENDING; // 'fulfilled' | 'rejected' | 'pending';
  #onFulfilledList = [];
  #onRejectedList = [];

  constructor(executeCallback) {
    if (typeof executeCallback !== 'function') {
      throw new TypeError('必须要传递回调函数');
    }

    const resolve = (value) => {
      if (this.#PromiseState !== PENDING) return;

      /**
       * let p = Promise.resolve(1)
       * let p1 = new Promise((resolve, reject) => {
       *    resolve(p);
       * })
       *
       * 调用resolve时，p1的状态和结果，是和p一致的
       * 但 p === p1;  // false
       */
      if (value instanceof Promise) {
        // 把结果值解出来
        value.then(
          (ok) => {
            this.#PromiseResult = ok;
            this.#PromiseState = FULFilled;
            this.#onFulfilledList.forEach((fn) => {
              fn();
            });
          },
          (reason) => {
            this.#PromiseResult = reason; // 直接就是失败的
            this.#PromiseState = REJECTED;
            this.#onFulfilledList.forEach((fn) => {
              fn();
            });
          }
        );
      } else {
        this.#PromiseResult = value;
        this.#PromiseState = FULFilled;
        this.#onFulfilledList.forEach((fn) => {
          fn();
        });
      }
    };
    const reject = (reason) => {
      if (this.#PromiseState !== PENDING) return;

      // 若reason是promise，不解出他们的值，自己作为结果值。和Promise.reject()一样
      this.#PromiseResult = reason;
      this.#PromiseState = REJECTED;
      this.#onRejectedList.forEach((fn) => {
        fn();
      });
    };

    try {
      executeCallback(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onResolve, onReject) {
    // 穿透
    onResolve = typeof onResolve === 'function' ? onResolve : (val) => val;
    onReject =
      typeof onReject === 'function'
        ? onReject
        : (reason) => {
            throw reason;
          };

    // then() 返回值
    const promise2 = new Promise((resolve, reject) => {
      if (this.#PromiseState === PENDING) {
        this.#onFulfilledList.push(() => {
          setTimeout(() => {
            try {
              var x = onResolve(this.#PromiseResult);
            } catch (err) {
              reject(err);
              return;
            }
            resolvePromise(promise2, x, resolve, reject);
          });
        });
        this.#onRejectedList.push(() => {
          setTimeout(() => {
            try {
              var x = onReject(this.#PromiseResult);
            } catch (err) {
              reject(err);
              return;
            }
            resolvePromise(promise2, x, resolve, reject);
          });
        });

        return;
      }

      if (this.#PromiseState === FULFilled) {
        setTimeout(() => {
          try {
            var x = onResolve(this.#PromiseResult);
          } catch (err) {
            reject(err);
            return;
          }
          resolvePromise(promise2, x, resolve, reject);
        }, 0);

        return;
      }

      if (this.#PromiseState === REJECTED) {
        setTimeout(() => {
          try {
            var x = onReject(this.#PromiseResult);
          } catch (err) {
            reject(err);
            return;
          }
          resolvePromise(promise2, x, resolve, reject);
        }, 0);

        return;
      }
    });

    return promise2;
  }

  // Promise.resolve(x)，如果x是promise，不管是成功还是失败，都返回x
  static resolve(value) {
    if (value instanceof Promise) {
      return value;
    }

    return new Promise((resolve) => {
      resolve(value);
    });
  }

  // Promise.reject(y)，无论y是不是promise，都自己返回失败的promise，并且结果值是y；
  static reject(reason) {
    return new Promise((_, reject) => {
      reject(reason);
    });
  }
}

Promise.resolve()
  .then(function log0() {
    console.log(0);
    return Promise.resolve(4);
  })
  .then(function log4() {
    console.log(res);
  });

Promise.resolve()
  .then(function log1() {
    console.log(1);
  })
  .then(function log2() {
    console.log(2); //
  });
