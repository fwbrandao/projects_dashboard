import React from "react";
import { Switch, Router, Route } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import SignIn from './components/signIn';

const createClassName = createGenerateClassName({
  productionPrefix: "ttt",
})

export default ({ history, ThemeProvider }) => {
  return (
    <div>
      <ThemeProvider>
        <StylesProvider generateClassName={createClassName}>
          <Router history={history}>
            <Switch>
              <Route path="/" component={SignIn} />
            </Switch>
          </Router>
        </StylesProvider>
      </ThemeProvider>
    </div>
  )
}