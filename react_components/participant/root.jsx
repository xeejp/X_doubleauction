var Explain = require('./explain.jsx');
var Experiment = require('./experiment/experiment.jsx');
var Market = require('./experiment/market.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {loading: true};
  },
  componentDidMount: function() {
    X.onUpdate(this.onUpdate.bind(this));
  },
  onUpdate: function(data) {
    data.loading = false;
    this.setState(data);
  },
  render: function () {
    if (this.state.loading) {
      return (
        <div>Now loading...</div>
      );
    }
    return (
      <div className={'page_' + this.state.page}>
        {(function() {
          switch (this.state.page) {
            case 'wait':
              return (
                <div>実験開始までしばらくお待ち下さい</div>
              );
            case 'experiment':
              return (
                <Experiment role={this.state.role} status={this.state.status} orders={this.state.orders} />
              );
            case 'result':
              return (
                <div>
                  <h1>Result</h1>
                  <Market selling={this.state.orders.selling} buying={this.state.orders.buying} concluded={this.state.orders.concluded} />
                </div>
              );
            default:
              return;
          }
        }).call(this)}
      </div>
    );
  }
});
