function updateMainView (fileId) {
  Files.findOne({ _id: fileId }, function (err, file) {
    // remove content of previous view
    resetMainView()
    // set header info
    updateHeaderView(file)
    // add contract addresses
    displayContractAddresses(file)
    // add events
    // show other addresses
    $('#deployedContracts .selected').unbind().on('click', function () {
      $('#deployedContracts .body').slideToggle()
    })
    // select new address
    $('#deployedContracts .body .contract-address input').unbind().on('click', function () {
      $('#deployedContracts .body').slideToggle()
      // update view
      displayContractAddresses(file)
    })
    // generate new form from abi
    generateFormFromAbi(file)
    // add all formats to dom
    displayCompileFormats(file)
  }) // Files.findOne
}

// remove content of previous view
function resetMainView () {
  let targets = [
    '#constructor form',
    '#fallback',
    '#events',
    '#functions'
  ]
  // remove all elements except the templates
  targets.forEach(function (entry) {
    $(entry).children().filter(':not(:hidden)').remove()
  })
  // remove all .compiled-formats
  $('#main .compiled-format:visible').remove()
  // save template
  let infoTemplate = $('#contractForm .info-template').clone()
  // remove form elements of previous file
  $('#contractForm .elements').empty()
  infoTemplate.appendTo('#contractForm .elements')
  // save template and deploy button
  let addressOptionTemp = $('#deployedContracts').find('.body .template').clone()
  let deployButton = $('#editDeployedContracts').clone()
  // remove deployed cotnract addresses
  $('#deployedContracts .body').empty()
  // re-append template
  addressOptionTemp.appendTo('#deployedContracts .body')
  deployButton.appendTo('#deployedContracts .body')
  $('#deployedContracts .body').hide()
  // reset selection
  $('#deployedContracts .selected').val('')
}

function displayContractAddresses (file) {
  // remove all addresses from view
  $('#deployedContracts .body li').filter(':not(:hidden)').remove()
  // add selected address to view
  $('#deployedContracts .selected').val(file.deployedAt.selected)
  // add each address to list view
  file.deployedAt.addresses.forEach(function (address, i) {
    // don't add the selected address to the list view
    if (address !== file.deployedAt.selected) {
      let addressOptionTemp = $('#deployedContracts .body').find('.contract-address.template').clone()
      // remove template class
      addressOptionTemp.removeClass('template')
      // display
      addressOptionTemp.removeAttr('style')
      // add content
      addressOptionTemp.find('input').val(address)
      // append to view
      addressOptionTemp.prependTo('#deployedContracts .body')
    }
  })
  // add events
  $('#deployedContracts .body .contract-address input').unbind().on('click', function () {
    // get address
    let address = $(this).val()
    // update db
    Files.update({ _id: file._id }, { $set: { 'deployedAt.selected': address } })
    // update view
    Files.findOne({ _id: file._id }, function (err, file) {
      displayContractAddresses(file)
    })
    $('#deployedContracts .body').slideToggle()
  })
  // copy address to clipboard when clicking on copy button
  $('#deployedContracts button.copy').unbind().on('click', function () {
    let address = $(this).parent().parent().find('input').val()
    navigator.clipboard.writeText(address).then(function () {
      console.log('copied ' + address)
      toastr.info('Contract address copied to clipboard')
    }, function (err) {
      console.error('Could not copy text: ', err)
    })
  })
  // edit deployed contract addresses
  // show and hide addresses
  $('#editDeployedContracts').unbind().on('click', function () {
    $('#deployedContracts button.remove').toggle()
  })
  // remove address
  $('#deployedContracts button.remove').unbind().on('click', function () {
    let element = $(this).parent().parent()
    let address = element.find('input').val()
    toastr.info('Removed contract address ' + address)
    if ($(this).hasClass('main')) {
      // the selected main address
      // clear input
      element.find('input').val('')
    } else {
      // remove input
      element.hide().remove()
    }
    Files.update({ _id: file._id }, { $pull: { 'deployedAt.addresses': address } })
  })
}

function displayCompileFormats (file) {
  // https://github.com/ethereum/vyper/issues/1270
  let formats = [
    'content',
    'abi',
    'method_identifiers',
    'interface',
    'external_interface',
    'source_map',
    'ir',
    'asm',
    'bytecode',
    'bytecode_runtime'
  ]
  // add all compiled formats to body
  formats.forEach(function (format, i) {
    let formatJSON = ['abi', 'source_map']
    let formatJSONPretty = ['method_identifiers']
    let json
    if (formatJSON.includes(format)) {
      json = JSON.stringify(file[format])
    } else if (formatJSONPretty.includes(format)) {
      json = JSON.stringify(file[format], null, 4)
    } else {
      json = file[format]
    }
    // let json = JSON.parse(JSON.stringify(file[format], null, 4))
    let formatTemplate = $('#compiledFormats').find('.compiled-format.template').clone()
    formatTemplate.removeClass('template')
    // display
    formatTemplate.removeAttr('style')
    // add content
    formatTemplate.find('.title').text(format)
    formatTemplate.find('textarea').text(json)
    // append
    formatTemplate.appendTo('#compiledFormats > .row')
  })
}

function setDefaultMainView () {
  Files.findOne({}, function (err, file) {
    if (file) {
      updateMainView(file._id)
    } else {
      // there is no file to show
      $('#settings').slideDown()
    }
  })
}
