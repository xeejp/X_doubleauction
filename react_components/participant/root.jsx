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
        return (<CircularProgress />);
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
                  let start = this.state.orders.concluded[0].buying.timestamp
                  let prices = this.state.orders.concluded.map(({ buying }) => { return {timestamp: buying.timestamp - start, price: buying.value} })
                  return (
                      <div>
                        <Card>
                          <CardHeader title="結果"/>
                          <CardText>
                            <Card actAsExpander={true} showExpandableButton={true} initiallyExpanded={false}>
                              <CardHeader
                                title="表"
                                actAsExpander={true}
                                showExpandableButton={true}
                              />
                              <CardText>
                                <Market selling={this.state.orders.selling} buying={this.state.orders.buying} concluded={this.state.orders.concluded} />
                              </CardText>
                            </Card>
                            <Card actAsExpander={true} showExpandableButton={true} initiallyExpanded={false}>
                              <CardHeader
                                title="グラフ"
                                actAsExpander={true}
                                showExpandableButton={true}
                              />
                              <CardText>
                                <DemandAndSupplyCurve orders={this.state.orders} />
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
