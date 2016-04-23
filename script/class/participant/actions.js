var Enumerable = require('./../../lib/enumerable.js');
var Host = require('./../host.js');
var Participant = require('./../participant.js');

var orderTypes = {
  'seller': 'selling',
  'buyer': 'buying'
};

module.exports = {
  order: function(data, options) {
    if (this.get('page') !== 'experiment') return;
    if (!options.value) return;

    var id = this.get('id');
    var role = this.get('role');
    if (this.isOrderable(options.value)) {
        data.orders[orderTypes[role]] = Enumerable.from(data.orders[orderTypes[role]])
        .where(function(order) {
            return order.participant != id;
        })
        .toArray();
        var order = this.createOrder(options.value);
        data.orders[orderTypes[role]].push(order.getObject());
    } else {
        return;
    }

    var sellings = Enumerable.from(data.orders.selling)
      .orderBy('$.value')
      .thenBy('$.timestamp')
      .toArray();
    var buyings = Enumerable.from(data.orders.buying)
      .orderByDescending('$.value')
      .thenBy('$.timestamp')
      .toArray();
    while(sellings.length > 0 && buyings.length > 0) {
      var selling = sellings[0];
      var buying = buyings[0];
      if (selling.value > buying.value) break;
      var seller = Participant(data.participants[selling.participant]);
      var buyer = Participant(data.participants[buying.participant]);
      var value, timestamp;
      if (selling.timestamp < buying.timestamp) {
        value = selling.value;
        timestamp = buying.timestamp;
      } else {
        value = buying.value;
        timestamp = selling.timestamp;
      }
      seller.sell(value);
      buyer.buy(value);
      data.orders.concluded.push({
        selling: sellings.shift(),
        buying: buyings.shift(),
        timestamp: timestamp,
        value: value,
      });
    }
    data.orders.buying = buyings;
    data.orders.selling = sellings;
  },
  cancelOrder: function(data, options) {
    if (this.get('page') !== 'experiment') return;

    var id = this.get('id');
    var role = this.get('role');
    data.orders[orderTypes[role]] = Enumerable.from(data.orders[orderTypes[role]])
      .where(function(order) {
        return order.participant != id;
      })
      .toArray();
    this.set('ordering', false);
  },
};
