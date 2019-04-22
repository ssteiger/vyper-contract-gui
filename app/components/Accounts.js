// @flow
import React, { Component } from 'react'
import copy from 'copy-to-clipboard'
import { Select, Button, Tag, Icon, message } from 'antd'

// TODO:
// type Props = {}

export default class Accounts extends Component<Props> {

  //https://stackoverflow.com/questions/49971046/how-to-dispatch-actions-via-a-timer-using-redux
  componentDidMount() {
    // run every x seconds
    const seconds = 8
    const web3AccountsLoadBalances = () => this.props.web3AccountsLoadBalances()
    this.cron = setInterval(function() {web3AccountsLoadBalances}, seconds*1000)
  }

  componentWillUnmount() {
    clearInterval(this.cron)
  }

  handleChange = (value: Number) => {
    const account = this.props.web3.accounts.find(obj => obj.address === value)
    delete account.index
    this.props.web3AccountsSetMain(account)
  }

  copyToClipboard = () => {
    const address = this.props.web3.selectedAccount.address
    copy(address)
    message.success(`copied '${address}' to clipboard`)
  }

  convertWeiToEth = (wei) => {
    // Note: the plus sign drops any "extra" zeroes at the end
    return +(wei / 1000000000000000000).toFixed(2)
  }

  renderOptions = () => {
    const convertWeiToEth = this.convertWeiToEth
    return this.props.web3.accounts.map(function (account, index) {
      if (account) {
        return (
          <Select.Option key={`account-opt-${account.address}`} value={account.address}>
            <Tag color='green'>{convertWeiToEth(account.balance)} ETH</Tag>
            {account.address}
          </Select.Option>
        )
      }
    })
  }

  render() {

    const { address='' } = this.props.web3.selectedAccount

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
            {this.renderOptions()}
          </Select>
          <Button onClick={this.copyToClipboard} style={{ marginRight:'5px' }}>copy</Button>
        </Button.Group>
      </React.Fragment>
    )
  }
}
