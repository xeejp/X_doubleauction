import React from 'react';
import LinearProgress from 'material-ui/lib/linear-progress';
import CircularProgress from 'material-ui/lib/circular-progress';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
var Explain = require('./explain.jsx');
var Experiment = require('./experiment/experiment.jsx');
var Market = require('./experiment/market.jsx');
import { DemandAndSupplyCurve, PriceCurve } from './experiment/result.jsx'

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
        return (<CircularProgress />);
    }
    return (
      <div className={'page_' + this.state.page}>
        {(function() {
          switch (this.state.page) {
            case 'wait':
              return (
                <div>実験開始までしばらくお待ち下さい
                <LinearProgress mode="indeterminate"/>
                </div>
              );
            case 'experiment':
              return (
                <Experiment role={this.state.role} status={this.state.status} orders={this.state.orders} />
              );
            case 'result':
              let start = this.state.orders.concluded[0].buying.timestamp
              let prices = this.state.orders.concluded.map(({ buying }) => { return {timestamp: buying.timestamp - start, price: buying.value} })
              return (
                <div>
                  <h1>Result</h1>
                  <Market selling={this.state.orders.selling} buying={this.state.orders.buying} concluded={this.state.orders.concluded} />
                  <DemandAndSupplyCurve orders={this.state.orders} />
                  <PriceCurve prices={prices} />
                </div>
              );
            default:
              console.log(this.state.page)
              return (
                <Explain />
              );
          }
        }).call(this)}
      </div>
    );
  }
});
