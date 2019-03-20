const { dialog } = require('electron').remote

document.addEventListener('DOMContentLoaded', function () {
  // search
  $('#searchInput').keyup(function (e) {
    // get search query
    let input = $('#searchInput').val()
    // remove all displayed files, except template
    $('#fileList').find('.file:not(:hidden)').remove()

    if (input === '') {
      // search is empty -> show all files in list
      initSidebar()
    } else {
      let regex = new RegExp(input)
      // query documents
      Files.find({ path: { $regex: regex } }, function (err, files) {
        // if there are results
        if (files.length > 0) {
          // clear current file list, except template
          $('#fileList').find('li.file:not(:hidden)').remove()
          // append elements in query to list
          files.forEach(function (file) {
            addFileToSidebar(file)
          })
        }
      })
    } // else
  })
})
