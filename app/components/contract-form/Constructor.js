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
      // if input is part of an array
      if (item.name.indexOf('-array-') > -1) {
        let cleanName = item.name.substring(0, item.name.indexOf('-'))
        // if got first item of array:
        //  -> create array
        // else
        //  -> push
        !inputs[cleanName] ? inputs[cleanName] = [item.value] : inputs[cleanName].push(item.value)
      } else {
        // non array input
        inputs[item.name] = item.value
      }
    })

    deployContract({ file, inputs, account: web3.selectedAccount })
  }

  renderInputs = (constructorAbi) => {
    if (constructorAbi) {
      return constructorAbi.map((input, key) => {
        // if input is an array -> generate an input field for each element
        if (input.type.indexOf('[') > -1 && input.type.indexOf(']') > -1) {
          const inputArrayLength = input.type.match(/\d+/)[0]
          const helperArray = [...Array(parseInt(inputArrayLength))]

          // get input type without '[]'
          const placeholder = input.type.substring(0, input.type.indexOf('['))

          return (
            <React.Fragment key={`constr-f-input-${key}`}>
              {input.name}[{inputArrayLength}]
              {helperArray.map((e, i) => {
                return <Input
                          key={`constr-input-${input.name}-array-${i}`}
                          style={{ width:'100%' }}
                          name={`${input.name}-array-${i}`}
                          placeholder={`${placeholder}(${i+1})`}
                        />
              })}
            </React.Fragment>
          )
        } else {
          return (
            <React.Fragment key={`constr-f-input-${key}`}>
              {input.name}
              <Input
                key={`constr-input-${key}`}
                style={{ width:'100%' }}
                name={input.name}
                placeholder={input.type}
              />
            </React.Fragment>
          )
        }
      })
    }
  }

  render() {
    const { Text } = Typography
    const { file: { abi } } = this.props

    return (
      <React.Fragment>
        <Text strong>
          constructor
        </Text>
        <div style={{ marginBottom:'10px', padding:'10px', backgroundColor:'rgb(240, 242, 245)' }}>
        {
          abi.map((a, key) => {
            if (a.type === 'constructor') {
              return (
                <Form key={`form-${key}`} onSubmit={this.handleSubmit}>
                  <Form.Item key={`form-item-${key}`} label={a.name} style={{ marginBottom:0 }} />
                  {this.renderInputs(a.inputs)}
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
