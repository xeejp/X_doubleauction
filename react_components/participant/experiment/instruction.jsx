import React from 'react'
module.exports = (function() {
  return React.createClass({
    render: function() {
      var status = this.props.status;
      return (
        <div>
          {(function() {
            switch (this.props.role) {
              case 'seller':
                return (
                  <div>
                    あなたは売り手です<br/> 
                    あなたは財を{status.cost}円で生産できます<br/>
                  </div>
                );
              case 'buyer':
                return (
                  <div>
                    あなたは買い手です<br/> 
                    あなたは合計{status.willingness}円まで支払えます<br/>
                  </div>
                );
            }
          }).call(this)}
        </div>
      );
    }
  });
})();
