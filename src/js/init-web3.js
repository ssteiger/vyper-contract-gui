// https://github.com/ethereum/wiki/wiki/JavaScript-API
import Web3 from 'web3'

var provider, web3

async function setWeb3Provider (httpProvider) {
  if (httpProvider == '') {
    let ganache = 'http://localhost:7545'
    httpProvider = ganache
  }

  web3 = new Web3()
  provider = new Web3.providers.HttpProvider(httpProvider)

  // TODO:
  //      Uncaught (in promise) Error: CONNECTION ERROR: Couldn't connect to
  //      node http://127.0.0.1:7545.",
  //      source: Vyper-contract-GUI/src/js/assets/web3.min.js
  web3.setProvider(provider, function(err, res) {
    if (err) {
      console.log(err)
      toastr.error(err)
    } else {
      console.log(res)
    }
  })

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
