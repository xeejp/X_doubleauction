var Table = require('./../common/table.jsx');

module.exports = React.createClass({
  render: function () {
    var participants = this.props.participants;
    var body = Object.keys(participants).map(function(id) {
      var status = createTable(participants[id]);
      return [id, status];
    });
    return (
      <Table head={[['ID', 'STATUS']]} body={body} foot={[['Total', body.length]]} />
    );
  }
});

function createTable(data) {
  var body = Object.keys(data).map(function(key) {
    var value = data[key];
    if (value && typeof value == 'object') {
      value = createTable(value);
    } else if (typeof value != 'string' && typeof value != 'number') {
      value = JSON.stringify(value, null, '  ');
    }
    return [key, value];
  });
  return <Table body={body} />
}