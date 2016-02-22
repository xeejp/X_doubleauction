module.exports = (function() {
  return React.createClass({
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
      return (
        <table className={this.props.className}>
          {(function() {
            if (this.props.head) {
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
            }
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
})();
