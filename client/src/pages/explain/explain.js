module.exports = (function() {
  var Explain = React.createClass({
    getInitialState: function() {
      return { page: 0 };
    },
    render: function() {
      var explanations = React.Children.toArray(this.props.children);
      return (
        <div>
          <h1>{this.props.title}</h1>
          {explanations[this.state.page]}<br/>
          {(this.hasPage(this.state.page - 1))? <button onClick={this.shiftPagePrev}>戻る</button>: null}
          {(this.hasPage(this.state.page + 1))? <button onClick={this.shiftPageNext}>次へ</button>: null}
        </div>
      );
    },
    shiftPagePrev: function() {
      this.setState(function(state, props) {
        if (this.hasPage(state.page - 1)) state.page--;
        return state;
      });
    },
    shiftPageNext: function() {
      this.setState(function(state, props) {
        if (this.hasPage(state.page + 1)) state.page++;
        return state;
      });
    },
    hasPage: function(page) {
      if (page < 0) return false;
      if (page >= React.Children.count(this.props.children)) return false;
      return true;
    }
  });
  return Explain;
})();
