import { takeEvery } from 'redux-saga/effects'

import {
  FILE_UPLOAD,
  FILE_RECOMPILE,
  FILE_REMOVE,
} from '../../constants/actions'

import uploadFile from './uploadFile'
import reCompileFile from './reCompileFile'
import removeFile from '../file/removeFile'

export default function* fileSaga() {
  yield takeEvery(FILE_UPLOAD, uploadFile)
  yield takeEvery(FILE_RECOMPILE, reCompileFile)
  yield takeEvery(FILE_REMOVE, removeFile)
}
