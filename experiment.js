var _experiment = new Experiment(_topic, _token);
var X = {
  global: this,
  onUpdate: function(callback) {
    _experiment.onUpdate(function(data) {
      console.log('onUpdate');
      console.log(data);
      callback(data);
    });
  },
  sendData: function(type, options) {
    var data = {
      type: type,
      options: options
    };
    console.log('sendData');
    console.log(data);
    _experiment.send_data(data);
  },
};
