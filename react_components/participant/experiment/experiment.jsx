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
      var role = this.props.role;
      var status = this.props.status;
    return (
      <div>
        <Instruction role={role} status={status} />
        <br/>
        {((status.goods == 0 && role == "buyer") || (status.goods != 0 && role == "seller")) ?
            <MarketForm
                ordering={this.props.ordering}
                order={this.props.order}
                role={role}
                status={status}
                sendValueCallback={this.sendValueCallback} /> : <div>
            <p>{role == "seller" ? status.sales : status.paid}円で取引が成功しました。</p>
            <p>あなたは、{role == "seller" ? status.sales - status.cost : status.willingness - status.paid}円得しました。</p>
        </div>}
        <br/>
        <p>他の参加者は以下の価格を提示しています</p>
        <br/>
        <Market selling={orders.selling} buying={orders.buying} concluded={orders.concluded} />
      </div>
    );
  },
});
