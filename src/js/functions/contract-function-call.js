const BigNumber = require('bignumber.js')

async function executeContractFunction (file, contractAddress, functionDetails, inputs) {
  return new Promise(function (resolve, reject) {
    // convert object into array holding all values
    inputs = Object.values(inputs)
    // remove "" quotes
    inputs = inputs.filter(function (val) {
      return val !== ''
    })
    inputs = inputs.map(function (val, i) {
      return isNormalInteger(val) ? parseInt(val) : val
    })

    let contract = web3.eth.contract(file.abi)

    if (contractAddress.length < 42) {
      let message = 'Error: No contract address selected'
      toastr.error(message)
      reject(message)
    }
    // instantiate by address
    let contractInstance = contract.at(contractAddress)
    /*
    console.log('deployedAt address:')
    console.log(contract_address)
    console.log('contract:')
    console.log(contract)
    console.log('contractInstance:')
    console.log(contractInstance)

    console.log('functionDetails:')
    console.log(functionDetails)
    console.log('inputs:')
    console.log(inputs)
    console.log('executing ' + functionDetails.name + '()')
    */

    if (functionDetails.inputs.length !== inputs.length) {
      let message = 'Error: Invalid number of arguments'
      toastr.error(message)
      reject(message)
    }

    if (functionDetails.constant) {
      // for state changing methods with inputs
      // Will send a transaction to the smart contract and execute its method.
      // Note this can alter the smart contract state.
      contractInstance[functionDetails.name].call(...inputs, { from: web3.eth.coinbase, value: 0, gas: 200000 }, function (err, res) {
        if (err) {
          console.error(err)
          toastr.error(err)
          reject(err)
        } else {
          if (res instanceof BigNumber) {
            console.log('returned a BigNumber')
            console.log('result:')
            console.log(res.toString())
            resolve(res.toString())
          } else {
            // TODO: process other cases
            console.log('result:')
            console.log(res)
            resolve(res)
          }
        }
      })
    } else {
      // not @constant
      contractInstance[functionDetails.name].sendTransaction(...inputs, { from: web3.eth.coinbase, value: 0, gas: 200000 }, function (err, res) {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          if (res instanceof BigNumber) {
            console.log('returned a BigNumber')
            console.log('result:')
            console.log(res.toString())
            resolve(res.toString())
          } else {
            console.log('result:')
            console.log(res)
            resolve(res)
          }
        }
      })
    }
  }) // Promise
}
