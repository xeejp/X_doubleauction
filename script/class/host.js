var Wrapper = require("./wrapper.js");

var Host = module.exports = Wrapper.create();
Host.create = function() {
  return Host({
    state: '',
    notifications: [],
  });
};
Host.prototype.createTemplate = function(data) {
  return data;
};
Host.prototype.doAction = function(type, options, data) {
  var actions = require('./host/actions.js');
  if (actions[type]) {
    actions[type].call(this, data, options);
  }
};

var methods = require('./host/methods.js');
Object.keys(methods).forEach(function(key) {
  Host.prototype[key] = methods[key];
});
