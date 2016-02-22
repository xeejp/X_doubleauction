module.exports.run = function(args) {
  var double_auction = require('./doubleauction.js');
  var result = double_auction.apply(null, args);
  return JSON.stringify(result);
};
