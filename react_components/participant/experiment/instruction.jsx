module.exports = (function() {
  return React.createClass({
    propTypes:{
      role      : React.PropTypes.string.isRequired,
      cost      : React.PropTypes.number.isRequired,
      payable   : React.PropTypes.number.isRequired,
      properties: React.PropTypes.number.isRequired,
      money     : React.PropTypes.number.isRequired,
    },
    render: function() {
      return (
        <div>
          {(function() {
            switch (this.props.role) {
              case 'seller':
                return (
                  <div>
                    あなたは売り手です<br/> 
                    あなたは財を最大{this.props.properties}個生産できます<br/>
                    あなたは財を1個あたり{this.props.cost}円で生産できます<br/>
                  </div>
                );
              case 'buyer':
                return (
                  <div>
                    あなたは買い手です<br/> 
                    あなたは合計{this.props.payable}円まで支払えます<br/>
                    あなたはあと{this.props.money}円持っています<br/>
                  </div>
                );
            }
          }).bind(this)()}
        </div>
      );
    }
  });
})();
