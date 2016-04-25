import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

module.exports = React.createClass({
  render: function() {
    var selling = this.props.selling.map(function(d){ return [d.value]; });
    var buying = this.props.buying.map(function(d){ return [d.value]; });
    var concluded = this.props.concluded.map(function(d){ return [d.value]; });
    var sellingLen = selling.length;
    var buyingLen = buying.length;
    var concludedLen = concluded.length;
    var max = Math.max(sellingLen, buyingLen, concludedLen);
    var style = {
      verticalAlign: 'top',
      display: 'table-cell'
    };
    var rows = [];
    for (var i = 0; i < max; i++) {
        rows.push(
        <TableRow selectable={false}>
          <TableRowColumn>{i < sellingLen ? selling[i] : null}</TableRowColumn>
          <TableRowColumn>{i < buyingLen ? buying[i] : null}</TableRowColumn>
          <TableRowColumn>{i < concludedLen ? concluded[i] : null}</TableRowColumn>
        </TableRow>)
    }
    return (
    <Table selectable={false}>
      <TableHeader>
        <TableRow selectable={false}>
            <TableHeaderColumn>売り手の提案</TableHeaderColumn>
            <TableHeaderColumn>買い手の提案</TableHeaderColumn>
            <TableHeaderColumn>成立価格</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody selectable={false}>
        {rows}
      </TableBody>
    </Table>
    );
  },
});
