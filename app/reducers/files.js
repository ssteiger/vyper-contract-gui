// @flow
import type { Action } from './types'

import {
  FILES_FETCH_ALL,
  FILES_SHOW_ALL,
  FILES_UPLOAD,
  FILES_COMPILE,
  FILES_RECOMPILE,
  FILES_SAVE,
  FILES_UPDATE,
  FILES_REMOVE,
} from '../constants/actions'

const initialState = []

export default function files(state: Array = initialState, action: Action) {
  // copy state array
  let newState = state.slice(0)

  switch (action.type) {
    case FILES_FETCH_ALL:
      return newState
    case FILES_SHOW_ALL:
      // copy array
      const files = action.files.slice(0)
      return files
    case FILES_UPLOAD:
      return newState
    case FILES_COMPILE:
      return newState
    case FILES_RECOMPILE:
      return newState
    case FILES_SAVE:
      newState.push(action.file)
      return newState
    case FILES_UPDATE:
      return newState
    case FILES_REMOVE:
      return newState
    default:
      return newState
  }
}
