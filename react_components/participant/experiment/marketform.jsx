import React from 'react';
import LinearProgress from 'material-ui/lib/linear-progress';
import CircularProgress from 'material-ui/lib/circular-progress';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
module.exports = (function() {
  return React.createClass({
    getInitialState() {
       return {
            errorText: null
        }
    },
    checkValue: function() {
      var value = this.refs.order.value;
      if ((/[^0-9]+/).test(value)) {
        this.setState({errorText: "数値のみ入力可能です"})
      } else {
        this.setState({errorText: null});
      }
    },
    sendValue: function() {
      var value = this.refs.order.value;
      if ((/[^0-9]+/).test(value)) {
        // alert(pleaseinputnumber);
      } else {
        this.props.sendValueCallback(parseInt(value));
      }
      this.refs.order.value = '';
    },
    sendCancel: function() {
      X.sendData('cancelOrder');
    },
    render: function() {
      return (
        <div>
          <input type="text" ref="order" onKeyPress={this.onKeyPress} />
          <TextField ref="order" hintText="価格を提示してください" errorText={this.state.errorText} onEnterKeyDown={this.sentValue}/>
          <RaisedButton label="提示" backgroundColor="#81F781" onMouseDown={this.sendValue} style={{margin: 12}} />
          <RaisedButton label="取消" backgroundColor="#FE2E64" onMouseDown={this.sendCancel} style={{margin: 12}} />
        </div>
      );
    },
  });
})();
