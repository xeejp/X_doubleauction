(function() {
  window.onload = (function() {
    var _root = require('./root.js');
    
    var callback;
    var DataStore = React.createClass({
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
          <_root data={this.state.data} />
        );
      }
    });
    
    // render
    ReactDOM.render(
      <DataStore />,
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
