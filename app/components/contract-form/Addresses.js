// @flow
import React, { Component } from 'react'
import copy from 'copy-to-clipboard'
import { message, Row, Select, Button, Tag, Typography } from 'antd'

// TODO:
// type Props = {}

export default class Addresses extends Component<Props> {

  handleChange = (value: String) => {
    const { file, selectAddress } = this.props
    const address = file.deployedAt.addresses.find(obj => obj.address === value)
    selectAddress(file, address)
  }

  copyToClipboard = () => {
    const { file } = this.props
    const { deployedAt: { selected: { address: { address='' }='' } } } = file
    copy(address)
    message.success(`copied '${address}' to clipboard`)
  }

  // Note: the plus sign drops any "extra" zeroes at the end
  convertWeiToEth = (wei) => +(wei / 1000000000000000000).toFixed(2)

  render() {
    const { Text } = Typography
    const { convertWeiToEth, handleChange, copyToClipboard } = this
    const { file } = this.props

    const { deployedAt: { selected: { address: { address='' }=''  } } } = file

    return (
      <React.Fragment>
        <Text strong>interact with contract at</Text>
        <br/>
        <Row>
          <Select
            key='select-contract-addresses'
            style={{ width:'calc(100% - 64px)', marginBottom:'10px' }}
            value={address}
            onChange={handleChange}
          >
            {
              file.deployedAt.addresses.map((obj, index) => (
                <Select.Option key={`address-opt-${obj.address}`} value={obj.address}>
                  <Tag color='green'>{convertWeiToEth(obj.balance)} ETH</Tag>
                  {obj.address}
                </Select.Option>
              ))
            }
          </Select>
          <Button onClick={copyToClipboard}>copy</Button>
        </Row>
      </React.Fragment>
    )
  }
}
