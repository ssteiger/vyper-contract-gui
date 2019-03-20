function updateHeaderView (file) {
  // add basic file information
  $('#header .file-name').text(file.name)
  $('#main #fileInfo .path').text(file.path)
  // $('#main #fileInfo .added-on').text(file.addedOn)
  // add account address
  let address = web3.eth.coinbase
  let displayAddress = address.slice(0, 6) + '...' + address.slice(38, 42)
  $('#accounts').text('account: ' + displayAddress)
  // copy address to clipboard when clicking on account
  $('#accounts').unbind().on('click', function () {
    let address = web3.eth.coinbase
    navigator.clipboard.writeText(address).then(function () {
      toastr.info('Account address copied to clipboard')
    }, function (err) {
      console.error('Could not copy text: ', err)
    })
  })
  // add events
  $('#reloadFile').unbind().on('click', function () {
    saveVyperFile(file.path)
  })
  $('#removeFile').unbind().on('click', function () {
    Files.remove({ _id: file._id })
    removeFileFromSidebar(file)
    setDefaultMainView()
    toastr.success('Removed file ' + file.name)
  })
}
