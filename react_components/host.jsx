import React from 'react';
import ReactDOM from 'react-dom';
import Root from './host/root.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(
        <div>
        <Root />
        </div>,
  document.getElementById("content")
);
