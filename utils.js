const isObject = (val) => !!val && typeof val === 'object';

const isFunc = (val) => typeof val === 'function';

module.exports = {
  isObject,
  isFunc,
};
