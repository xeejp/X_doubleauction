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
        <button onClick={this.createEvent('doMatching')}>マッチング</button>
        <button onClick={this.createEvent('start')}>開始</button>
        <button onClick={this.createEvent('finish')}>終了</button>
      </div>
    );
  }
});
