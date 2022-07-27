/**
 * -0 === +0 -> false
 * NaN === NaN  true
 * @param {*} v1
 * @param {*} v2
 */
function is(v1, v2) {
  if (v1 === v2) {
    // === 运算符不区分 +0、-0

    // 1/0 -> Infinity
    // 1/-0 -> -Infinity
    return v1 !== 0 || 1 / v1 === 1 / v2;
  }

  // v1 !== v2;, 看看是不是NaN
  return v1 !== v1 && v2 !== v2;
}
