Function.prototype.curry = function (numArgs) {
  var args = [];
  var func = this;

  function _curriedFunc(arg) {
    args.push(arg);

    if (args.length === numArgs) {
      return func(...args);
    } else {
      return _curriedFunc;
    }
  }
  return _curriedFunc;
};
