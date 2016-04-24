import React from 'react'
module.exports = React.createClass({
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
      <table className={this.props.className} style={{border: 'solid 1px'}}>
        <thead>
          {head.map(function(row, i) {
            return createRow(row, i, true);
          })}
        </thead>
        <tbody>
          {body.map(function(row, i) {
            return createRow(row, i);
          })}
        </tbody>
        <tfoot>
          {foot.map(function(row, i) {
            return createRow(row, i);
          })}
        </tfoot>
      </table>
    );
  }
});

function createRow(row, key, isHeader) {
  return (
    <tr key={key} style={{border: 'solid 1px'}}>
      {row.map(function(data, i) {
        if (isHeader) {
          return (<th key={i} style={{border: 'solid 1px'}}>{data}</th>);
        } else {
          return (<td key={i} style={{border: 'solid 1px'}}>{data}</td>);
        }
      })}
    </tr>
  );
}
