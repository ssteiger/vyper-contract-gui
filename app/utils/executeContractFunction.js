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

  const transactionValue_inWei = web3.utils.toWei(transactionValue)

  const { abi } = contract
  const contractInstance = new web3.eth.Contract(abi, contractAddress)

  // determine type of execution
  // -> call() for constant methods
  //    send() for state mutating methods
  const transactionExecutionType = functionDetails.constant ? 'call' : 'send'

  let tx_builder = contractInstance.methods[functionDetails.name](...inputs)

  let encoded_tx = tx_builder.encodeABI()

  const gasEstimate = await tx_builder.estimateGas()

  const tx = {
    gas: gasEstimate + 3000,
    from: account.address,
    to: contractAddress,
    data: encoded_tx,
    value: transactionValue_inWei,
  }

  const signedTransaction = await web3.eth.accounts.signTransaction(tx, account.privateKey)

  return new Promise((resolve, reject) => {
    if (functionDetails.inputs.length !== inputs.length) {
      const message = 'Error: Invalid number of arguments'
      reject(message)
    }
    web3.eth.sendSignedTransaction(signedTransaction.rawTransaction, (error, result) => {
      if (error) {
        console.error(error)
        reject(error)
      } else {
        console.log(result)
        resolve(result)
      }
    })
  }) // Promise
}
