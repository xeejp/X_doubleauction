// double_auction
var double_auction = require('../doubleauction.js');
var $ = JSON.stringify;
var operations = [
  ['init'],
  ['update'],
  ['join'   , '0001'],
  ['join'   , '0002'],
  ['receive', $({action: 'matchStudents'})],
  ['join'   , '0003'],
  ['join'   , '0004'],
  ['join'   , '0005'],
  ['join'   , '0006'],
  ['receive', $({action: 'matchRemainingStudents'})],
  ['receive', $({action: 'matchStudents'})],
  ['receive', $({action: 'start'})],
  ['receive', $({offer: 300}), '0001'],
  ['receive', $({offer: 300}), '0002'],
  ['receive', $({offer: 300}), '0003'],
  ['receive', $({offer: 300}), '0004'],
  ['receive', $({offer: 300}), '0005'],
  ['receive', $({offer: 300}), '0006'],
  ['receive', $({action: 'finish'})]
];

describe('DoubleAuction', function() {
  describe('sequential test', function() {
    it('case 1', function() {
      var log = '';
      var data = {};
      operations.forEach(function(args) {
        log += '--> ' + args.join(' ') + '\n\n';
        args.splice(1, 0, $(data));
        var result = double_auction.apply(null, args);
        log += '<-- ' + JSON.stringify(result.data) + '\n\n';
        data = result.data;
      });
      console.log(log);
    });
  });
});