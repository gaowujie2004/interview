function myNew(fn, ...args) {
  const instance = Object.create(fn.prototype);

  const fnRes = fn.call(instance, ...args);
  if (Object(fnRes) === fnRes) {
    return fnRes;
  }

  return instance;
}
