module.exports = React.createClass({
  onClick: function() {
    var type = this.refs.type.value;
    var options = this.refs.options.value;
    try {
      options = JSON.parse(options);
    } catch (e) {
    }
    X.sendData(type, options);
  },
  render: function () {
    return (
      <div>
        <input type="text" ref="type" />
        <span>:</span>
        <input type="text" ref="options" />
        <button onClick={this.onClick.bind(this)}>Submit</button>
      </div>
    );
  }
});
