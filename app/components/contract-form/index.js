// @flow
import React, { Component } from 'react'

import Addresses from '../../containers/contract-form/Addresses'
import Constructor from '../../containers/contract-form/Constructor'
import Events from '../../containers/contract-form/Events'
import SendEther from '../../containers/contract-form/SendEther'
import Functions from '../../containers/contract-form/Functions'

// TODO:
// type Props = {}

export default class ContractForm extends Component<Props> {
  render() {
    return (
      <div style={{ marginRight:'12px' }}>
        <Addresses />
        <Constructor />
        <Events />
        <SendEther />
        <Functions />
      </div>
    )
  }
}
