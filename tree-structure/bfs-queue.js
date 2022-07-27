const { body } = require('./data');

/**================================== 队列 **/
function bfsQueue(node) {
  if (!node) {
    return;
  }

  const queue = [node];
  while (queue.length) {
    const curr = queue.shift();
    console.log('--', curr.id || curr.content);

    curr.childNodes?.map((child) => {
      child && queue.push(child);
    });
  }
}
// bfsQueue(body);

/**================================== 队列，不出队 **/
// 严格来说，这不是栈，只是用一个累加的索引，一直++，直到溢出没有了。
// 相比于队列的方式，没有删除元素。
function bfsStack(node) {
  if (!node) return;

  const stack = [node];
  let topIndex = 0;
  let currNode = null;
  while ((currNode = stack[topIndex++])) {
    console.log('--', currNode.id || currNode.content);

    currNode.childNodes?.map((child) => stack.push(child));
  }
}
bfsStack(body);
