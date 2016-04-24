import React from 'react';
import LinearProgress from 'material-ui/lib/linear-progress';
import CircularProgress from 'material-ui/lib/circular-progress';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

module.exports = React.createClass({
  createEvent: function(type, options) {
    options = options || {};
    return (function() {
      this.onClick(type, options);
    }).bind(this);
  },
  onClick: function(type, options) {
    X.sendData(type, options);
  },
  render: function () {
    return (
      <div>
        <RaisedButton label="マッチング" backgroundColor="#81F781" onMouseDown={this.createEvent('doMatching')} style={{margin: 12}} />
        <RaisedButton label="開始" backgroundColor="#81F781" onMouseDown={this.createEvent('start')} style={{margin: 12}} />
        <RaisedButton label="終了" backgroundColor="#FE2E64" onMouseDown={this.createEvent('finish')} style={{margin: 12}} />
      </div>
    );
  }
});
