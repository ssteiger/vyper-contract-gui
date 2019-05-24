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

  const txValue_inWei = web3.utils.toWei(transactionValue)

  const { abi } = contract
  const contractInstance = new web3.eth.Contract(abi, contractAddress)

  // determine type of execution
  // -> call() for constant methods
  //    send() for state mutating methods

  if (functionDetails.constant) {
    const gasEstimate = await contractInstance.methods[functionDetails.name](...inputs).estimateGas()

    return new Promise((resolve, reject) => {
      if (functionDetails.inputs.length !== inputs.length) {
        let message = 'Error: Invalid number of arguments'
        reject(message)
      }

      contractInstance.methods[functionDetails.name](...inputs).call({
        from: account.address,
        value: txValue_inWei,
        gas: gasEstimate + 30000,
      }, (error, result) => {
        if (error) {
          console.error(error)
          reject(error)
        } else {
          if (result instanceof BigNumber) {
            resolve(result.toString())
          } else {
            resolve(result)
          }
        }
      })
    }) // Promise
  } else {
    const encoded_tx = contractInstance.methods[functionDetails.name](...inputs).encodeABI()

    // TODO:
    //const gasEstimate = await contractInstance.methods[functionDetails.name](...inputs).estimateGas()

    const tx = {
      gas: 3000000,
      from: account.address,
      to: contractAddress,
      data: encoded_tx,
      value: txValue_inWei,
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
}
