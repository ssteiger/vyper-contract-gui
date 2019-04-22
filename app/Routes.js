import React from 'react'
import { Switch, Route } from 'react-router'
import routes from './constants/routes'
import App from './containers/App'
import MyLayout from './containers/MyLayout'

export default () => (
  <App>
    <Switch>
      <Route path={routes.LAYOUT} component={MyLayout} />
    </Switch>
  </App>
);
