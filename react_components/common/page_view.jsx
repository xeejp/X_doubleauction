import React from 'react'
import LinearProgress from 'material-ui/lib/linear-progress';
import CircularProgress from 'material-ui/lib/circular-progress';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

module.exports = (function() {
  return React.createClass({
    getInitialState: function() {
      return { page: 0 };
    },
    render: function() {
      var pages = React.Children.toArray(this.props.children);
      var title = this.props.title;
      return (
          <div>
              <Card>
                  <CardHeader title={title}/>
                  <CardText>
                    {pages[this.state.page]}<br/>
                  </CardText>
                  <CardActions>
                      {(this.hasPage(this.state.page - 1))? <RaisedButton label="戻る" onMouseDown={this.shiftPage.bind(this, -1)} style={{margin: 12}} />: null}
                    {(this.hasPage(this.state.page + 1))? <RaisedButton label="次へ" onMouseDown={this.shiftPage.bind(this, 1)} style={{margin: 12}} />: null}
                  </CardActions>
              </Card>
        </div>
      );
    },
    hasPage: function(page) {
      if (page < 0 || page >= React.Children.count(this.props.children)) return false;
      return true;
    },
    shiftPage: function(page) {
        if (this.hasPage(state.page + page)) this.setState({page: state.page + page});
    }
  });
})();
