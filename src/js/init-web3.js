// https://github.com/ethereum/wiki/wiki/JavaScript-API
import Web3 from 'web3'

var provider, web3

function setWeb3Provider (httpProvider) {
  if (httpProvider == '') {
    let ganache = 'http://localhost:7545'
    httpProvider = ganache
  }
  provider = new Web3.providers.HttpProvider(httpProvider)
  web3 = new Web3(provider)

  console.log('new provider set')
  console.log('coinbase: ' + web3.eth.coinbase)
  console.log('web3 version: ' + web3.version.api)

  toastr.success('RPC Server endpoint set to: ' + httpProvider)
  toastr.success('Coinbase set to: ' + web3.eth.coinbase)
  toastr.info('Web3 version: ' + web3.version.api)
}

// TODO: this is really awkward
// set rpc endpoint on start-up
Settings.findOne({ _id: 'rpc_url' }, function (err, doc) {
  if (doc) {
    setRPCServer(doc.value)
  }
})
