var script = require('./script/');
var args = process.argv.slice(2);
var result = script[args.shift()].apply(null, args);
console.log(result);
