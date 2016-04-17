import React from 'react'
module.exports = (function() {
  return React.createClass({
    getInitialState: function() {
      return { page: 0 };
    },
    render: function() {
      var pages = React.Children.toArray(this.props.children);
      return (
        <div>
          {pages[this.state.page]}<br/>
          {(this.hasPage(this.state.page - 1))? <button onClick={function(){this.shiftPage(-1);}}>戻る</button>: null}
          {(this.hasPage(this.state.page + 1))? <button onClick={function(){this.shiftPage( 1);}}>次へ</button>: null}
        </div>
      );
    },
    hasPage: function(page) {
      if (page < 0 || page >= React.Children.count(this.props.children)) return false;
      return true;
    },
    shiftPage: function(page) {
      this.setState(function(state, props) {
        if (this.hasPage(state.page + page)) state.page += page;
        return state;
      });
    }
  });
})();
