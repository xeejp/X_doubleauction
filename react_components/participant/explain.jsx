import React from 'react';
module.exports = (function() {
  var PageView = require('./../common/page_view.jsx');

  return React.createClass({
    render: function() {
      return (
        <PageView>
          <div>
            <h1>説明</h1>
            これから行う実験について説明します<br/>
            また、この説明はあなたのペースで読み進めることができます<br/>
            [次へ]ボタンをクリックしてください<br/>
          </div>
          <div>
            <h1>説明</h1>
            あなたの役割は{this.props.role}です。<br/>
            [前へ]ボタンをクリックすると前のページヘ戻ることができます<br/>
          </div>
          <div>
            <h1>説明</h1>
            工事中...<br/>
          </div>
          <div>
            <h1>説明</h1>
            実験開始までこのままお待ち下さい<br/>
          </div>
        </PageView>
      );
    }
  });
})();
