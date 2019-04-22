// @flow
import React, { Component } from 'react'
import { Form, Input, Button, Typography, } from 'antd'

// TODO:
// type Props = {}

export default class Constructor extends Component<Props> {

  handleSubmit = (e) => {
    e.preventDefault()
    const { web3, file, deployContract } = this.props
    const inputFields = $(e.target).find('input')

    let inputs = {}
    inputFields.each((index, item) => {
      inputs[item.name] = item.value
    })

    deployContract({file, inputs, account: web3.selectedAccount})
  }

  renderInputs = (inputs) => {
    if (inputs) {
      return inputs.map((input, key) => {
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
    const { file: { abi } } = this.props
    const { handleSubmit, renderInputs } = this

    return (
      <React.Fragment>
        <Text strong>constructor</Text>
        <div style={{ marginBottom:'10px', padding:'10px', backgroundColor:'rgb(240, 242, 245)' }}>
        {
          abi.map((a, key) => {
            if (a.type === 'constructor') {
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
