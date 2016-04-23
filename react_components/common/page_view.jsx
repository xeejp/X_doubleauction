import React from 'react'
import LinearProgress from 'material-ui/lib/linear-progress';
import CircularProgress from 'material-ui/lib/circular-progress';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
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
          {(this.hasPage(this.state.page - 1))? <RaisedButton label="戻る" onMouseDown={function(){this.shiftPage(-1);}} style={{margin: 12}} />: null}
          {(this.hasPage(this.state.page + 1))? <RaisedButton label="次へ" onMouseDown={function(){this.shiftPage( 1);}} style={{margin: 12}} />: null}
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
