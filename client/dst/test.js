(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = (function() {
  var callback = function(){};
  function setData(data) {
    console.log(data);
    console.log('updateData');
    callback(data);
  }
  function sendData(data) {
    console.log('SendData: ' + JSON.stringify(data));
    return;
  }
  return {
    send_data: sendData,
    setCallback: function(_callback) {
      callback = _callback;
    },
  };
})();

},{}],2:[function(require,module,exports){
module.exports = (function() {
  var Environment = require('environment');
  var Instruction = require('./instruction.js');
  var Market = require('./market.js');
  var MarketForm = require('./marketform.js');

  var Experiment = React.createClass({displayName: "Experiment",
    render: function() {
      var data = this.props.data;
      return (
        React.createElement("div", null, 
          React.createElement("h1", null, "ダブルオークション"), 
          React.createElement(Instruction, {role: data.student.role, cost: data.student.cost, payable: data.student.payable, money: data.student.money, properties: data.student.properties}), 
          React.createElement("br", null), 
          React.createElement("div", null, 
            React.createElement(MarketForm, {sendValueCallback: this.sendValueCallback})
          ), 
          React.createElement("br", null), 
          React.createElement("div", null, 
            "他の参加者は以下の価格を提示しています", React.createElement("br", null), 
            React.createElement(Market, {sell: data.list.sell, buy: data.list.buy, finish: data.list.finish})
          ), 
          React.createElement("br", null)
        )
      );
    },
    sendValueCallback: function(value){
      Environment.send_data({offer: value});
    }
  });
  return Experiment;
})();

},{"./instruction.js":3,"./market.js":4,"./marketform.js":5,"environment":1}],3:[function(require,module,exports){
module.exports = (function() {
  var Instruction = React.createClass({displayName: "Instruction",
    propTypes:{
      role      : React.PropTypes.string.isRequired,
      cost      : React.PropTypes.number.isRequired,
      payable   : React.PropTypes.number.isRequired,
      properties: React.PropTypes.number.isRequired,
      money     : React.PropTypes.number.isRequired,
    },
    render: function() {
      return (
        React.createElement("div", null, 
          (function() {
            switch (this.props.role) {
              case 'seller':
                return (
                  React.createElement("div", null, 
                    "あなたは売り手です", React.createElement("br", null), 
                    "あなたは財を最大", this.props.properties, "個生産できます", React.createElement("br", null), 
                    "あなたは財を1個あたり", this.props.cost, "円で生産できます", React.createElement("br", null)
                  )
                );
              case 'buyer':
                return (
                  React.createElement("div", null, 
                    "あなたは買い手です", React.createElement("br", null), 
                    "あなたは合計", this.props.payable, "円まで支払えます", React.createElement("br", null), 
                    "あなたはあと", this.props.money, "円持っています", React.createElement("br", null)
                  )
                );
            }
          }).bind(this)()
        )
      );
    }
  });
  return Instruction;
})();

},{}],4:[function(require,module,exports){
module.exports = (function() {
  var Table = React.createClass({displayName: "Table",
    propTypes: {
      head: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]))),
      body: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]))),
      foot: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]))),
    },
    getDefaultProps: function() {
      return {
        className: '',
      };
    },
    render: function() {
      var alignLeft = {align: 'left'};
      return (
        React.createElement("table", {className: this.props.className}, 
          (function() {
            if (this.props.head == null) return;
            return (
              React.createElement("thead", null, 
                this.props.head.map(function(row, r){return (
                  React.createElement("tr", {key: r}, 
                    row.map(function(data, i){ return (
                      React.createElement("th", {key: i}, data)
                    ); })
                  )
                ); })
              )
            );
          }).bind(this)(), 
          (function() {
            if (this.props.body == null) return;
            return (
              React.createElement("tbody", null, 
                this.props.body.map(function(row, r){ return (
                  React.createElement("tr", {key: r}, 
                    row.map(function(data, i){ return (
                      React.createElement("td", {key: i, style: alignLeft}, data)
                    ); })
                  )
                ); })
              )
            );
          }).bind(this)(), 
          (function() {
            if (this.props.foot == null) return;
            return (
              React.createElement("tfoot", null, 
                this.props.foot.map(function(row, r){ return (
                  React.createElement("tr", {key: r}, 
                    row.map(function(data, i){ return (
                      React.createElement("td", {key: i}, data)
                    ); })
                  )
                ); })
              )
            );
          }).bind(this)()
        )
      );
    }
  });

  var Market = React.createClass({displayName: "Market",
    propTypes: {
      sell  : React.PropTypes.arrayOf(React.PropTypes.number),
      buy   : React.PropTypes.arrayOf(React.PropTypes.number),
      finish: React.PropTypes.arrayOf(React.PropTypes.number),
    },
    render: function() {
      var style = {
        verticalAlign: 'top',
        display: 'table-cell'
      };
      return (
        React.createElement("table", null, 
          React.createElement("tbody", null, 
            React.createElement("tr", null, 
              React.createElement("td", {style: style}, React.createElement(Table, {className: "pure-table", head: [['売値']], body: this.props.sell.map(function(d){ return [d]; })})), 
              React.createElement("td", {style: style}, React.createElement(Table, {className: "pure-table", head: [['買値']], body: this.props.buy.map(function(d){ return [d]; })})), 
              React.createElement("td", {style: style}, React.createElement(Table, {className: "pure-table", head: [['成立価格']], body: this.props.finish.map(function(d){ return [d]; })}))
            )
          )
        )
      );
    },
  });
  return Market;
})();

},{}],5:[function(require,module,exports){
module.exports = (function() {
  var MarketForm = React.createClass({displayName: "MarketForm",
    propTypes: {
      sendValueCallback: React.PropTypes.func.isRequired
    },
    getValue: function() {
      return this.refs.valueBox.value;
    },
    render: function() {
      return (
        React.createElement("div", null, 
          "価格を提示してください", React.createElement("br", null), 
          React.createElement("input", {type: "number", ref: "valueBox", onKeyPress: this.onKeyPress}), 
          React.createElement("button", {onClick: this.sendValue}, "提示")
        )
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

},{}],6:[function(require,module,exports){
module.exports = (function() {
  var Explain = React.createClass({displayName: "Explain",
    getInitialState: function() {
      return { page: 0 };
    },
    render: function() {
      var explanations = React.Children.toArray(this.props.children);
      return (
        React.createElement("div", null, 
          React.createElement("h1", null, this.props.title), 
          explanations[this.state.page], React.createElement("br", null), 
          (this.hasPage(this.state.page - 1))? React.createElement("button", {onClick: this.shiftPagePrev}, "戻る"): null, 
          (this.hasPage(this.state.page + 1))? React.createElement("button", {onClick: this.shiftPageNext}, "次へ"): null
        )
      );
    },
    shiftPagePrev: function() {
      this.setState(function(state, props) {
        if (this.hasPage(state.page - 1)) state.page--;
        return state;
      });
    },
    shiftPageNext: function() {
      this.setState(function(state, props) {
        if (this.hasPage(state.page + 1)) state.page++;
        return state;
      });
    },
    hasPage: function(page) {
      if (page < 0) return false;
      if (page >= React.Children.count(this.props.children)) return false;
      return true;
    }
  });
  return Explain;
})();

},{}],7:[function(require,module,exports){
module.exports = (function() {
  var Explain = require('./pages/explain/explain.js');
  var Experiment = require('./pages/experiment/experiment.js');

  var Root = React.createClass({displayName: "Root",
    propTypes: {
      data: React.PropTypes.shape({
        state: React.PropTypes.string.isRequired,
        data: React.PropTypes.shape({
          student: React.PropTypes.shape({
            role : React.PropTypes.string,
            cost      : React.PropTypes.number,
            payable   : React.PropTypes.number,
            properties: React.PropTypes.number,
            money     : React.PropTypes.number
          }),
          list: React.PropTypes.shape({
            sell  : React.PropTypes.arrayOf(React.PropTypes.number),
            buy   : React.PropTypes.arrayOf(React.PropTypes.number),
            finish: React.PropTypes.arrayOf(React.PropTypes.number)
          })
        }).isRequired
      }).isRequired
    },
    getDefaultProps: function() {
      return {
        data: {
          state: 'default',
          data: {
            student: {
              role: 'default',
              cost      : 0,
              payable   : 0,
              properties: 0,
              money     : 0,
            },
            list: {
              sell  : [],
              buy   : [],
              finish: [],
            }
          }
        }
      };
    },
    render: function() {
      return (
        React.createElement("div", null, 
          React.createElement("center", null, 
            (function() {
              switch (this.props.data.state) {
                case 'default':
                  return (
                    React.createElement("div", null, "実験開始までしばらくお待ち下さい")
                  );
                case 'explain':
                  return (
                    React.createElement(Explain, {title: "説明"}, 
                      React.createElement("div", null, 
                        "これから行う実験について説明します", React.createElement("br", null), 
                        "また、この説明はあなたのペースで読み進めることができます", React.createElement("br", null), 
                        "[次へ]ボタンをクリックしてください", React.createElement("br", null)
                      ), 
                      React.createElement("div", null, 
                        "あなたの役割は", this.props.data.data.student.role, "です。", React.createElement("br", null), 
                        "[前へ]ボタンをクリックすると前のページヘ戻ることができます", React.createElement("br", null)
                      ), 
                      React.createElement("div", null, 
                        "工事中...", React.createElement("br", null)
                      ), 
                      React.createElement("div", null, 
                        "実験開始までこのままお待ち下さい", React.createElement("br", null)
                      )
                    )
                  );
                case 'experiment':
                  return (
                    React.createElement(Experiment, {data: this.props.data.data})
                  );
                default: return null;
              }
            }).bind(this)()
          )
        )
      );
    }
  });
  return Root;
})();

},{"./pages/experiment/experiment.js":2,"./pages/explain/explain.js":6}],8:[function(require,module,exports){
(function() {
  window.onload = (function() {
    var _root = require('./root.js');
    
    var callback;
    var DataStore = React.createClass({displayName: "DataStore",
      getInitialState: function() {
        return {
          data: {
            state: 'default',
            data: {
              student: {
                role: 'default',
                cost      : 0,
                payable   : 0,
                properties: 0,
                money     : 0
              },
              list: {
                sell  : [],
                buy   : [],
                finish: []
              }
            }
          }
        };
      },
      render: function() {
        callback = (function(data) {
          this.setState(function(state) {
            state.data = data;
            return state;
          });
        }).bind(this);
        return (
          React.createElement(_root, {data: this.state.data})
        );
      }
    });
    
    // render
    ReactDOM.render(
      React.createElement(DataStore, null),
      document.getElementById('content')
    );
    
    var defaultData = {
      state: 'default',
      data: {
        student: {
          role: 'seller',
          cost: 100,
          payable: 0,
          properties: 1,
          money: 0,
        },
        list: {
          sell  : [100, 200, 300],
          buy   : [600, 500],
          finish: [300, 310, 280, 330],
        }
      }
    };
    var data = [
      defaultData, {
        state: 'explain',
        data: defaultData.data
      }, {
        state: 'experiment',
        data: defaultData.data
      }
    ];
    var interval = setInterval(function() {
      var d = data.shift();
      if (d != null) {
        callback(d);
        return;
      }
      clearInterval(interval);
    }, 3000);
  });
})();

},{"./root.js":7}]},{},[8]);
