import React from 'react'
var Instruction = require('./instruction.jsx');
var Market = require('./market.jsx');
var MarketForm = require('./marketform.jsx');

module.exports = React.createClass({
  sendValueCallback: function(value){
    // TODO: validate value
    X.sendData('order', {value: value});
  },
  render: function() {
    var orders = this.props.orders;
    return (
      <div>
        <h1>ダブルオークション</h1>
        <Instruction role={this.props.role} status={this.props.status} />
        <br/>
        <MarketForm sendValueCallback={this.sendValueCallback} />
        <br/>
        <p>他の参加者は以下の価格を提示しています</p>
        <br/>
        <Market selling={orders.selling} buying={orders.buying} concluded={orders.concluded} />
      </div>
    );
  },
});
