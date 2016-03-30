module.exports = (function() {
  return React.createClass({
    onKeyPress: function(e) {
      if (e.key === "Enter") {
        this.sendValue();
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
          価格を提示してください<br/>
          <input type="text" ref="order" onKeyPress={this.onKeyPress} />
          <button onClick={this.sendValue}>提示</button>
          <button onClick={this.sendCancel}>取消</button>
        </div>
      );
    },
  });
})();
