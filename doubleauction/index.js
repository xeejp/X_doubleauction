var double_auction = require('./doubleauction.js');
var result = double_auction(process.argv.slice(2));
console.log(JSON.stringify(result));
