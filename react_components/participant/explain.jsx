import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

module.exports = (function() {

  return React.createClass({
    render: function() {
      return (
          <Card>
            <CardHeader title="ルール説明"/>
            <CardText>
            ・これから行う実験について説明します<br/>
            {
                (() => {switch (this.props.role) {
                    case "buyer":
                        return <div>
                            ・あなたの役割は買い手です。<br />
                            ・あなたはある抽象的な財を1単位購入したいと考えています。<br />
                            ・あなたがこの財に支払っても良いと考えている最大の価格は{this.props.status.willingness}円です。<br />
                            ・あなたは、なるべく安い価格を売り手に提案することで、得を大きくすることができます。<br />
                            ・あなたの目的はなるべく得を大きくすることです。<br />
                            ・ですから、損をしてまで買う必要はありません。(なお、この実験では、支払い意欲よりも高い金額は入力できません。)<br />
                            ・もし購入しなければ、あなたの利潤はゼロですが、マイナスにはなりません。</div>
                        case "seller":
                            return <div>・あなたの役割は売り手です。<br />
                                ・あなたはある抽象的な財を1単位販売したいと考えています。<br />
                                ・あなたはこの財を手に入れるために{this.props.status.cost}円支払わなければなりません。<br />
                                ・あなたは、なるべく高い価格を買い手に提案することで、得を大きくすることができます。<br />
                                ・あなたの目的はなるべく得を大きくすることです。<br />
                                ・ですから、損をしてまで得る必要はありません。(なお、この実験では、仕入値よりも低い金額は入力できません。)<br />
                                ・もし販売しなければ、あなたの利潤はゼロですが、マイナスにはなりません。
                            </div>
                }})()
            }
            </CardText>
          </Card>
      );
    }
  });
})();
