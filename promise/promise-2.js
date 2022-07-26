const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

/**
 *
 * @param {*} promise2
 * @param {*} x
 * @param {*} resolve
 * @param {*} reject
 * let p2 = Promise.resolve().then(callback);
 * x callback返回值
 */
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return TypeError('不能这样');
  }

  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let then = x.then;
    if (typeof then === 'function') {
      then.call(
        x,
        (value) => {
          resolvePromise(promise2, value, resolve, reject);
        },
        (reason) => {
          reject(reason);
        }
      );
    } else {
      // x不是promise实例
      resolve(x);
    }
  } else {
    // x是基本值
    resolve(x);
  }
}

class Promise {
  constructor(execute) {
    this.status = PENDING;
    this.result = undefined;
    this.onFulfilledList = [];
    this.onRejectList = [];

    const resolve = (value) => {
      if (this.status !== PENDING) return;

      if (value instanceof Promise) {
        value.then(
          (val) => {
            this.result = val;
            this.status = FULFILLED;
            this.onFulfilledList.forEach((fn) => fn());
          },
          (reason) => {
            this.result = reason;
            this.status = REJECTED;
            this.onRejectList.forEach((fn) => fn());
          }
        );
      } else {
        this.result = value;
        this.status = FULFILLED;
        this.onFulfilledList.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.status !== PENDING) return;

      this.result = reason;
      this.status = REJECTED;
      this.onRejectList.forEach((fn) => fn());
    };

    try {
      execute(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onReject) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
    onReject =
      typeof onReject === 'function'
        ? onReject
        : (reason) => {
            throw reason;
          };

    // this -> p
    /**
     * let p = new Promise(....);
     * let p2 = p.then(.....)
     */
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === PENDING) {
        this.onFulfilledList.push(() => {
          // 此处，虽然不加setTimeout也可以访问到 promise2,但为了保持.then(callback) 回调函数是异步的，就这样做了。
          setTimeout(() => {
            // todo: 稍后处理
            let x;
            try {
              x = onFulfilled(this.result);
            } catch (err) {
              reject(err);
              return;
            }
            // 其内部的错，即promise2 === x，必须要抛出
            resolvePromise(promise2, x, resolve, reject);
          }, 0);
        });
        this.onRejectList.push(() => {
          setTimeout(() => {
            // todo: 稍后处理
            const x = onReject(this.result);
            resolvePromise(promise2, x, resolve, reject);
          }, 0);
        });

        return;
      }

      if (this.status === FULFILLED) {
        setTimeout(() => {
          let x;
          try {
            x = onFulfilled(this.result);
          } catch (err) {
            reject(err);
            return;
          }
          // 其内部的错，即promise2 === x，必须要抛出
          resolvePromise(promise2, x, resolve, reject);
        }, 0);

        return;
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          let x;
          try {
            x = onReject(this.result);
          } catch (err) {
            reject(err);
            return;
          }
          // 其内部的错，即promise2 === x，必须要抛出
          resolvePromise(promise2, x, resolve, reject);
        }, 0);

        return;
      }
    });
    return promise2;
  }
}
