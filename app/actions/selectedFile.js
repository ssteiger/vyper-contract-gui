// @flow
import {
  FILE_SET_SELECTED,
} from '../constants/actions'

const setSelectedFile = (file: Object) => ({
  type: FILE_SET_SELECTED,
  file,
})

export {
  setSelectedFile,
}
