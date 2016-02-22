var Root = require('./participant/root.jsx');

function onUpdate(data) {
  ReactDOM.render(
    <Root>{data}</Root>,
    document.getElementById("content")
  );
}

window.onUpdate = onUpdate;