module.exports = (function() {
  var Explain = require('./pages/explain/explain.js');
  var Experiment = require('./pages/experiment/experiment.js');

  var Root = React.createClass({
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
                    <Explain title="説明">
                      <div>
                        これから行う実験について説明します<br/>
                        また、この説明はあなたのペースで読み進めることができます<br/>
                        [次へ]ボタンをクリックしてください<br/>
                      </div>
                      <div>
                        あなたの役割は{this.props.data.data.student.role}です。<br/>
                        [前へ]ボタンをクリックすると前のページヘ戻ることができます<br/>
                      </div>
                      <div>
                        工事中...<br/>
                      </div>
                      <div>
                        実験開始までこのままお待ち下さい<br/>
                      </div>
                    </Explain>
                  );
                case 'experiment':
                  return (
                    <Experiment data={this.props.data.data} />
                  );
                default: return null;
              }
            }).bind(this)()}
          </center>
        </div>
      );
    }
  });
  return Root;
})();
