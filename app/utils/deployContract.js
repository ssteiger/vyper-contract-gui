// @flow
import { getWeb3 } from './web3jsPromises'

export default async function deployContract (contract: Object, args: Array<String>, account: Object) {
  const web3 = await getWeb3()
  console.log(`using web3: ${web3.version}`)
  // convert object into array with all values
  let argmnts = Object.values(args)
  // remove "" quotes
  argmnts = argmnts.filter((a) => a !== '' )

  console.log('deploying contract with: ')
  console.log({ arguments: argmnts })

  const { abi, bytecode, bytecode_runtime } = contract

  // Contract object
  const contractInstance = new web3.eth.Contract(abi)

  const gasPrice = await web3.eth.gasPrice

  // Get contract data
  const contractData = contractInstance.deploy({
    data: bytecode,
    arguments: argmnts,
  })

  // estimate gas and log to console
  const gasLimit = await contractInstance.deploy({
    data: bytecode,
    arguments: argmnts,
  }).estimateGas()

  const rawTx = {
    //nonce: nonceHex,
    gasPrice: gasPrice,
    gasLimit: gasLimit + 30000,
    data: contractData.encodeABI(),
    from: account.address,
    //chainId:web3.utils.toHex(3)
  }

  return new Promise((resolve, reject) => {
    web3.eth.accounts.signTransaction(rawTx, account.privateKey, (error, signedTransaction) => {
      if (error) {
        reject(error)
      } else {
        web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
          .on('transactionHash', (hash) => {
            console.log(`txhash: ${hash}`)
          })
          .on('receipt', (receipt) => {
            console.log({receipt})
            resolve(receipt)
          })
          .on('confirmation', (number) => {
            //console.log(`block number: ${number}`)
          })
          .on('error',(error) => {
            reject(error)
          })
      }
    })
  })
}
