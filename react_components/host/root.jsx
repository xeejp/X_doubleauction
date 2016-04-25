import React from 'react'
import LinearProgress from 'material-ui/lib/linear-progress';
import CircularProgress from 'material-ui/lib/circular-progress';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import Moderator from './moderator.jsx';
import ParticipantsList from './participantslist.jsx';
import Config from './config.jsx';
import Controler from './controler.jsx';
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
      <Card>
        <CardHeader title={"ダブルオークション実験"}/>
          <CardText>
            <Card>
              <CardText>
                  <h5 children="実験ID"/>
                  <h3>{_x_token}</h3>
              </CardText>
            </Card>
            <Card>
              <CardHeader title="実験の操作"/>
              <CardText>
                <Moderator />
              </CardText>
            </Card>
            <Card actAsExpander={true} showExpandableButton={true} initiallyExpanded={false}>
              <CardHeader
                title={"参加者一覧  (現在の参加者数: " + Object.keys(this.state.participants).length + "人, 現在の取引成立数: " + Object.keys(this.state.orders.concluded).length + ")"}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText actAsExpander={true} expandable={true}>
                <ParticipantsList participants={this.state.participants} />
              </CardText>
            </Card>
            <Card actAsExpander={true} showExpandableButton={true} initiallyExpanded={false}>
              <CardHeader
                title="グラフ"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText actAsExpander={true} expandable={true}>
                  {(function() {
                      if (this.state.host.state == "result")
                      {
                          var N = Object.keys(this.state.participants).length;
                          var data = [];
                          for (var i = 1; i <= N / 2; i++) {
                            data.push({x: i, supply: i * 200, demand: ((N / 2) - i + 1) * 200 - 100})
                          }
                        return <DemandAndSupplyCurve data={data}/>
                      } else {
                        return <p>現在需要供給グラフは表示できません</p>
                      }
                  }).call(this)}
                  {(function() {
                      if (this.state.host.state == "result" && Object.keys(this.state.participants).length > 0)
                      {
                        let start = this.state.orders.concluded[0].buying.timestamp
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
                        return <PriceCurve prices={prices} />
                      } else {
                        return <p>現在価格曲線グラフは表示できません</p>
                      }
                  }).call(this)}
              </CardText>
            </Card>
            <Card>
              <CardHeader title="特定のユーザーとしてログイン"/>
              <CardText>
                <Controler participants={this.state.participants} />
              </CardText>
            </Card>
          </CardText>
        </Card>
    );
  }
});
