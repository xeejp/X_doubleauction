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
        return (<CircularProgress />);
    }
    return (
      <div>
        <Card>
          <CardHeader title="実験の操作"/>
          <CardText>
            <Moderator />
          </CardText>
        </Card>
        <Card actAsExpander={true} showExpandableButton={true} initiallyExpanded={true}>
          <CardHeader
            title="参加者一覧"
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
              <DemandAndSupplyCurve orders={this.state.orders} />
              {(function() {
                  if (this.state.host.state == "result")
                  {
                    let start = this.state.orders.concluded[0].buying.timestamp
                    let prices = this.state.orders.concluded.map(({ buying }) => { return {timestamp: buying.timestamp - start, price: buying.value} })
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
      </div>
    );
  }
});
