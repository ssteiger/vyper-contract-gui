document.addEventListener('DOMContentLoaded', function () {
  initSidebar()
  // add events
  // select file from sidebar
  $('#sidebar').on('click', '.file', function (e) {
    let fileId = $(this).find('.file-name').attr('data-id')
    updateMainView(fileId)
    // hide settings
    $('#settings').slideUp()
    // scroll to top
    // $('#main').animate({scrollTop: 0})
    $('#main').scrollTop(0)
  })
  // bind events
  $('#sidebar').on('click', '#showFileUpload', function (e) {
    $('#fileDropArea').slideToggle(function () {
      setFileListHeight()
    })
  })
  $('#footer').on('click', '#toggleSettings', function (e) {
    $('#settings').slideToggle()
  })
  // adjust height of file list when the window size changes
  window.addEventListener('resize', function (e) {
    e.preventDefault()
    // console.log('resize')
    setFileListHeight()
  })
})

function initSidebar () {
  // get all files stored
  Files.find({}, function (err, files) {
    // add each file to view
    files.forEach(function (file) {
      addFileToSidebar(file)
    })
  })
  setFileListHeight()
}

function addFileToSidebar (file) {
  console.log('running addFileToSidebar()')
  let fileName = file.path.split('/').pop()
  // let onlyFilePath = file.path.replace(fileName, '')
  // create view
  let temp = $('#sidebar .file.template').clone()
  temp.removeClass('template')
  // display
  temp.removeAttr('style')
  // add file info's
  temp.find('.file-name').text(fileName)
  temp.find('.file-name').attr('data-id', file._id)
  // append view to dom
  temp.appendTo('#fileList')
}

function removeFileFromSidebar (file) {
  let selector = '.file-name[data-id="' + file._id + '"]'
  $('#fileList').find(selector).parent().remove()
}

function setFileListHeight () {
  let sidebar = $('#sidebar').height()

  let logo = $('#logo').height()
  let button = $('#showFileUpload').height()
  let search = $('#search').height()
  let footer = $('#footer').height()
  let combinedHeight = logo + button + search + footer + 13

  if ($('#fileDropArea').is(':visible')) {
    let fileDropArea = $('#fileDropArea').height()
    combinedHeight += fileDropArea
  }
  console.log('sidebarHeight:')
  console.log(sidebar)
  console.log('combinedHeight:')
  console.log(combinedHeight)
  // set height
  $('#fileList').height(sidebar - combinedHeight)
  console.log('set #fileList height')
  console.log(sidebar - combinedHeight)
  console.log()
}
