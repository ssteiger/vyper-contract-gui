// @flow
import React, { Component } from 'react'
import { Form, Input, Button, Typography, } from 'antd'

// TODO:
// type Props = {}

export default class Functions extends Component<Props> {

  handleSubmit = (abiFunc) => (event) =>  {
    event.preventDefault()
    const {
      file,
      accounts: { all: allAccounts=[], selected: selectedAccount={} },
      resetFunctionCallResults,
      callContractFunction,
    } = this.props

    const formInputFields = $(event.target).find('input')

    let inputValues = {}
    let transactionValue = '0'
    formInputFields.each((index, item) => {
      if (item.name === 'transactionValue_CxH4') {
        transactionValue = item.value
      } else if (item.name.indexOf('-array-') > -1) {
        // input is part of an array
        let cleanName = item.name.substring(0, item.name.indexOf('-'))
        // if got first item of array:
        //  -> create array
        // else
        //  -> push
        !inputValues[cleanName] ? inputValues[cleanName] = [item.value] : inputValues[cleanName].push(item.value)
      } else {
        inputValues[item.name] = item.value
      }
    })

    resetFunctionCallResults(abiFunc.name)

    callContractFunction({
      file,
      functionDetails: abiFunc,
      inputs: inputValues,
      transactionValue,
      account: selectedAccount,
    })
  }

  renderInputs = (functionAbi) => {
    if (functionAbi) {
      return functionAbi.map((input, key) => {
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
                          key={`f-input-${input.name}-array-${i}`}
                          style={{ width:'100%' }}
                          name={`${input.name}-array-${i}`}
                          placeholder={`${placeholder}(${i+1})`}
                        />
              })}
            </React.Fragment>
          )
        } else {
          return (
            <React.Fragment key={`f-f-input-${key}`}>
              {input.name}
              <Input
                key={`f-input-${key}`}
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

  // TODO:
  getFunctionCallResults = (abiPart) => {
    // https://web3js.readthedocs.io/en/1.0/web3-eth-abi.html#example
    const {
      file: { abi, method_identifiers },
      //accounts: { all: allAccounts=[], selected: selectedAccount={} },
      functionCallResults
    } = this.props

    // TODO: wow! this seems waaay to complicated

    const identifierPlain = `${abiPart.name}(${abiPart.inputs.map((input, i) => `${input.type}`)})`

    let identifier = method_identifiers[identifierPlain]

    // weird 'method_identifiers' removes 0 values at beginning
    while (identifier.length < 10) { // '0x' + 8
      identifier = identifier.slice(0, 2) + '0' + identifier.slice(2)
    }

    return functionCallResults[identifier] ? functionCallResults[identifier] : ''
  }

  render() {
    const { Text } = Typography

    const { renderInputs, renderEthInput, createLabel, handleSubmit } = this
    const { file: { abi, method_identifiers }, functionCallResults } = this.props

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
                  <Text style={{ color:'#52c41a', overflowWrap:'break-word' }}>
                    {this.getFunctionCallResults(abiPart)}
                  </Text>
                </Form>
              )
            }
          })
        }
      </React.Fragment>
    )
  }
}
