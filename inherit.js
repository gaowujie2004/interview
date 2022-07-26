// 寄生组合继承
function inherit(SonFn, FatherSon) {
  SonFn.prototype.__proto__ = FatherSon.prototype;
}
