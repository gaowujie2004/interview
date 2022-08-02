const { body } = require('./data');

function getDeepNumber(node) {
  if (!node.childNodes.length) {
    return 1;
  }

  let resList = node.childNodes.map((child) => getDeepNumber(child));

  return Math.max(...resList) + 1;
}

// out: 4
console.log(getDeepNumber(body));

// out: 1
const body2 = {
  id: 'main',
  tag: 'main',
  childNodes: [],
};
console.log(getDeepNumber(body2));
