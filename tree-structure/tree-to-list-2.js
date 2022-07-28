const tree = {
  id: 1,
  text: '节点1',
  parentId: 0,
  children: [
    {
      id: 2,
      text: '节点1_1',
      parentId: 1,
      children: [
        {
          id: 7777,
          text: '节点1_1_1',
          parentId: 2,
        },
      ],
    },
    {
      id: 3,
      text: '节点1_2',
      parentId: 1,
    },
  ],
};

// 转成如下结构:
[
  { id: 1, text: '节点1', parentId: 0 },
  { id: 2, text: '节点1_1', parentId: 1 },
  { id: 7777, text: '节点1_1_1', parentId: 2 },
  { id: 3, text: '节点1_2', parentId: 1 },
];

[
  { id: 7777, text: '节点1_1_1', parentId: 2 },
  { id: 2, text: '节点1_1', parentId: 1 },
  { id: 3, text: '节点1_2', parentId: 1 },
  { id: 1, text: '节点1', parentId: 0 },
];

// 递归将其加入list数组中，后序删除children属性
function treeToList(tree) {
  const list = []; // 属性是节点的先序顺序

  // 将当前node放入list中，然后再删除node.children;
  function treeToListImpl(node) {
    list.push(node);
    // 不能立马删除 node.children 属性，还得深度递归呢。依靠回溯阶段删除了就是后序遍历顺序
    node.children?.forEach((child) => {
      treeToListImpl(child);
    });

    // 如果把 list.push(node)放到这里，那就是后序遍历结果
    delete node.children;
  }

  treeToListImpl(tree);
  return list;
}

/**================================== TEST **/
console.log('tree->list RES', treeToList(tree));
