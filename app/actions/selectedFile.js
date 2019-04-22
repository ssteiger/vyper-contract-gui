// @flow
import {
  SELECTED_FILE_SET,
} from '../constants/actions'

const setSelectedFile = (file: Object) => ({
  type: SELECTED_FILE_SET,
  file,
})

export {
  setSelectedFile,
}
