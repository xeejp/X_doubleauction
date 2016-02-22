module.exports = (function() {
  var Instruction = require('./instruction.jsx');
  var Market = require('./market.jsx');
  var MarketForm = require('./marketform.jsx');

  return React.createClass({
    render: function() {
      var data = this.props.data;
      return (
        <div>
          <h1>ダブルオークション</h1>
          <Instruction role={data.student.role} cost={data.student.cost} payable={data.student.payable} money={data.student.money} properties={data.student.properties} />
          <br/>
          <div>
            <MarketForm sendValueCallback={this.sendValueCallback} />
          </div>
          <br/>
          <div>
            他の参加者は以下の価格を提示しています<br/>
            <Market sell={data.list.sell} buy={data.list.buy} finish={data.list.finish} />
          </div>
          <br/>
        </div>
      );
    },
    sendValueCallback: function(value){
      send_data({offer: value});
    }
  });
})();
