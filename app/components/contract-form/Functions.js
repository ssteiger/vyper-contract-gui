// @flow
import React, { Component } from 'react'
import { Form, Input, Button, Typography, } from 'antd'

// TODO:
// type Props = {}

export default class Functions extends Component<Props> {

  renderInputs = (inputs) => {
    if (inputs) {
      return inputs.map((input, key) => {
        return (
          <React.Fragment key={`f-f-input-${key}`}>
            {input.name}
            <Input
              key={`f-input-${key}`}
              //onChange={handleChange}
              style={{ width: '100%' }}
              name={input.name}
              placeholder={input.type}
            />
          </React.Fragment>
        )
      })
    }
  }

  renderEthInput = (abiPart) => {
    if (abiPart.type === 'function' && abiPart.payable) {
      return (
        <React.Fragment key={`f-f-input-${abiPart.name}`}>
          {'[transaktion value]'}
          <Input
            key={`f-input-${abiPart.name}`}
            style={{ width: '100%' }}
            name='transactionValue_CxH4'
            placeholder='ETH'
          />
        </React.Fragment>
      )
    }
  }

  createLabel = (a) => {
    let label = ''
    if (a.constant) {
      label += '@constant'
    }
    label = `${a.name}()`
    if (a.outputs && a.outputs[0]) {
      label += ` -> ${a.outputs[0].type}`
    }
    return label
  }

  /*
  handleChange = (formValue) => {
    this.setState({ formValue })
    console.log('handleChange:')
    console.log(formValue)
  }

  validateBoolean = (formValue: String) => {
    if (formValue == 'True' ||formValue == 'False') {
      return {
        validateStatus: 'success',
        errorMsg: null,
      }
    }
    return {
      validateStatus: 'error',
      errorMsg: 'Not a valid type of True or False.',
    }
  }
  validateInt128 = (formValue: String) => {
    // TODO:
    if (true) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      }
    }
    return {
      validateStatus: 'error',
      errorMsg: 'Not a valid int128 value.',
    }
  }
  validateUint256 = (formValue: String) => {
    // TODO:
    if (!isNaN(formValue)) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      }
    }
    return {
      validateStatus: 'error',
      errorMsg: 'Not a valid uint256 value.',
    }
  }
  validateDecimal = (formValue: String) => {
    // TODO:
    if (true) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      }
    }
    return {
      validateStatus: 'error',
      errorMsg: 'Not a valid decimal value.',
    }
  }
  validateAddress = (content: String) => {
    // TODO:
    if (true) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      }
    }
    return {
      validateStatus: 'error',
      errorMsg: 'Not a valid address.',
    }
  }
  validateTime = (content: String) => {
    // TODO:
    if (true) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      }
    }
    return {
      validateStatus: 'error',
      errorMsg: 'Not a valid time view.',
    }
  }
  validateWei = (content: String) => {
    // TODO:
    if (true) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      }
    }
    return {
      validateStatus: 'error',
      errorMsg: 'Not a valid wei value.',
    }
  }
  validateString = (formValue: String) => {
    if (typeof formValue == 'string') {
      return {
        validateStatus: 'success',
        errorMsg: null,
      }
    }
    return {
      validateStatus: 'error',
      errorMsg: 'Not a valid string value.',
    }
  }
  validateBytes32 = (content: String) => {
    // TODO:
    if (true) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      }
    }
    return {
      validateStatus: 'error',
      errorMsg: 'Not a valid bytes32 value.',
    }
  }
  validateBytes = (content: String) => {
    // TODO:
    if (true) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      }
    }
    return {
      validateStatus: 'error',
      errorMsg: 'Not a valid bytes value.',
    }
  }
  */

  handleSubmit = (abiFunc) => (event) =>  {
    event.preventDefault()
    const { file, web3, resetFunctionCallResults, callFunction } = this.props
    const formInputFields = $(event.target).find('input')

    let inputValues = {}
    let transactionValue = '0'
    formInputFields.each((index, item) => {
      if (item.name === 'transactionValue_CxH4') {
        transactionValue = item.value
      } else {
        inputValues[item.name] = item.value
      }
    })
    // console.log('submit with values:')
    // console.log(inputValues)
    resetFunctionCallResults(abiFunc.name)
    callFunction({
      file,
      functionDetails: abiFunc,
      inputs: inputValues,
      transactionValue,
      account: web3.selectedAccount,
    })
  }
  // TODO:
  functionCallResult = (abiFunc) => {

  }

  render() {
    const { Text } = Typography
    const { file: { abi } } = this.props
    const { renderInputs, renderEthInput, createLabel, handleSubmit } = this
    const { functionCallResults } = this.props

    return (
      <React.Fragment>
        <Text strong>functions</Text>
        {
          abi.map((abiPart, key) => {
            if (abiPart.type === 'function') {
              return (
                <Form
                  key={`form-${key}`}
                  onSubmit={handleSubmit(abiPart)}
                  name={abiPart.name}
                  style={{ marginBottom:'10px', padding:'10px', backgroundColor:'rgb(240, 242, 245)' }}
                >
                  <Text>{createLabel(abiPart)}</Text>
                  <br />
                  {renderInputs(abiPart.inputs)}
                  {renderEthInput(abiPart)}
                  <Button block htmlType='submit'>call</Button>
                  <Text style={{color:'#52c41a'}}>{functionCallResults[abiPart.name]}</Text>
                </Form>
              )
            }
          })
        }
      </React.Fragment>
    )
  }
}
