// 迭代模拟栈
const tree = {
  name: 'root',
  children: [
    {
      name: 'c1',
      children: [
        {
          name: 'c11',
          children: [],
        },
        {
          name: 'c12',
          children: [],
        },
      ],
    },
    {
      name: 'c2',
      children: [
        {
          name: 'c21',
          children: [],
        },
        {
          name: 'c22',
          children: [],
        },
      ],
    },
  ],
};

function dfsRootFirstWhile(root) {
  const stack = [root];
  while (stack.length) {
    const cur = stack.pop();

    console.log('--node', cur.name);

    // 倒序，因为是栈，先进后出
    for (let i = cur.children.length - 1; i >= 0; i--) {
      stack.push(cur.children[i]);
    }
  }
}

dfsRootFirstWhile(tree);
