// @flow
import type { Action } from './types'

import {
  FILES_FETCH_ALL,
  FILES_SHOW_ALL,
  FILE_UPLOAD,
  FILE_RECOMPILE,
  FILE_SAVE,
  FILE_REMOVE,
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
    case FILE_UPLOAD:
      return newState
    case FILE_RECOMPILE:
      return newState
    case FILE_SAVE:
      newState.push(action.file)
      return newState
    case FILE_REMOVE:
      return newState
    default:
      return newState
  }
}
