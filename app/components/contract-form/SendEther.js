// @flow
import React, { Component } from 'react'
import { Form, InputNumber, Tooltip, Button, AutoComplete, Typography, } from 'antd'

// TODO:
// type Props = {}

export default class SendEther extends Component<Props> {

  handleSubmit = (e)  => {
    e.preventDefault()
    let inputFields = $(e.target).find('input')

    let inputs = {}
    inputFields.each(function (index, item) {
      inputs[item.name] = item.value
    })
    inputs.file = this.props.file
    inputs.account = this.props.web3.selectedAccount
    console.log(inputs)
    this.props.sendEther(inputs)
  }

  render() {
    const { Text } = Typography
    const handleSubmit = this.handleSubmit

    return (
      <React.Fragment>
        <Text strong>send eth to contract</Text>
        <Form
          key='form-sendEther'
          onSubmit={handleSubmit}
          name='sendEther'
          style={{ marginBottom:'10px', padding:'10px', backgroundColor:'rgb(240, 242, 245)' }}
        >
          <InputNumber
            key='ether'
            style={{ width:'100%' }}
            name='ether'
            placeholder='ETH'
          />
          <Button block htmlType='submit'>send</Button>
        </Form>
      </React.Fragment>
    )
  }
}
