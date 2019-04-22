// @flow
import { message } from 'antd'
import { Settings } from '../datastore'

export default async function compileVyperFile (file: File) {
  message.info(`compiling file: ${file.name} [${file.path}]`)

  return new Promise((resolve, reject) => {
    Settings.findOne({ _id: 'connections' }, (err, connections) => {
      const request = new XMLHttpRequest()
      // TODO: catch when compilerUrl is not defined
      //let compileURL = 'https://vyper.live/compile'
      //let compileURL = 'http://127.0.0.1:8000/compile'
      const { compilerUrl } = connections

      request.open('POST', compilerUrl)
      request.setRequestHeader('Content-Type', 'application/json')
      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          // turn string into json object
          const resultJSON = JSON.parse(request.response)
          // also converts file Object to JSON object
          $.extend(resultJSON, file)
          resolve(resultJSON)
        } else {
          const response = JSON.parse(request.response)
          message.error(`error compiling file: ${response.message}`)
          reject(request.response)
        }
      }
      // send request
      let result = request.send(JSON.stringify({ 'code': file.content }))
      request.onerror = (e) => {
        console.log(e)
        message.error('XMLHttpRequest error: Are your RPC/Compiler connections healthy?')
      }
    })
  })
}
