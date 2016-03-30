module.exports = (function(){
  var Enumerable = require('linq');
  Enumerable.prototype.shuffle = function(){
      return this.orderBy(function(){
          return Math.random();
      });
  };
  return Enumerable;
})();
