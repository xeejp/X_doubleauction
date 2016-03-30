var ExperimentTest = function(script, data) {
  this.script = script;
  this.data = JSON.stringify({});
}
ExperimentTest.prototype.log = function(title, str) {
  if (!str) str = '';
  console.log(title + ' : ' + str);
  return this;
};
ExperimentTest.prototype.init = function() {
  this.log('INIT');
  var result = this.script.init();
  this.data = extractData(result);
  return this;
};
ExperimentTest.prototype.join = function(id) {
  this.log('JOIN', id);
  var result = this.script.join(this.data, id);
  this.data = extractData(result);
  return this;
};
ExperimentTest.prototype.receive = function(received_data, id) {
  this.log('RECEIVE', ((id)? id: '__ADMIN__'));
  var result = (id)?
    this.script.receive(this.data, JSON.stringify(received_data), id):
    this.script.receive(this.data, JSON.stringify(received_data));
  this.data = extractData(result);
  return this;
};
ExperimentTest.prototype.dump = function(str) {
  this.log('DUMP', (str)? str: null);
  console.log(JSON.stringify(JSON.parse(this.data), null, ' '));
  return this;
};

function extractData(result) {
  return JSON.stringify(JSON.parse(result).data);
}

module.exports = ExperimentTest;
