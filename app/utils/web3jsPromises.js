import { Settings } from '../datastore'
const Web3 = require('web3')

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    const web3 = window.web3
    const alreadyInjected = typeof web3 !== 'undefined'
    if (alreadyInjected) {
      web3 = new Web3(web3.currentProvider)
      //console.log('Injected web3 detected.')
      resolve(web3)
    } else {
      //const ganache = 'http://127.0.0.1:7545'
      Settings.findOne({ _id: 'connections' }, function (err, connections) {
        const rpcServer = connections.rpcServer
        const provider = new Web3.providers.HttpProvider(rpcServer)
        //console.log('No web3 instance injected, using Local web3.')
        resolve(new Web3(provider))
      })
    }
  })

const web3GetAccountBalance = async function(address) {
  const web3 = await getWeb3()

  return new Promise((resolve, reject) => {
    resolve(web3.eth.getBalance(address))
  })
}

const web3GenerateNewAccounts = async function(number) {
  const web3 = await getWeb3()

  return new Promise((resolve, reject) => {
    resolve(web3.eth.accounts.wallet.create(number, '54674321§3456544±±±§±±±!!!43534534534534'))
  })
}

export {
  getWeb3,
  web3GetAccountBalance,
  web3GenerateNewAccounts,
}
