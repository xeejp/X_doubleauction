var util = require("util");

var Wrapper = function(obj) {
  this.setObject(obj);
};

Wrapper.prototype.get = function(key) {
  return this.obj[key];
};
Wrapper.prototype.set = function(key, value) {
  this.obj[key] = value;
};
Wrapper.prototype.getObject = function() {
  return this.obj;
};
Wrapper.prototype.setObject = function(obj) {
  this.obj = obj;
};
Wrapper.prototype.toJSON = function() {
  return JSON.stringify(this.obj);
};

Wrapper.create = function() {
  var constructor = function() {
    if (!new.target) {
      return new constructor(...arguments);
    }
    Wrapper.apply(this, arguments);
  };
  util.inherits(constructor, Wrapper);
  return constructor;
}

module.exports = Wrapper;
