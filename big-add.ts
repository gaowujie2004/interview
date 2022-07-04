// 99
// 99
//   98
function add(n1: string, n2: string) {
  const len = Math.max(n1.length, n2.length);
  n1 = n1.padStart(len, '0');
  n2 = n2.padStart(len, '0');

  let sum = '';
  let t = 0; // 每一位的和
  let f = 0; // 进位

  for (let i = len - 1; i >= 0; i--) {
    t = Number(n1[i]) + Number(n2[i]) + f; // 最大 18，加上进位最大19
    f = Math.floor(t / 10); //  8/10 = 0.8 表示没有进位，故不用 t%10；  0 | 1
    sum = `${t % 10}${sum}`;
  }

  if (f !== 0) {
    sum = `${f}${sum}`;
  }

  return sum;
}

console.log(add('997', '998'));
