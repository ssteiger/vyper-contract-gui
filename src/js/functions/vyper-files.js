async function compileVyperFile (file) {
  toastr.info('Compiling file: ' + file.name + ' [' + file.path + ']')

  return new Promise(function (resolve, reject) {
    Settings.findOne({ _id: 'compiler_url' }, function (err, compiler_url) {
      const request = new XMLHttpRequest()
      // let compileURL = 'https://vyper.live/compile'
      // let compileURL = 'http://127.0.0.1:8000/compile'
      let compileURL = compiler_url.value
      request.open('POST', compileURL)
      request.setRequestHeader('Content-Type', 'application/json')

      request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
          // console.log(request)
          resolve(request.response)
        } else {
          console.error(request.response)
          let response = JSON.parse(request.response)
          toastr.error('Error compiling file: ' + response.message)
          reject(request.response)
        }
      }
      // send request
      let result = request.send(JSON.stringify({ 'code': file.content }))
      request.onerror = function (e) {
        toastr.error('XMLHttpRequest error: Are your RPC/Compiler connections healthy?')
      }
    })
  })
}

/*
let formats = [
  'bytecode',
  'bytecode_runtime',
  'abi',
  'abi_python',
  'source_map',
  'method_identifiers',
  //'combined_json',
  'interface',
  'external_interface'
]

// https://itnext.io/https-medium-com-popov4ik4-what-about-promises-in-loops-e94c97ad39c0
let allCompiledFormats = await Promise.all(formats.map(async function(format, i) {
  //let argument = '-f ' + formats[i]
  const result = await compileVyperFile(file)
  return result
}))
*/

async function saveVyperFile (filePath) {
  let fileName = filePath.slice(filePath.lastIndexOf('/') + 1)
  let fileContent = await fetch(filePath).then(response => response.text())

  let file = {
    name: fileName,
    path: filePath,
    addedOn: new Date(),
    content: fileContent,
    deployedAt: {
      addresses: [],
      selected: ''
    }
  }

  const resultString = await compileVyperFile(file)
  const resultJSON = JSON.parse(resultString)

  // remove unnecessary attribute
  delete resultJSON.status
  // merge the two objects
  $.extend(file, resultJSON)

  // clean external_interface
  file.external_interface = file.external_interface.replace('\n# External Contracts\n', '')

  // check if file exists
  Files.findOne({ path: filePath }, function (err, doc) {
    if (doc) {
      // TODO: this is not working, maybe update main view
      // update datastore entry
      console.log('updating db entry for vyper file')
      Files.update({ _id: file._id }, file)
    } else {
      // add file to datastore
      Files.insert(file, function (err, entry) {
        console.log('adding to datastore:')
        console.log(entry)
        if (!err) {
          // update view
          addFileToSidebar(entry)
        } else {
          console.err(err)
        }
      })
    }
  })
}
