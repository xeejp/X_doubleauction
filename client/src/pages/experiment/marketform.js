module.exports = (function() {
  var MarketForm = React.createClass({
    propTypes: {
      sendValueCallback: React.PropTypes.func.isRequired
    },
    getValue: function() {
      return this.refs.valueBox.value;
    },
    render: function() {
      return (
        <div>
          価格を提示してください<br/>
          <input type="number" ref="valueBox" onKeyPress={this.onKeyPress} />
          <button onClick={this.sendValue}>提示</button>
        </div>
      );
    },
    onKeyPress: function(e) {
      if (e.key === "Enter") {
        this.sendValue();
      }
    },
    sendValue: function() {
      this.props.sendValueCallback(this.getValue());
      this.refs.valueBox.value = 0;
    }
  });
  return MarketForm;
})();
