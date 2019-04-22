// @flow
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import web3 from './web3'
import settings from './settings'
import sidebar from './sidebar'
import selectedFile from './selectedFile'
import files from './files'
import functionCallResults from './functionCallResults'

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    web3,
    settings,
    sidebar,
    selectedFile,
    files,
    functionCallResults,
  })
}
