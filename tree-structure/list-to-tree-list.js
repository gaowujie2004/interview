var list = [
  {
    id: 1,
    text: '节点1',
    parentId: 0, //这里用0表示为顶级节点
  },
  {
    id: 2,
    text: '节点1_1',
    parentId: 1, //通过这个字段来确定子父级
  },
  {
    id: 3,
    text: '节点3',
    parentId: 0, //这里用0表示为顶级节点
  },
  // ...
];

// 转成
[
  {
    id: 1,
    text: '节点1',
    parentId: 0,
    children: [
      {
        id: 2,
        text: '节点1_1',
        parentId: 1,
      },
    ],
  },
  {
    id: 3,
    text: '节点3',
    parentId: 0,
  },
];

function listToTree(list) {
  let treeList = [];
  const idMap = {};

  list.forEach((node) => {
    idMap[node.id] = node;
  });

  for (const id in idMap) {
    const curNode = idMap[id];
    const curParentNode = idMap[curNode.parentId];
    if (curNode.parentId === 0) {
      treeList.push(curNode);
      continue;
    }
    // 非根
    (curParentNode.children ??= []).push(curNode);
  }

  return treeList;
}

/**================================== TEST **/
console.log('列表转数组 -- RES', listToTree(list));
