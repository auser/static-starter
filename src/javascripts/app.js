// import './modules'

import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import App from 'components/App';

const MOUNT = document.querySelector('#root');

const renderApp = App =>
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    MOUNT
  );

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    renderApp(NextApp);
  });
}

renderApp(App);
