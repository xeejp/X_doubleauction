var Moderator = require('./moderator.jsx');
var ParticipantsList = require('./participantslist.jsx');
var DebugForm = require('./debug/debugform.jsx');
var Config = require('./config.jsx');

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
