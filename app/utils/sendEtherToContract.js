// @flow
import { getWeb3 } from './web3jsPromises'

// TODO: move this to web3jsPromises.js
export default async function sendEtherToContract (
  contract: Object, // TODO: not used
  contractAddress: String,
  transactionValue: String,
  account: Object
) {
  const web3 = await getWeb3()

  const transactionValue_inWei = web3.utils.toWei(transactionValue)

  /*
  console.log('contract:')
  console.log(contract)
  console.log('contractAddress:')
  console.log(contractAddress)
  console.log('transactionValue [ETH]:')
  console.log(transactionValue)
  console.log('transactionValue [wei]:')
  console.log(transactionValue_inWei)
  console.log('account:')
  console.log(account)
  */

  const web3Account = await web3.eth.personal.importRawKey(account.privateKey, 'password1234')
  await web3.eth.personal.unlockAccount(web3Account, 'password1234')

  return new Promise((resolve, reject) => {
    web3.eth.sendTransaction({
      from: web3Account,
      to: contractAddress,
      value: transactionValue_inWei,
      gas: 300000,
    }, (error, result) => {
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
