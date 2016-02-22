module.exports = (function() {
  var Xee = require('./xee');

  function exec() {
    var double_auction = new Xee.Experiment();
    var states = [
      'default',
      'wait',
      'ready',
      'experiment',
      'finish'
    ];
    states.forEach(function(state) {
      double_auction.setState(state, require('./states/' + state + '.js'));
    });
    var result = double_auction.run(Array.prototype.slice.call(arguments, 0));
    return result;
  }

  // module exports
  return exec;
})();
