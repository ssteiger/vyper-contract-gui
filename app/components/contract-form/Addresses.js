// @flow
import React, { Component } from 'react'
import copy from 'copy-to-clipboard'
import { message, Row, Select, Button, Tag, Typography } from 'antd'

// TODO:
// type Props = {}

export default class Addresses extends Component<Props> {

  handleChange = (value: String) => {
    const address = this.props.file.deployedAt.addresses.find(obj => obj.address === value)
    this.props.selectAddress(this.props.file, address)
  }

  copyToClipboard = () => {
    const address = this.props.file.deployedAt.selected.address.address
    copy(address)
    message.success(`copied '${address}' to clipboard`)
  }

  convertWeiToEth = (wei) => {
    // Note: the plus sign drops any "extra" zeroes at the end
    return +(wei / 1000000000000000000).toFixed(2)
  }

  renderOptions = () => {
    const convertWeiToEth = this.convertWeiToEth
    return this.props.file.deployedAt.addresses.map((obj, index) => {
      return (
        <Select.Option key={`address-opt-${obj.address}`} value={obj.address}>
          <Tag color='green'>{convertWeiToEth(obj.balance)} ETH</Tag>
          {obj.address}
        </Select.Option>
      )
    })
  }

  render() {
    const { Text } = Typography

    const deployedAt = this.props.file.deployedAt
    let address = ''
    if (deployedAt.selected.address) {
      address = deployedAt.selected.address.address // TODO: hmmm
    }

    return (
      <React.Fragment>
        <Text strong>interact with contract at</Text>
        <br/>
        <Row>
          <Select
            key='select-contract-addresses'
            style={{ width:'calc(100% - 64px)', marginBottom:'10px' }}
            value={address}
            onChange={this.handleChange}
          >
            {this.renderOptions()}
          </Select>
          <Button onClick={this.copyToClipboard}>copy</Button>
        </Row>
      </React.Fragment>
    )
  }
}
