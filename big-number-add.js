/**
 *
 * @param {string} n1
 * @param {string} n2
 * @return string
 */

// 999
// 888

function add(n1, n2) {
  const len = Math.max(n1.length, n2.length);
  // 先把字符串补齐
  n1 = n1.trim().padStart(len, '0');
  n2 = n2.trim().padStart(len, '0');

  let t = 0; // 每一位的和，最大18，加上进位1，最大19
  let f = 0; // 进位，0 || 1
  let sum = '';

  for (let i = len - 1; i >= 0; i--) {
    t = Number(n1[i]) + Number(n2[i]) + f;
    f = Math.floor(t / 10); // 向下取整
    sum = (t % 10) + sum; // 字符串拼接； t%10，取最后一位数
  }

  if (f) {
    sum = f + sum;
  }

  return sum;
}

function addList(...args) {
  return args.reduce((memo, next) => add(memo, next));
}

/**================================== 测试 **/

console.log('多个参数', addList('111', '999', '888'));
