module.exports = (function(){
  var Explain = require('./explain.jsx');
  var Experiment = require('./experiment/experiment.jsx');

  var default_data = {
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
  };

  return React.createClass({
    getDefaultProps: function() {
      return {data: default_data};
    },
    render: function () {
      return (
        <div>
          <center>
            {(function() {
              switch (this.props.data.state) {
                case 'default':
                  return (
                    <div>実験開始までしばらくお待ち下さい</div>
                  );
                case 'explain':
                  return (
                    <Explain student={this.props.data.data.student}></Explain>
                  );
                case 'experiment':
                  return (
                    <Experiment data={this.props.data.data} />
                  );
                default:
                  return null;
              }
            }).bind(this)()}
          </center>
        </div>
      );
    }
  });
})();
