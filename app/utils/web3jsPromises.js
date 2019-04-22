// @flow
import { Settings } from '../datastore'

const Web3 = require('web3')

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    let { web3 } = window
    const alreadyInjected = typeof web3 !== 'undefined'
    if (alreadyInjected) {
      web3 = new Web3(web3.currentProvider)
      resolve(web3)
    } else {
      Settings.findOne({ _id: 'connections' }, (err, connections) => {
        const { rpcServer } = connections
        const provider = new Web3.providers.HttpProvider(rpcServer)
        resolve(new Web3(provider))
      })
    }
  })

const web3GetAccountBalance = async (address) => {
  const web3 = await getWeb3()

  return new Promise((resolve, reject) => {
    resolve(web3.eth.getBalance(address))
  })
}

const web3GenerateNewAccounts = async (number) => {
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
