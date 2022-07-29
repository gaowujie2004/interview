// on、once、emit、off
class EventEmitter {
  constructor() {
    // key-fns,
    this.fnsMap = new Map();
  }

  on(key, fn) {
    /**
     * @type Set
     */
    const fns = this.fnsMap.get(key);
    if (fns) {
      fns.add(fn);
    } else {
      this.fnsMap.set(key, new Set([fn]));
    }
  }

  once(key, fn) {
    const wrapFn = (...args) => {
      this.off(key, wrapFn);
      return fn(...args);
    };

    this.on(key, wrapFn);
  }

  emit(key, ...args) {
    /**
     * @type Set
     */
    const fns = this.fnsMap.get(key);
    if (!fns) return;

    fns.forEach((fn) => fn(...args));
  }

  off(key, fn) {
    /**
     * @type Set
     */
    const fns = this.fnsMap.get(key);
    if (!fns) return;

    fns.delete(fn);
  }

  offAll(key) {
    const fns = this.fnsMap.get(key);
    if (!fns) return;

    fns.clear();
  }
}

// 使用

const myEvent = new EventEmitter();

const handle = (...rest) => {
  console.log(...rest);
};

myEvent.on('click', handle);
myEvent.on('click', handle);

myEvent.offAll('click');

myEvent.emit('click', 1, 2, 3, 4);

myEvent.off('click', handle);

myEvent.emit('click', 1, 2);

///
const onceHandle = () => {
  console.log(8888888);
};
myEvent.once('dbClick', () => {
  console.log(123456);
});

myEvent.once('dbClick', () => {
  console.log(654321);
});
myEvent.once('dbClick', onceHandle);
myEvent.once('dbClick', onceHandle);

myEvent.emit('dbClick');
myEvent.emit('dbClick');
