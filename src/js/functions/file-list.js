// used for executing python files
const exec = require('child_process').exec
// print python output to nodejs console
const nodeConsole = require('console')
const myNodeConsole = new nodeConsole.Console(process.stdout, process.stderr)

document.addEventListener('DOMContentLoaded', function () {
  // footer
  $('#footer').on('click', '#showContent', function (e) {
    $('#footer .content').slideToggle()
  })
  // file drop event
  document.getElementById('fileDropArea').ondrop = function (e) {
    addFileToList(e)
  }
  // file drag event
  // TODO:
  document.ondragover = document.ondrop = function (e) {
    e.preventDefault()
    // console.log('ondragover')
  }
  // click file drop area
  $('#fileDropArea').on('click', function (e) {
    dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }, function (files) {
      if (files !== undefined) {
        // handle files
        files.forEach(function (filePath) {
          saveVyperFile(filePath)
        })
      }
    })
  })
  // reset local file database
  $('#clearDb').on('click', function () {
    clearFileList()
  })
})

function addFileToList (e) {
  e.preventDefault()
  if (e.dataTransfer.items) {
    // use DataTransferItemList interface to access the file(s)
    for (let i = 0; i < e.dataTransfer.items.length; i++) {
      // if dropped items aren't files, reject them
      if (e.dataTransfer.items[i].kind === 'file') {
        let file = e.dataTransfer.items[i].getAsFile()
        console.log('file[' + i + '].name = ' + file.name)
        // check if got a vyper file
        if (file.name.slice('.vy'.length * -1) === '.vy') {
          saveVyperFile(file.path)
          toastr.success('File added to list')
        } else {
          toastr.error('Please only add valid .vy files')
        }
      }
    }
  } else {
    // TODO:
  }
}

function clearFileList () {
  // clear datastore
  Files.remove({}, { multi: true }, function (err, numRemoved) {
    console.log('removed ' + numRemoved + ' document(s)')
  })
  // remove all files from dom except .template
  $('#fileList').children().filter(':not(:hidden)').remove()
  toastr.success('Datastore cleared')
}
