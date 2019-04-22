// @flow
import React, { Component } from 'react'
/*
  The <Provider /> makes the Redux store available to any
  nested components that have been wrapped in the connect() function.
*/
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import type { Store } from '../reducers/types'
import Routes from '../Routes'

/*
// TODO:

type Props = {
  store: Store,
  history: {}
}
*/

export default class Root extends Component<Props> {
  render() {
    const { store, history } = this.props

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    )
  }
}
