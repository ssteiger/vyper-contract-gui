// TODO: maybe change this and get value from db
function getSelectedContractAddress () {
  let address = $('#deployedContracts .selected').val()
  return address
}

function isNormalInteger (str) {
  return /^\+?(0|[1-9]\d*)$/.test(str)
}
