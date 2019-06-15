import { call, put } from 'redux-saga/effects'
import { message } from 'antd'

import {
  FILE_SET_SELECTED,
  FILES_FETCH_ALL,
} from '../../constants/actions'

import { Files } from '../../datastore'

import {
  promiseDbUpdate,
} from '../../utils'

export default function* setSelectedAddress(action) {
  const { file, address } = action.payload
  try {
    let query_find = { _id: file._id }
    let query_change = {
      $set: { 'deployedAt.selected': { address } }
    }
    yield call(promiseDbUpdate, Files, query_find, query_change)
    file.deployedAt.selected = { address }
    yield put({ type: FILE_SET_SELECTED, file })
    yield put({ type: FILES_FETCH_ALL })
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}
