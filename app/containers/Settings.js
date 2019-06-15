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
  const { settings, accounts } = state
  return {
    ...settings,
    accounts,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SettingsActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings)
