import { getWeb3 } from './web3jsPromises'

const BigNumber = require('bignumber.js')

export default async function sendEtherToContract (
  contract: Object,
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

  const { abi } = contract
  const contractInstance = new web3.eth.Contract(abi, contractAddress)

  const web3Account = await web3.eth.personal.importRawKey(account.privateKey, 'password1234')
  await web3.eth.personal.unlockAccount(web3Account, 'password1234')
  console.log(`web3Account: ${web3Account}`)

  return new Promise(function (resolve, reject) {

    const send = web3.eth.sendTransaction({
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
