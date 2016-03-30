var _ex = this.require('web/static/js/app');
var _experiment = new _ex.Experiment(_topic, _token);

var X = {
  global: this,
  onUpdate: function(callback) {
    _experiment.onUpdate(function(data) {
      console.log('onUpdate');
      console.log(data);
      callback(data);
    });
  },
  sendData: function(type, options) {
    var data = {
      type: type,
      options: options
    };
    console.log('sendData');
    console.log(data);
    _experiment.send_data(data);
  },
};
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
  propTypes: {
    head: React.PropTypes.arrayOf(React.PropTypes.array),
    body: React.PropTypes.arrayOf(React.PropTypes.array),
    foot: React.PropTypes.arrayOf(React.PropTypes.array)
  },
  getDefaultProps: function() {
    return {
      className: 'pure-table',
      head: [[]],
      body: [[]],
      foot: [[]]
    };
  },
  render: function() {
    var head = this.props.head;
    var body = this.props.body;
    var foot = this.props.foot;
    return (
      React.createElement("table", {className: this.props.className, style: {border: 'solid 1px'}}, 
        React.createElement("thead", null, 
          head.map(function(row, i) {
            return createRow(row, i, true);
          })
        ), 
        React.createElement("tbody", null, 
          body.map(function(row, i) {
            return createRow(row, i);
          })
        ), 
        React.createElement("tfoot", null, 
          foot.map(function(row, i) {
            return createRow(row, i);
          })
        )
      )
    );
  }
});

function createRow(row, key, isHeader) {
  return (
    React.createElement("tr", {key: key, style: {border: 'solid 1px'}}, 
      row.map(function(data, i) {
        if (isHeader) { 
          return (React.createElement("th", {key: i, style: {border: 'solid 1px'}}, data));
        } else {
          return (React.createElement("td", {key: i, style: {border: 'solid 1px'}}, data));
        }
      })
    )
  );
}

},{}],2:[function(require,module,exports){
var Root = require('./host/root.jsx');

ReactDOM.render(
  React.createElement(Root, null),
  document.getElementById("content")
);

},{"./host/root.jsx":7}],3:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
  getDefaultProps: function() {
    return {
      title: ''
    };
  },
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, this.props.title), 
        this.props.children
      )
    );
  }
});

},{}],4:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
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
      React.createElement("div", null, 
        React.createElement("input", {type: "text", ref: "type"}), 
        React.createElement("span", null, ":"), 
        React.createElement("input", {type: "text", ref: "options"}), 
        React.createElement("button", {onClick: this.onClick.bind(this)}, "Submit")
      )
    );
  }
});

},{}],5:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
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
      React.createElement("div", null, 
        React.createElement("button", {onClick: this.createEvent('doMatching')}, "マッチング"), 
        React.createElement("button", {onClick: this.createEvent('start')}, "開始"), 
        React.createElement("button", {onClick: this.createEvent('finish')}, "終了")
      )
    );
  }
});

},{}],6:[function(require,module,exports){
var Table = require('./../common/table.jsx');

module.exports = React.createClass({displayName: "exports",
  render: function () {
    var participants = this.props.participants;
    var body = Object.keys(participants).map(function(id) {
      var status = createTable(participants[id]);
      return [id, status];
    });
    return (
      React.createElement(Table, {head: [['ID', 'STATUS']], body: body, foot: [['Total', body.length]]})
    );
  }
});

function createTable(data) {
  var body = Object.keys(data).map(function(key) {
    var value = data[key];
    if (value && typeof value == 'object') {
      value = createTable(value);
    } else if (typeof value != 'string' && typeof value != 'number') {
      value = JSON.stringify(value, null, '  ');
    }
    return [key, value];
  });
  return React.createElement(Table, {body: body})
}

},{"./../common/table.jsx":1}],7:[function(require,module,exports){
var Moderator = require('./moderator.jsx');
var ParticipantsList = require('./participantslist.jsx');
var DebugForm = require('./debug/debugform.jsx');
var Config = require('./config.jsx');

module.exports = React.createClass({displayName: "exports",
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
        React.createElement("div", null, "Now loading...")
      );
    }
    return (
      React.createElement("div", null, 
        React.createElement(Config, {title: "実験の操作"}, 
          React.createElement(Moderator, null)
        ), 
        React.createElement(Config, {title: "データ送信"}, 
          React.createElement(DebugForm, null)
        ), 
        React.createElement(Config, {title: "参加者一覧"}, 
          React.createElement(ParticipantsList, {participants: this.state.participants})
        )
      )
    );
  }
});

},{"./config.jsx":3,"./debug/debugform.jsx":4,"./moderator.jsx":5,"./participantslist.jsx":6}]},{},[2]);
