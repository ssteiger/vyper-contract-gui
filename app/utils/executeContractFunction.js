// @flow
import { getWeb3 } from './web3jsPromises'

const BigNumber = require('bignumber.js')

export default async function executeContractFunction (
  contract: Object, // TODO: we are renaming passed argument 'file' to 'contract'...
  contractAddress: String,
  functionDetails: Object,
  inputs: Array<String>,
  transactionValue: String,
  account: Object
) {
  const web3 = await getWeb3()

  // convert object into array holding all values
  inputs = Object.values(inputs)
  console.log(inputs)
  const transactionValue_inWei = web3.utils.toWei(transactionValue)
  /*
  console.log('contract:')
  console.log(contract)
  console.log('contractAddress:')
  console.log(contractAddress)
  console.log('functionDetails:')
  console.log(functionDetails)
  console.log('inputs:')
  console.log(inputs)
  console.log('transactionValue [ETH]:')
  console.log(transactionValue)
  console.log('transactionValue [wei]:')
  console.log(transactionValue_inWei)
  console.log('account:')
  console.log(account)
  */

  const { abi } = contract
  // TODO: dynamically calculate gas
  const gasEstimate = 3000000
  const contractInstance = new web3.eth.Contract(abi, contractAddress)

  const web3Account = await web3.eth.personal.importRawKey(account.privateKey, 'password1234')
  await web3.eth.personal.unlockAccount(web3Account, 'password1234')
  console.log(`web3Account: ${web3Account}`)

  return new Promise((resolve, reject) => {
    if (functionDetails.inputs.length !== inputs.length) {
      const message = 'Error: Invalid number of arguments'
      reject(message)
    }

    // determine type of execution
    // -> call() for constant methods
    //    send() for state mutating methods
    const transactionExecutionType = functionDetails.constant ? 'call' : 'send'

    contractInstance.methods[functionDetails.name](...inputs)[transactionExecutionType]({
      from: web3Account,
      value: transactionValue_inWei,
      gas: gasEstimate,
    }, (error, result) => {
      if (error) {
        console.error(error)
        reject(error)
      } else if (result instanceof BigNumber) {
        resolve(result.toString())
      } else {
        resolve(result)
      }
    })
  }) // Promise
}
