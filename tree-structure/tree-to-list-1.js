// 转成如下结构:
[
  { id: 1, text: '节点1', parentId: 0 },
  { id: 2, text: '节点1_1', parentId: 1 },
  { id: 7777, text: '节点1_1_1', parentId: 2 },
  { id: 3, text: '节点1_2', parentId: 1 },
];

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

function treeToList(root) {
  const retList = [];

  // 递归函数(先序)，将当前节点加入 retList 数组中
  function treeToListImpl(root) {
    if (!root) return;

    retList.push(root);
    root.children?.forEach((child) => {
      treeToListImpl(child);
    });

    // todo: 回溯阶段，后序
    delete root.children;
  }
  treeToListImpl(root);

  return retList;
}

console.log(treeToList(tree));
