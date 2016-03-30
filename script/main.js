var Experiment = require('./lib/experiment.js');
var Enumerable = require('./lib/enumerable.js');
var Host = require('./class/host.js');
var Participant = require('./class/participant.js');

module.exports = new Experiment({
  init: function() {
    return createResult({
      host: Host.create().getObject(),
      participants: {},
      orders: {
        selling: [],
        buying : [],
        concluded: [],
        cancelled: [],
      }
    });
  },
  join: function(data, id) {
    if (!data.participants.hasOwnProperty(id)) { // bug?
      data.participants[id] = Participant.create(id).getObject();
    }
    return createResult(data);
  },
  receive: function(data, received_data, id) {
    if (received_data.type) {
      received_data.options = received_data.options || {};
      if (id) {
        var participant = new Participant(data.participants[id])
        participant.doAction(received_data.type, received_data.options, data);
      } else {
        var host = new Host(data.host);
        host.doAction(received_data.type, received_data.options, data);
      }
    }
    return createResult(data);
  },
});

function createResult(data) {
  var host = Host(data.host).createTemplate(data);
  var participant = Enumerable.from(data.participants)
    .toObject('$.key', function($) {
      return Participant($.value).createTemplate(data);
    });
  return {
    data: data,
    host: host,
    participant: participant,
  };
}
