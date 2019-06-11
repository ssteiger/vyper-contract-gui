// https://redux-saga.js.org/docs/advanced/RootSaga.html

import { spawn } from 'redux-saga/effects'

import web3Saga from './web3/'
import settingsSaga from './settings/'
import filesSaga from './files/'
import fileSaga from './file/'
import contractSaga from './contract/'

export default function* rootSaga() {
  yield spawn(web3Saga)
  yield spawn(settingsSaga)
  yield spawn(filesSaga)
  yield spawn(fileSaga)
  yield spawn(contractSaga)
}

/*
export default function* rootSaga () {
  console.log('creating rootSaga')
  const sagas = [
    addFileSaga,
    sidebarSaga
    //saga2,
    //saga3,
  ]
  console.log(sagas)

  yield sagas.map(saga =>
    spawn(function* () {
      console.log('in spawn')
      while (true) {
        try {
          console.log('calling saga')
          console.log(saga)
          yield call(saga)
          break
        } catch (e) {
          console.log(e)
        }
      }
    })
  )
}
*/
