var Wrapper = require("./wrapper.js");

var Participant = module.exports = Wrapper.create();
Participant.create = function(id) {
  return Participant({
    id: id,
    notifications: [],
    page: '',
    role: '',
    status: {},
    order: 0,
    ordering: false,
  });
};
Participant.prototype.createTemplate = function(data) {
  return {
    notifications: this.get('notifications'),
    page: this.get('page'),
    role : this.get('role'),
    status: this.get('status'),
    orders: {
      selling: data.orders.selling,
      buying : data.orders.buying,
      concluded: data.orders.concluded,
    },
    order: this.get('order'),
    ordering: this.get('ordering'),
  };
};
Participant.prototype.doAction = function(type, options, data) {
  var actions = require('./participant/actions.js');
  if (actions[type]) {
    actions[type].call(this, data, options);
  }
};

var methods = require('./participant/methods.js');
Object.keys(methods).forEach(function(key) {
  Participant.prototype[key] = methods[key];
});
