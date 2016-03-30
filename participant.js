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
module.exports = (function() {
  return React.createClass({
    getInitialState: function() {
      return { page: 0 };
    },
    render: function() {
      var pages = React.Children.toArray(this.props.children);
      return (
        React.createElement("div", null, 
          pages[this.state.page], React.createElement("br", null), 
          (this.hasPage(this.state.page - 1))? React.createElement("button", {onClick: function(){this.shiftPage(-1);}}, "戻る"): null, 
          (this.hasPage(this.state.page + 1))? React.createElement("button", {onClick: function(){this.shiftPage( 1);}}, "次へ"): null
        )
      );
    },
    hasPage: function(page) {
      if (page < 0 || page >= React.Children.count(this.props.children)) return false;
      return true;
    },
    shiftPage: function(page) {
      this.setState(function(state, props) {
        if (this.hasPage(state.page + page)) state.page += page;
        return state;
      });
    }
  });
})();

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
var Root = require('./participant/root.jsx');

ReactDOM.render(
  React.createElement(Root, null),
  document.getElementById("content")
);

},{"./participant/root.jsx":9}],4:[function(require,module,exports){
var Instruction = require('./instruction.jsx');
var Market = require('./market.jsx');
var MarketForm = require('./marketform.jsx');

module.exports = React.createClass({displayName: "exports",
  sendValueCallback: function(value){
    // TODO: validate value
    X.sendData('order', {value: value});
  },
  render: function() {
    var orders = this.props.orders;
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, "ダブルオークション"), 
        React.createElement(Instruction, {role: this.props.role, status: this.props.status}), 
        React.createElement("br", null), 
        React.createElement(MarketForm, {sendValueCallback: this.sendValueCallback}), 
        React.createElement("br", null), 
        React.createElement("p", null, "他の参加者は以下の価格を提示しています"), 
        React.createElement("br", null), 
        React.createElement(Market, {selling: orders.selling, buying: orders.buying, concluded: orders.concluded})
      )
    );
  },
});

},{"./instruction.jsx":5,"./market.jsx":6,"./marketform.jsx":7}],5:[function(require,module,exports){
module.exports = (function() {
  return React.createClass({
    render: function() {
      var status = this.props.status;
      return (
        React.createElement("div", null, 
          (function() {
            switch (this.props.role) {
              case 'seller':
                return (
                  React.createElement("div", null, 
                    "あなたは売り手です", React.createElement("br", null), 
                    "あなたは財を", status.cost, "円で生産できます", React.createElement("br", null)
                  )
                );
              case 'buyer':
                return (
                  React.createElement("div", null, 
                    "あなたは買い手です", React.createElement("br", null), 
                    "あなたは合計", status.willingness, "円まで支払えます", React.createElement("br", null)
                  )
                );
            }
          }).call(this)
        )
      );
    }
  });
})();

},{}],6:[function(require,module,exports){
var Table = require('./../../common/table.jsx');

module.exports = React.createClass({displayName: "exports",
  render: function() {
    var selling = this.props.selling.map(function(d){ return [d.value]; });
    var buying = this.props.buying.map(function(d){ return [d.value]; });
    var concluded = this.props.concluded.map(function(d){ return [d.value]; });
    var style = {
      verticalAlign: 'top',
      display: 'table-cell'
    };
    return (
      React.createElement("table", null, 
        React.createElement("tbody", null, 
          React.createElement("tr", null, 
            React.createElement("td", {style: style}, 
              React.createElement(Table, {head: [['売値']], body: selling})
            ), 
            React.createElement("td", {style: style}, 
              React.createElement(Table, {head: [['買値']], body: buying})
            ), 
            React.createElement("td", {style: style}, 
              React.createElement(Table, {head: [['成立価格']], body: concluded})
            )
          )
        )
      )
    );
  },
});

},{"./../../common/table.jsx":2}],7:[function(require,module,exports){
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
        React.createElement("div", null, 
          "価格を提示してください", React.createElement("br", null), 
          React.createElement("input", {type: "text", ref: "order", onKeyPress: this.onKeyPress}), 
          React.createElement("button", {onClick: this.sendValue}, "提示"), 
          React.createElement("button", {onClick: this.sendCancel}, "取消")
        )
      );
    },
  });
})();

},{}],8:[function(require,module,exports){
module.exports = (function() {
  var PageView = require('./../common/page_view.jsx');

  return React.createClass({
    render: function() {
      return (
        React.createElement(PageView, null, 
          React.createElement("div", null, 
            React.createElement("h1", null, "説明"), 
            "これから行う実験について説明します", React.createElement("br", null), 
            "また、この説明はあなたのペースで読み進めることができます", React.createElement("br", null), 
            "[次へ]ボタンをクリックしてください", React.createElement("br", null)
          ), 
          React.createElement("div", null, 
            React.createElement("h1", null, "説明"), 
            "あなたの役割は", this.props.role, "です。", React.createElement("br", null), 
            "[前へ]ボタンをクリックすると前のページヘ戻ることができます", React.createElement("br", null)
          ), 
          React.createElement("div", null, 
            React.createElement("h1", null, "説明"), 
            "工事中...", React.createElement("br", null)
          ), 
          React.createElement("div", null, 
            React.createElement("h1", null, "説明"), 
            "実験開始までこのままお待ち下さい", React.createElement("br", null)
          )
        )
      );
    }
  });
})();

},{"./../common/page_view.jsx":1}],9:[function(require,module,exports){
var Explain = require('./explain.jsx');
var Experiment = require('./experiment/experiment.jsx');
var Market = require('./experiment/market.jsx');

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
      React.createElement("div", {className: 'page_' + this.state.page}, 
        (function() {
          switch (this.state.page) {
            case 'wait':
              return (
                React.createElement("div", null, "実験開始までしばらくお待ち下さい")
              );
            case 'experiment':
              return (
                React.createElement(Experiment, {role: this.state.role, status: this.state.status, orders: this.state.orders})
              );
            case 'result':
              return (
                React.createElement("div", null, 
                  React.createElement("h1", null, "Result"), 
                  React.createElement(Market, {selling: this.state.orders.selling, buying: this.state.orders.buying, concluded: this.state.orders.concluded})
                )
              );
            default:
              return;
          }
        }).call(this)
      )
    );
  }
});

},{"./experiment/experiment.jsx":4,"./experiment/market.jsx":6,"./explain.jsx":8}]},{},[3]);
