// https://github.com/hiddentao/ethereum-abi-ui

function generateFormFromAbi (file) {
  let abi = file.abi
  // for every abi element
  console.log(abi)

  for (let i in abi) {
    let mapped = ''
    // generate long string to display all function inputs
    if (abi[i].inputs) {
      abi[i].inputs.map(function (value, index) {
        mapped = mapped + value.name + ': ' + value.type
        if (index !== abi[i].inputs.length - 1) {
          mapped = mapped + ', '
        }
      })
    }
    let types = [
      'constructor',
      'fallback',
      'event',
      'function'
    ]
    // generate the function name to display
    // of form: 'function name(arg0, arg21, ...): return type'
    let displayName = '' // TODO: find better variable name
    if (abi[i].type !== 'constructor') {
      displayName += abi[i].name + ' '
    } else {
      displayName = abi[i].type
    }
    displayName += '(' + mapped + ')'
    if (abi[i].outputs && abi[i].outputs.length > 0) {
      displayName += ': ' + abi[i].outputs[0].type
    }
    // find the correct template corresponding to the abi-element type
    let template
    switch (abi[i].type) {
      case 'constructor':
        template = $('#constructor')
        $('#constructor .name').text(displayName)
        // generate form for the function inputs
        if (abi[i].inputs.length > 0) {
          // display the form
          template.find('form.parameters').removeAttr('style')
          // itterate over all function parameters
          // and create an input for each one
          abi[i].inputs.forEach(function (parameter, i) {
            // for each parameter create an input
            let formInput = template.find('form.parameters > .form-group.template').clone()
            // clean
            formInput.removeClass('template')
            // display the form input
            formInput.removeAttr('style')
            // set attributes
            formInput.find('.form-text').text(parameter.name)
            formInput.find('input').attr('name', parameter.name)
            formInput.find('input').attr('placeholder', parameter.type)
            // append input to form
            formInput.appendTo(template.find('form.parameters'))
          })
        }
        break
      case 'fallback':
        template = $('#fallback').find('.template').clone()
        break
      case 'event':
        template = $('#events').find('.template').clone()
        template.text(displayName)
        break
      case 'function':
        template = $('#functions').find('.function.template').clone()
        template.find('.name').text(displayName)
        if (abi[i].payable) {
          template.find('.payable').text('@payable')
        }
        if (abi[i].constant) {
          template.find('.constant').text('@constant')
        }

        // generate form for the function inputs
        if (abi[i].inputs.length > 0) {
          // display the form
          template.find('form.parameters').removeAttr('style')
          // itterate over all function parameters
          // and create an input for each one
          abi[i].inputs.forEach(function (parameter, i) {
            // for each parameter create an input
            let formInput = template.find('form.parameters .form-group.template').clone()
            // clean
            formInput.removeClass('template')
            // display the form input
            formInput.removeAttr('style')
            // set attributes
            formInput.find('.form-text').text(parameter.name)
            formInput.find('input').attr('name', parameter.name)
            formInput.find('input').attr('placeholder', parameter.type)
            // append input to form
            formInput.appendTo(template.find('form.parameters'))
          })
        }
        // display gas estimate
        template.find('.gas').text(abi[i].gas + ' gas')
        break
      default:
        // TODO:
        // template = $('#constants').find('.template').clone()
        // template.find('.constant').text('@constant')
        break
    }
    // clean the abi template
    template.removeClass('template')
    // display the abi template
    template.removeAttr('style')
    // append the template to the corresponding node
    switch (abi[i].type) {
      case 'constructor':
        template.appendTo('#constructor')
        break
      case 'fallback':
        template.appendTo('#fallback')
        break
      case 'event':
        template.appendTo('#events')
        break
      case 'function':
        let button = template.find('button').remove()
        button.attr('name', abi[i].name)
        template.find('.parameters').append(button)
        template.appendTo('#functions')
        break
      default:
        template.appendTo('#contract ol.elements')
        break
    }
  }

  // bind events
  // use .unbind() to prevent multiple bindings
  $('#main').unbind().on('click', '#deploy', function (e) {
    e.preventDefault()
    // get form inputs
    // TODO: this is not working
    let inputs = $('#constructor .parameters').find('input').serializeArray().reduce(function (obj, item) {
      obj[item.name] = item.value
      return obj
    }, {})
    console.log('inputs:')
    console.log(inputs)
    deployContract(file, inputs)
  })

  $('#functions').unbind().on('click', 'button.call', async function (e) {
    e.preventDefault()
    // get form inputs
    let inputs = $(this).closest('form').serializeArray().reduce(function (obj, item) {
      obj[item.name] = item.value
      return obj
    }, {})
    // get selected contract address
    let contractAddress = getSelectedContractAddress()
    // get function details
    let functionDetails
    for (var i = 0; i < file.abi.length; i++) {
      if (file.abi[i].name == this.name) {
        functionDetails = file.abi[i]
      }
    }
    // execute contract function
    let return_value = await executeContractFunction(file, contractAddress, functionDetails, inputs)
    // manage return value
    console.log('return_value:')
    console.log(return_value)
    let resultDomNode = $(this).parent().parent().find('.result')
    if (return_value.length == 66 && return_value.substr(0, 2) == '0x') {
      // got transaction hash
      resultDomNode.text('(success)')
    } else {
      // append return value
      resultDomNode.text(return_value)
    }
  })
}
