import React from 'react';
import LinearProgress from 'material-ui/lib/linear-progress';
import CircularProgress from 'material-ui/lib/circular-progress';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

module.exports = React.createClass({
    getInitialState: function() {
        return {value: "$not_selected"}
    },
    handleChange: function(e, index, value) {
        this.setState({value: value})
    },
    click: function() {
        window.open(window.location.href + "/" + this.state.value)
    },
    render: function() {
        var list = Object.keys(this.props.participants).map((p, k) =>
            <MenuItem value={p} key={k} primaryText={"id: " + p}/>
        )
        return(
            <div>
              <SelectField value={this.state.value} onChange={this.handleChange} autoWidth={true}>
                <MenuItem value="$not_selected" primaryText="未選択"/>
                {list}
              </SelectField><br />
              <RaisedButton label={this.state.value+"としてログイン"} onMouseDown={this.click}/>
            </div>
        );
    }
});
