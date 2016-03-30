var Wrapper = require("./wrapper.js");

var Order = module.exports = Wrapper.create();

Order.create = function(participant, value) {
  var unixtime = Math.floor((new Date()).getTime() / 1000);
  return Order({
    timestamp: unixtime,
    participant: participant.get('id'),
    value: value
  });
};
