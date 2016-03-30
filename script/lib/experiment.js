var $ = JSON.parse;
var $$ = JSON.stringify;

var API = {
  init: function() {
    return [];
  },
  join: function(data, id) {
    return [$(data), id];
  },
  receive: function(data, received_data, id) {
    return [$(data), $(received_data), (id)? id: null];
  }
};

var Experiment = function(behaviour) {
  var self = this;
  Object.keys(API).forEach(function(key) {
    self[key] = function(){
      var args = API[key].apply(null, arguments);
      return $$(behaviour[key].apply(self, args));
    };
  });
};

module.exports = Experiment;
