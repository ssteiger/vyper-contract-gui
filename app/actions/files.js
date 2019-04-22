// @flow
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

const filesFetchAll = () => ({
  type: FILES_FETCH_ALL,
})

const filesShowAll = (files: Array<Object>) => ({
  type: FILES_SHOW_ALL,
  files,
})

const fileUpload = (file: Object) => ({
  type: FILES_UPLOAD,
  file,
})

const fileCompile = (file: Object) => ({
  type: FILES_COMPILE,
  file,
})

const fileReCompile = (file: Object) => ({
  type: FILES_RECOMPILE,
  file,
})

const fileSave = (file: Object) => ({
  type: FILES_SAVE,
  file,
})

const fileUpdate = (file: Object) => ({
  type: FILES_UPDATE,
})

const fileRemove = (file: Object) => ({
  type: FILES_REMOVE,
  file,
})

export {
  filesFetchAll,
  filesShowAll,
  fileUpload,
  fileCompile,
  fileReCompile,
  fileSave,
  fileUpdate,
  fileRemove,
}
