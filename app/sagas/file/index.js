import { takeEvery } from 'redux-saga/effects'

import {
  FILES_UPLOAD,
  FILES_COMPILE,
  FILES_RECOMPILE,
  FILES_SAVE,
} from '../../constants/actions'

import uploadFile from './uploadFile'
import compileFile from './compileFile'
import reCompileFile from './reCompileFile'
import saveFile from './saveFile'

export default function* fileSaga() {
  yield takeEvery(FILES_UPLOAD, uploadFile)
  yield takeEvery(FILES_COMPILE, compileFile)
  yield takeEvery(FILES_RECOMPILE, reCompileFile)
  yield takeEvery(FILES_SAVE, saveFile)
}
