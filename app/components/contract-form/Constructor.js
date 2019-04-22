// @flow
import React, { Component } from 'react'
import { Form, Input, Tooltip, Button, Typography, } from 'antd'

// TODO:
//type Props = {}

export default class Constructor extends Component<Props> {

  handleSubmit = (e) => {
    e.preventDefault()
    let inputFields = $(e.target).find('input')

    let inputs = {}
    inputFields.each(function (index, item) {
      inputs[item.name] = item.value
    })

    this.props.deployContract({file: this.props.file, inputs: inputs, account: this.props.web3.selectedAccount})
  }

  renderInputs = (inputs) => {
    if (inputs) {
      return inputs.map(function (input, key) {
        return (
          <React.Fragment key={`constr-f-input-${key}`}>
            {input.name}
            <Input key={`constr-input-${key}`} style={{ width:'100%' }} name={input.name} placeholder={input.type} />
          </React.Fragment>
        )
      })
    }
  }

  render() {
    const { Text } = Typography
    const { abi } = this.props.file
    const handleSubmit = this.handleSubmit
    const renderInputs = this.renderInputs

    return (
      <React.Fragment>
        <Text strong>constructor</Text>
        <div style={{ marginBottom:'10px', padding:'10px', backgroundColor:'rgb(240, 242, 245)' }}>
        {
          abi.map(function (a, key) {
            if (a.type == 'constructor') {
              return (
                <Form key={`form-${key}`} onSubmit={handleSubmit}>
                  <Form.Item key={`form-item-${key}`} label={a.name} style={{ marginBottom:0 }} />
                  {renderInputs(a.inputs)}
                  <Button block htmlType='submit'>deploy</Button>
                </Form>
              )
            }
          })
        }
        </div>
      </React.Fragment>
    )
  }
}
