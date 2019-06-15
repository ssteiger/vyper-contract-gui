// @flow
import React, { Component } from 'react'
import copy from 'copy-to-clipboard'
import { Select, Button, Tag, message } from 'antd'

// TODO:
// type Props = {}

export default class Accounts extends Component<Props> {

  // https://stackoverflow.com/questions/49971046/how-to-dispatch-actions-via-a-timer-using-redux
  componentDidMount() {
    const { web3AccountsLoadBalances } = this.props
    // run every x seconds
    const seconds = 8
    this.cron = setInterval(() => {
      web3AccountsLoadBalances()
    }, seconds*1000)
  }

  componentWillUnmount() {
    clearInterval(this.cron)
  }

  handleChange = (value: Number) => {
    const {
      accounts: { all: allAccounts=[], selected: selectedAccount={} },
      web3AccountsSetMain
    } = this.props
    const account = allAccounts.find(obj => obj.address === value)
    delete account.index
    web3AccountsSetMain(account)
  }

  copyToClipboard = () => {
    const {accounts: { all: allAccounts=[], selected: selectedAccount={} }} = this.props
    const { address } = selectedAccount
    copy(address)
    message.success(`copied '${address}' to clipboard`)
  }

  // Note: the plus sign drops any "extra" zeroes at the end
  convertWeiToEth = (wei) => +(wei / 1000000000000000000).toFixed(2)

  render() {
    const { convertWeiToEth } = this
    const { accounts: { all: allAccounts=[], selected={} } } = this.props
    const { address } = selected

    return (
      <React.Fragment>
        <Button.Group style={{ marginRight:'70px' }}>
          Account:
          <Select
            key='select-accounts'
            style={{ width:'280px', marginLeft:'5px' }}
            value={address}
            onChange={this.handleChange}
          >
            {
              allAccounts.map((account, index) => (
                <Select.Option key={`account-opt-${account.address}`} value={account.address}>
                  <Tag color='green'>{convertWeiToEth(account.balance)} ETH</Tag>
                  {account.address}
                </Select.Option>
              ))
            }
          </Select>
          <Button onClick={this.copyToClipboard} style={{ marginRight:'5px' }}>copy</Button>
        </Button.Group>
      </React.Fragment>
    )
  }
}
