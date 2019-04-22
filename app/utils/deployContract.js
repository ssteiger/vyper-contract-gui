import { getWeb3 } from './web3jsPromises'

// TODO: no errors are caught here
//       -> promisifiy and reject() ?
export default async function deployContract (contract: Object, args: Array, account: Object) {
  const web3 = await getWeb3()
  console.log(`web3: ${web3.version}`)
  // convert object into array with all values
  let argments = Object.values(args)
  // remove "" quotes
  argments = argments.filter((a) => a !== '' )
  /*
  console.log('contract:')
  console.log(contract)
  console.log('args:')
  console.log(args)
  console.log('account:')
  console.log(account)
  */

  const { abi, bytecode } = contract

  const gasEstimate = (contract.gas + 30000) || 3000000
  //console.log(`gasEstimate: ${gasEstimate}`)

  const myContract = new web3.eth.Contract(abi)
  //console.log(myContract)

  // TODO: this is so weird
  const password = 'password1234'
  const unlockDuraction = 600
  const acc = await web3.eth.personal.importRawKey(account.privateKey, password)
  await web3.eth.personal.unlockAccount(acc, password, unlockDuraction)
  //let acc = await web3.eth.personal.newAccount('password')
  //let private_key = '0x' + '67070a356c39a0494b095db6b1766929f36c846ae272164d50c3c100a0f0b501'
  //let acc = await web3.eth.personal.importRawKey(private_key, 'password1234')
  //await web3.eth.personal.unlockAccount(acc, password, unlockDuraction)

  return myContract.deploy({
    data: bytecode,
    arguments: argments,
  }).send({
    from: acc,
    gas: gasEstimate,
    gasPrice: '3000000'
  }, (error, transactionHash) => {

  }).on('error', (error) => {
    console.error(error)
  }).on('transactionHash', (transactionHash) => {
    console.log(transactionHash)
  }).on('receipt', (receipt) => {
    console.log(receipt.contractAddress)
  }).on('confirmation', (confirmationNumber, receipt) => {
    //console.log('confirmationNumber: ' + confirmationNumber)
    //console.log(receipt)
  }).then((newContractInstance) => {
    console.log(newContractInstance)
    return newContractInstance
  })
}
