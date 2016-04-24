import React from 'react';
import LinearProgress from 'material-ui/lib/linear-progress';
import CircularProgress from 'material-ui/lib/circular-progress';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import Explain from './explain.jsx';
import Experiment from './experiment/experiment.jsx';
import Market from './experiment/market.jsx';
import { DemandAndSupplyCurve, PriceCurve } from '../common/result.jsx'

module.exports = React.createClass({
  getInitialState: function() {
    return {loading: true};
  },
  componentDidMount: function() {
    X.onUpdate(this.onUpdate);
  },
  onUpdate: function(data) {
    this.setState(Object.assign({}, data, {loading: false}));
  },
  render: function () {
    if (this.state.loading) {
        return (<center><CircularProgress /></center>);
    }
    return (
        <div className={'page_' + this.state.page}>
        <Card>
          <CardHeader title="ダブルオークション"/>
          <CardText>
            {(function() {
              switch (this.state.page) {
                case 'wait':
                  return (
                    <Explain role={this.state.role} status={this.state.status}/>
                  );
                case 'experiment':
                  return (
                    <Experiment role={this.state.role} status={this.state.status} orders={this.state.orders} />
                  );
                case 'result':
                  var N = Object.keys(this.state.orders.concluded).length * 2 + Object.keys(this.state.orders.selling).length + Object.keys(this.state.orders.buying).length;
                  var data = [];
                  for (var i = 1; i <= N / 2; i++) {
                      data.push({x: i, supply: i * 200, demand: ((N / 2) - i + 1) * 200 - 100})
                  }
                  let start = Math.max(this.state.orders.concluded[0].buying.timestamp , this.state.orders.concluded[0].selling.timestamp)
                  let prices = this.state.orders.concluded.map(({ buying, selling }) => {
                      var time, price;
                      if (buying.timestamp > selling.timestamp) {
                          time = buying.timestamp;
                          price = buying.value
                      } else {
                          time = selling.timestamp;
                          price = selling.value
                      }
                      return {timestamp: time - start, price: price}
                  })
                  return (
                      <div>
                        <Card>
                          <CardHeader title="結果"/>
                          <CardText>
                              {((this.state.status.goods == 0 && this.state.role == "buyer") || (this.state.status.goods != 0 && this.state.role == "seller")) ? <p>取引は成立しませんでした。</p> : <div>
                                  <p>{this.state.role == "seller" ? this.state.status.sales : this.state.status.paid}円で取引が成功しました。</p>
                                  <p>あなたは、{this.state.role == "seller" ? this.state.status.sales - this.state.status.cost : this.state.status.willingness - this.state.status.paid}円得しました。</p>
                              </div>}
                            <Card actAsExpander={true} showExpandableButton={true} initiallyExpanded={false}>
                              <CardHeader
                                title="表"
                                actAsExpander={true}
                                showExpandableButton={true}
                              />
                              <CardText expandable={true}>
                                <Market selling={this.state.orders.selling} buying={this.state.orders.buying} concluded={this.state.orders.concluded} />
                              </CardText>
                            </Card>
                            <Card actAsExpander={true} showExpandableButton={true} initiallyExpanded={false}>
                              <CardHeader
                                title="グラフ"
                                actAsExpander={true}
                                showExpandableButton={true}
                              />
                              <CardText expandable={true}>
                                <DemandAndSupplyCurve data={data} />
                                <PriceCurve prices={prices} />
                              </CardText>
                            </Card>
                          </CardText>
                        </Card>
                      </div>
                  );
                default:
                  return (
                    <div><p>実験開始までしばらくお待ち下さい</p><br />
                    <LinearProgress mode="indeterminate"/>
                    </div>
                  );
              }
            }).call(this)}
          </CardText>
        </Card>
      </div>
    );
  }
});
