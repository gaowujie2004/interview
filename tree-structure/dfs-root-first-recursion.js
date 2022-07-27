/**================================== 先序遍历 **/
// 递归 and 非递归

const div1 = {
  name: 'div',
  id: 'div1',
  children: [
    {
      name: 'p',
      id: 'p1',
      children: [
        {
          id: 'text1',
        },
      ],
    },
    {
      name: 'p',
      id: 'p2',
      children: [
        {
          id: 'text2',
        },
      ],
    },
    {
      name: 'p',
      id: 'p3',
      children: [
        {
          id: 'text3',
        },
      ],
    },
    {
      name: 'p',
      id: 'p4',
      children: {
        id: 'text4',
      },
    },
  ],
};

const node = {
  name: 'body',
  id: 'body',
  children: [
    div1,
    {
      name: 'span',
      id: 'span1',
    },
    {
      name: 'span',
      id: 'span2',
    },
  ],
};

const { body } = require('./data');

/**================================== 递归 实现 **/
function dfsRecursion(root) {
  if (!root) {
    return;
  }

  console.log(root.id);

  // 非叶子节点， 单节点, 或者空
  root.childNodes?.forEach(function forEachChildren(child) {
    dfsRecursion(child);
  });
}
dfsRecursion(node);

/**================================== 递归 实现2 **/
function dfsRecursion2(node) {
  if (!node) {
    return;
  }
  console.log(node);

  let child = node.firstElementChild;
  for (let i = 0; i < node.childElementCount; i++) {
    dfsRecursion2(child);
    child = child.nextElementSibling;
  }
}
// dfsRecursion2(body)
