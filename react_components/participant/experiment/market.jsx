module.exports = (function() {
  var Table = React.createClass({
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
        <table className={this.props.className}>
          {(function() {
            if (this.props.head == null) return;
            return (
              <thead>
                {this.props.head.map(function(row, r){return (
                  <tr key={r}>
                    {row.map(function(data, i){ return (
                      <th key={i}>{data}</th>
                    ); })}
                  </tr>
                ); })}
              </thead>
            );
          }).bind(this)()}
          {(function() {
            if (this.props.body == null) return;
            return (
              <tbody>
                {this.props.body.map(function(row, r){ return (
                  <tr key={r}>
                    {row.map(function(data, i){ return (
                      <td key={i} style={alignLeft}>{data}</td>
                    ); })}
                  </tr>
                ); })}
              </tbody>
            );
          }).bind(this)()}
          {(function() {
            if (this.props.foot == null) return;
            return (
              <tfoot>
                {this.props.foot.map(function(row, r){ return (
                  <tr key={r}>
                    {row.map(function(data, i){ return (
                      <td key={i}>{data}</td>
                    ); })}
                  </tr>
                ); })}
              </tfoot>
            );
          }).bind(this)()}
        </table>
      );
    }
  });

  return React.createClass({
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
        <table>
          <tbody>
            <tr>
              <td style={style}><Table className="pure-table" head={[['売値']]} body={this.props.sell.map(function(d){ return [d]; })} /></td>
              <td style={style}><Table className="pure-table" head={[['買値']]} body={this.props.buy.map(function(d){ return [d]; })} /></td>
              <td style={style}><Table className="pure-table" head={[['成立価格']]} body={this.props.finish.map(function(d){ return [d]; })} /></td>
            </tr>
          </tbody>
        </table>
      );
    },
  });
})();
