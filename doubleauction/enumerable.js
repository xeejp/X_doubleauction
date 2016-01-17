module.exports = (function(){
    var Enumerable = require('linq');

    // linq extension
    Enumerable.prototype.shuffle = function(){
        return this.orderBy(function(){
            return Math.random();
        });
    };
    Enumerable.prototype.processAll = function(processor){
        this.where(function(value, index){
            processor(value, index);
            return false;
        }).toArray();
    };

    return Enumerable;
})();
