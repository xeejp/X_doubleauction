import React from 'react'
import Instruction from './instruction.jsx';
import Market from './market.jsx';
import MarketForm from './marketform.jsx';

module.exports = React.createClass({
  sendValueCallback: function(value){
    // TODO: validate value
    X.sendData('order', {value: value});
  },
  render: function() {
    var orders = this.props.orders;
    return (
      <div>
        <Instruction role={this.props.role} status={this.props.status} />
        <br/>
        <MarketForm role={this.props.role} status={this.props.status} sendValueCallback={this.sendValueCallback} />
        <br/>
        <p>他の参加者は以下の価格を提示しています</p>
        <br/>
        <Market selling={orders.selling} buying={orders.buying} concluded={orders.concluded} />
      </div>
    );
  },
});
