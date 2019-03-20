function deployContract (file, inputs) {
  // convert object into array with all values
  inputs = Object.values(inputs)
  // remove "" quotes
  inputs = inputs.filter(function (a) { return a !== '' })

  console.log('file:')
  console.log(file)
  console.log('inputs:')
  console.log(inputs)

  let mySenderAddress = web3.eth.coinbase

  let abi = file.abi
  let bytecode = file.bytecode
  let gasEstimate = file.gas || 3000000
  let myContract = web3.eth.contract(abi)
  console.log('mySenderAddress:')
  console.log(mySenderAddress)
  console.log('myContract:')
  console.log(myContract)
  console.log('gasEstimate')
  console.log(gasEstimate)

  // deploy a new contract
  // TODO: arguments are not passed correct
  console.log('deploying contract with arguments:')
  console.log(inputs)
  let myContractReturned = myContract.new(...inputs, {
    from: mySenderAddress,
    data: bytecode,
    gas: gasEstimate
  }, function (err, contract) {
    console.log(contract)
    if (!err) {
      // NOTE: The callback will fire twice!
      // Once the contract has the transactionHash property set and once its deployed on an address.
      // e.g. check tx hash on the first call (transaction send)
      if (!contract.address) {
        console.log(contract.transactionHash) // The hash of the transaction, which deploys the contract
        // check address on the second call (contract deployed)
      } else {
        console.log(contract.address) // the contract address
        Files.update({ _id: file._id }, {
          $push: { 'deployedAt.addresses': contract.address },
          $set: { 'deployedAt.selected': contract.address }
        }, function (err, numReplaced) {
          if (!err) {
            // update view
            updateMainView(file._id)
          } else {
            console.err(err)
          }
        })
        toastr.success('Contract deployed to ' + contract.address)
      }
      // Note that the returned "myContractReturned" === "myContract",
      // so the returned "myContractReturned" object will also get the address set.
    } else {
      console.error(err)
      toastr.error(err)
    }
  })
}
