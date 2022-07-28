var list = [
  {
    id: 4,
    text: '节点4',
    parentId: 2, //这里用0表示为顶级节点
  },
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
    // 顶级节点
    id: 0,
    text: '节点Root',
    parentId: null, //通过这个字段来确定子父级
  },
  // ...
];

// 转成
var tree = {
  id: 0,
  text: '节点1',
  children: [
    {
      id: 2,
      text: '节点1_1',
      parentId: 0,
    },
  ],
};

function listToTree(list) {
  let root;
  const idMap = {};

  list.forEach((node) => {
    idMap[node.id] = node;
  });

  for (const id in idMap) {
    const curNode = idMap[id];
    const curParentNode = idMap[curNode.parentId];
    if (curNode.parentId === null) {
      root = curNode;
      continue;
    }
    // 非根
    (curParentNode.children ??= []).push(curNode);
  }

  return root;
}

/**================================== TEST **/
console.log('列表转数组 -- RES', listToTree(list));
