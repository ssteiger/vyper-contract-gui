// @flow
import {
  FILES_FETCH_ALL,
  FILES_SHOW_ALL,
  FILE_UPLOAD,
  FILE_RECOMPILE,
  FILE_SAVE,
  FILE_REMOVE,
} from '../constants/actions'

const filesFetchAll = () => ({
  type: FILES_FETCH_ALL,
})

const filesShowAll = (files: Array<Object>) => ({
  type: FILES_SHOW_ALL,
  files,
})

const fileUpload = (file: Object) => ({
  type: FILE_UPLOAD,
  file,
})

const fileReCompile = (file: Object) => ({
  type: FILE_RECOMPILE,
  file,
})

const fileSave = (file: Object) => ({
  type: FILE_SAVE,
  file,
})

const fileRemove = (file: Object) => ({
  type: FILE_REMOVE,
  file,
})

export {
  filesFetchAll,
  filesShowAll,
  fileUpload,
  fileReCompile,
  fileSave,
  fileRemove,
}
