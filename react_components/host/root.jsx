import React from 'react'
var Moderator = require('./moderator.jsx');
var ParticipantsList = require('./participantslist.jsx');
var DebugForm = require('./debug/debugform.jsx');
var Config = require('./config.jsx');

import LinearProgress from 'material-ui/lib/linear-progress';
import CircularProgress from 'material-ui/lib/circular-progress';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
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
      <div>
        <Config title='実験の操作'>
          <Moderator />
        </Config>
        <Config title='データ送信'>
          <DebugForm />
        </Config>
        <Config title='参加者一覧'>
          <ParticipantsList participants={this.state.participants} />
        </Config>
      </div>
    );
  }
});
