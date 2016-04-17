import React from 'react';
var Table = require('./../../common/table.jsx');

module.exports = React.createClass({
  render: function() {
    var selling = this.props.selling.map(function(d){ return [d.value]; });
    var buying = this.props.buying.map(function(d){ return [d.value]; });
    var concluded = this.props.concluded.map(function(d){ return [d.value]; });
    var style = {
      verticalAlign: 'top',
      display: 'table-cell'
    };
    return (
      <table>
        <tbody>
          <tr>
            <td style={style}>
              <Table head={[['売値']]} body={selling} />
            </td>
            <td style={style}>
              <Table head={[['買値']]} body={buying} />
            </td>
            <td style={style}>
              <Table head={[['成立価格']]} body={concluded} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  },
});
