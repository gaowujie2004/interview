function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype);

  const fnRes = fn.call(obj, ...args);
  if (Object(fnRes) === fnRes) {
    return fnRes;
  }

  return obj;
}
