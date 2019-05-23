// @flow
import { getWeb3 } from './web3jsPromises'

// TODO: no errors are caught here
//       -> promisifiy and reject()
export default async function deployContract (contract: Object, args: Array, account: Object) {
  const web3 = await getWeb3()
  console.log(`web3: ${web3.version}`)
  // convert object into array with all values
  let argments = Object.values(args)
  // remove "" quotes
  argments = argments.filter((a) => a !== '' )

  const { abi, bytecode } = contract

  const myContract = new web3.eth.Contract(abi)

  const tx_builder = await myContract.deploy({
    data: bytecode,
    arguments: argments,
  })

  let encoded_tx = tx_builder.encodeABI()

  const gasEstimate = await tx_builder.estimateGas()

  const tx = {
    gas: gasEstimate + 500000, // TODO: is there a better way to calculate this?
    from: account.address,
    data: encoded_tx,
  }

  const signedTransaction = await web3.eth.accounts.signTransaction(tx, account.privateKey)

  const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
  return receipt
}
