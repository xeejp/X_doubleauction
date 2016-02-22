module.exports = (function(){
  // define API
  var API = {
    init: {
      args : [],
      proxy: function() {
        data = Private.unpackData.call(this, {state: 'default', data: {}});
        var result = Private.callAPI.call(this, 'init');
        result.data = Private.packData.call(this, result.data);
        return result;
      }
    },
    join: {
      args : ['data', 'id'],
      proxy: function(data, id) {
        data = JSON.parse(data);
        data = Private.unpackData.call(this, data);
        var result = Private.callAPI.call(this, 'join', [data, id]);
        result.data = Private.packData.call(this, result.data);
        return result;
      }
    },
    update: {
      args : ['data'],
      proxy: function(data) {
        data = JSON.parse(data);
        data = Private.unpackData.call(this, data);
        var result = Private.callAPI.call(this, 'update', [data]);
        result.data = Private.packData.call(this, result.data);
        return result;
      }
    },
    receive: {
      args : ['data', 'received_data', '[id]'],
      proxy: function(data, received_data, id) {
        data = JSON.parse(data);
        data = Private.unpackData.call(this, data);
        received_data = JSON.parse(received_data);
        id = (id)? id: null;
        var result = Private.callAPI.call(this, 'receive', [data, received_data, id]);
        result.data = Private.packData.call(this, result.data);
        return result;
      }
    },
  };

  // Experiment constructor
  var Experiment = function(defaultBehaviour) {
    if (!defaultBehaviour) defaultBehaviour = {};
    for (var type in API) {
      if (!defaultBehaviour[type]) {
        defaultBehaviour[type] = (function(type) {
          throw new Error('Default API behaviour [' + type + '] is undefined');
        }).bind(null, type);
      }
    }
    this.behaviours = {};
    this.setState('default', defaultBehaviour);
    this.transit('default');
  };

  // add state
  Experiment.prototype.setState = function(state, behaviour) {
    this.behaviours[state] = behaviour;
  };

  // transit state
  Experiment.prototype.transit = function(state) {
    this.state = state;
  };

  // run API
  Experiment.prototype.run = function(args) {
    if (!args || args.length < 1) throw new Error('API type is null');
    var calledType = args[0];
    for (var type in API) {
      if (type !== calledType) continue;
      var result = API[type].proxy.apply(this, args.slice(1));
      return result;
    }
    throw new Error('Received unknown API type ['+ calledType +']');
  };

  // private methods
  var Private = {
    // unpack state from data
    unpackData: function(container) {
      this.transit(container.state);
      return container.data;
    },
    // pack state to data
    packData: function(data) {
      var container = {state: this.state, data: data};
      return container;
    },
    // API caller
    callAPI: function(type, args) {
      if (!this.behaviours[this.state]) throw new Error('State [' + this.state + '] is undefined');
      var state = (this.behaviours[this.state][type])? this.state: 'default';
      args = (args)? args: [];
      return this.behaviours[state][type].apply(this, args);
    }
  };

  // module export
  return Experiment;
})();
