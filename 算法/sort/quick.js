// 含义：排序arr，l ~ r区间的数据
function quick_v1(arr, l, r) {
  if (l >= r) return; // 递归临界

  let tempL = l,
    tempR = r,
    base = arr[l];
  while (tempL < tempR) {
    while (tempL < tempR && arr[tempR] >= base) {
      tempR--; // 右侧都要比基本值大或等于，那么就让右指针左移。
    }
    // 到这里说明：tempR值小于base值了，或者tempL>=tempR
    if (tempL < tempR) {
      // 指针满足有效条件，并且tempR < base
      arr[tempL] = arr[tempR]; //
      tempL++;
    }

    // left部分
    while (tempL < tempR && arr[tempL] <= base) {
      tempL++;
    }
    if (tempL < tempR) {
      // 指针满足条件 && arr[tempL] > base，要放到右侧
      arr[tempR] = arr[tempL];
      tempR--;
    }
    // 将基准值放到最后的空位
    arr[tempL] = base;
  }

  // 当前l~r区间OK
  // 下面用到了l、r，所有要声明tempL、tempR
  // tempL 相当于中间索引
  quick_v1(arr, l, tempL - 1);
  quick_v1(arr, tempL + 1, r);

  return arr;
}

const arr1 = [10, 8, 6, 5, 1, 2, 11, 9];
quick_v1(arr1, 0, arr1.length - 1);
console.log("--结果1：", arr1);
