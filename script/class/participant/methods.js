var Enumerable = require('./../../lib/enumerable.js');
var Host = require('./../host.js');
var Participant = require('./../participant.js');
var Order = require('./../order.js');

module.exports = {
  getStatus: function(key) {
    return this.get('status')[key];
  },
  setStatus: function(key, value) {
    this.get('status')[key] = value;
  },
  becomeSeller: function(cost) {
    this.set('role', 'seller');
    this.set('status', {
      goods: 1,
      cost : cost,
      sales: 0,
    });
  },
  becomeBuyer: function(willingness) {
    this.set('role', 'buyer');
    this.set('status', {
      goods      : 0,
      willingness: willingness,
      paid       : 0,
    });
  },
  hasRole: function() {
    switch (this.get('role')) {
      case 'seller':
      case 'buyer':
        return true;
      default:
        return false;
    }
  },
  sell: function(value) {
    this.setStatus('goods', this.getStatus('goods') - 1);
    this.setStatus('sales', this.getStatus('sales') + value);
    this.set('ordering', false);
  },
  buy: function(value) {
    this.setStatus('goods', this.getStatus('goods') + 1);
    this.setStatus('paid', this.getStatus('paid') + value);
    this.set('ordering', false);
  },
  isOrderable: function(value) {
    if (this.get('ordering')) {
      return false;
    }
    switch (this.get('role')) {
      case 'seller':
        return (this.getStatus('goods') > 0 && value >= this.getStatus('cost'));
      case 'buyer':
        return (this.getStatus('goods') < 1 && value <= this.getStatus('willingness'));
    }
    return false;
  },
  createOrder: function(value) {
    this.set('ordering', true);
    return Order.create(this, value);
  },
};
