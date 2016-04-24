import React from 'react';
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
        getInitialState() {
            return {
                errorText: null,
                value: ''
            }
        },
        onChange: function(e) {
            this.setState({value: e.target.value})
            this.isStringValue()
        },
        isStringValue: function() {
            var value = this.state.value;
            if ((/[^0-9]+/).test(value)) {
                this.setState({errorText: "半角整数のみ入力可能です"})
            } else {
                this.setState({errorText: null});
            }
        },
        checkValue: function() {
            var value = this.state.value;
            if (!(/[^0-9]+/).test(value)) {
                switch (this.props.role) {
                    case 'seller':
                        var threshold = parseInt(this.props.status.cost);
                        if (parseInt(value) < threshold)
                            this.setState({errorText: threshold + "円より少ない金額は入力できません"})
                        return;
                    case 'buyer':
                        var threshold = parseInt(this.props.status.willingness);
                        if (parseInt(value) > threshold)
                            this.setState({errorText: threshold + "円より多い金額は入力できません"})
                        return;
                }
                this.setState({errorText: null});
            }
        },
        sendValue: function() {
            var value = this.state.value;
            if (!(/[^0-9]+/).test(value)) {
                switch (this.props.role) {
                    case 'seller':
                        var threshold = parseInt(this.props.status.cost);
                        if (parseInt(value) < threshold) {
                            this.setState({errorText: threshold + "円より少ない金額は入力できません"})
                            return;
                        }
                        break;
                    case 'buyer':
                        var threshold = parseInt(this.props.status.willingness);
                        if (parseInt(value) > threshold) {
                            this.setState({errorText: threshold + "円より多い金額は入力できません"})
                            return;
                        }
                        break;
                }
                this.props.sendValueCallback(parseInt(value));
            }
            this.setState({value: ''})
        },
        sendCancel: function() {
            X.sendData('cancelOrder');
        },
        render: function() {
            return (
                <Card>
                    <CardText>
                        <TextField
                            ref="order"
                            hintText="価格を提示してください"
                            floatingLabelText="価格"
                            errorText={this.state.errorText}
                            onEnterKeyDown={this.sendValue}
                            onChange={this.onChange}
                            onBlur={this.checkValue}
                            value={this.state.value}
                        />
                        </CardText>
                        <CardActions>
                            <FlatButton label="提示" onMouseDown={this.sendValue} style={{margin: 12}}/>
                            <FlatButton label="取消" onMouseDown={this.sendCancel} style={{margin: 12}}/>
                        </CardActions>
                    </Card>
            );
        },
    });
})();
