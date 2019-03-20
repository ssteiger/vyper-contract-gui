let defaults = {
  RPCServer: 'http://127.0.0.1:7545',
  compilerURL: 'http://127.0.0.1:8000/compile',
  mainAccount: {
    address: '0xC2D7CF95645D33006175B78989035C7c9061d3F9'
  }
}

// initialize settings on start-up
initSettings()

function initSettings () {
  Settings.count({}, function (err, count) {
    // check if there are settings in the datastore
    if (count < 2) {
      // no settings found, generate them
      console.log('settings doc count is < 2: inserting defaults')
      setRPCServer()
      setCompilerURL()
    } else {
      // settings found, add them to the dom
      addSettingsToDom()
    }
  })
}

function setRPCServer (url) {
  if (url == '' || url == null) {
    url = defaults.RPCServer
    console.log('Setting default RPCServer')
  }
  Settings.update({ _id: 'rpc_url' }, { _id: 'rpc_url', value: url }, { upsert: true })
  setWeb3Provider(url)
}
function setCompilerURL (url, _callback) {
  if (url == '' || url == null) {
    url = defaults.compilerURL
    console.log('Setting default compilerURL')
  }
  Settings.update({ _id: 'compiler_url' }, { _id: 'compiler_url', value: url }, { upsert: true }, function () {
    addSettingsToDom()
  })
  toastr.success('New compiler endpoint set')
}
function getCompilerURL () {
  let compiler_url = settings.findOne({ _id: 'compiler_url' })
  return compiler_url.value
}

function addSettingsToDom () {
  // put current settings into form
  Settings.findOne({ _id: 'rpc_url' }, function (err, doc) {
    if (!err) {
      $('#settings input[name=rpc_url]').val(doc.value)
    } else {
      toastr.error('Error: ' + err)
    }
  })
  Settings.findOne({ _id: 'compiler_url' }, function (err, doc) {
    if (!err) {
      $('#settings input[name=compiler_url]').val(doc.value)
    } else {
      toastr.error('Error: ' + err)
    }
  })
}

document.addEventListener('DOMContentLoaded', function () {
  // add event for saving new settings
  $('#settings').on('click', 'button.save', function (e) {
    // get form inputs
    let inputs = $('#settings form').serializeArray().reduce(function (obj, item) {
      obj[item.name] = item.value
      return obj
    }, {})
    // save and activate new settings
    setRPCServer(inputs.rpc_url)
    setCompilerURL(inputs.compiler_url)
    // hide settings
    $('#settings').slideUp()
    setDefaultMainView()
  })
  /*
  // TODO:
  $('#settings input[name=address]').val(web3.eth.coinbase)
  $('#settings input[name=private_key]').val()

  // get template
  let accountTemplate = $('#settings .accounts.template').clone()
  // remove template class
  temp.removeClass('template')
  // display
  accountTemplate.removeAttr('style')
  // for each account
  web.eth.accounts.forEach(function(account, i) {
    // add address as value
    accountTemplate.find('input').val(account)
    // append template to dom
    accountTemplate.appendTo('#settings .accounts')
  })
  */
})

// TODO: implement this
/*
function setMainAccount (private_key) {
  if (private_key == '' || private_key == null) {
    private_key = defaults.mainAccount.private_key
    console.log('Setting default main account')
  }

  // TODO: this does not work
  console.log(web3)
  console.log(web3.eth)
  let address = web3.eth.accounts.privateKeyToAccount(private_key)

  toastr.success('New main account set')
}
*/
