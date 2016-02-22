var Root = require('./host/root.jsx');

function onUpdate(data) {
  ReactDOM.render(
    <Root>{data}</Root>,
    document.getElementById("content")
  );
}

window.onUpdate = onUpdate;
