var script = require('./../');
var ExperimentTest = require('./experimenttest.js');

var test = new ExperimentTest(script);
test
.init()
.join('02c57069-aa27-418a-a3b7-e3d58ea6954c')
.join('testID2')
.receive({type: 'doMatching'})
.receive({type: 'start'})
.receive({type: 'order', options: {value: 120}}, '02c57069-aa27-418a-a3b7-e3d58ea6954c')
.receive({type: 'cancelOrder'}, '02c57069-aa27-418a-a3b7-e3d58ea6954c')
.receive({type: 'order', options: {value: 120}}, 'testID2')
.dump('finish')
