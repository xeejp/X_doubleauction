(function() {
  window.onload = (function() {
    var _root = require('./root.js');
    ReactDOM.render(
      <_root />,
      document.getElementById('content')
    );
  });
})();
