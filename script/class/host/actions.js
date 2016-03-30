var Enumerable = require('./../../lib/enumerable.js');
var Host = require('./../host.js');
var Participant = require('./../participant.js');

module.exports = {
  reset: function(data, options) {
    data.host = Host.create().getObject();
    data.participants = Object.keys(data.participants)
      .map(function(id) {
        return Participant.create(id).getObject();
      });
  },
  doMatching: function(data, options) {
    var num = Enumerable.from(data.participants)
      .count();
    if (num < 2) return;

    var counter = 1;
    Enumerable.from(data.participants)
      .shuffle()
      .doAction(function(dict) {
        var participant = Participant(dict.value);
        if (counter % 2) {
          participant.becomeSeller(counter * 100);
        } else {
          participant.becomeBuyer(counter * 100);
        }
        participant.set('page', 'wait');
        counter++;
      })
      .force();
    this.set('state', 'ready');
  },
  start: function(data, options) {
    Enumerable.from(data.participants)
      .select(function(dict) {
        return Participant(dict.value);
      })
      .where(function(participant) {
        return participant.hasRole();
      })
      .doAction(function(participant) {
        participant.set('page', 'experiment');
      })
      .force();
    this.set('state', 'experiment');
  },
  finish: function(data, options) {
    Enumerable.from(data.participants)
      .select(function(dict) {
        return Participant(dict.value);
      })
      .where(function(participant) {
        return participant.get('page') == 'experiment';
      })
      .doAction(function(participant) {
        participant.set('page', 'result');
      })
      .force();
    this.set('state', 'result');
  },
};
