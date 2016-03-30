module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      title: ''
    };
  },
  render: function () {
    return (
      <div>
        <h1>{this.props.title}</h1>
        {this.props.children}
      </div>
    );
  }
});
