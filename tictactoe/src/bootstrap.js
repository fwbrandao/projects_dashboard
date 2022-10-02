import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// Mount function to start the App
const mount = (el, { onNavigate, defaultHistory, initialPath, themeProvider }) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });

  if (onNavigate) {
    history.listen(onNavigate)
  }

  ReactDOM.render(<App history={history} ThemeProvider={themeProvider} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {

      if (history.location.pathname !== nextPathname) {
        history.push(nextPathname);
      }
    }
  }
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_tic-tac-toe-dev-root');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };