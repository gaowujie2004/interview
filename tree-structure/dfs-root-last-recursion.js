/**================================== 后序遍历，最后遍历根 **/
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

/**================================== 递归 实现 **/
function dfsRecursion(root) {
  if (!root.children) {
    return;
  }

  // 非叶子节点， 单节点, 或者空
  const children = Array.isArray(root.children) ? root.children : [root.children];
  children.forEach(dfsRecursion);

  console.log('-----', root.id, root.children);
}
dfsRecursion(node);
