// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Settings from '../components/Settings'
import * as SettingsActions from '../actions/settings'

import {
  showSettings,
  hideSettings,
  updateSettings,
  importAccount,
  removeAccount,
} from '../actions/settings'

function mapStateToProps(state) {
  return {
    ...state.settings,
    web3: state.web3,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SettingsActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings)
