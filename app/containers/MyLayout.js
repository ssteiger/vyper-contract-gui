// @flow
import { connect } from 'react-redux'

import MyLayout from '../components/MyLayout'
import { initializeSettings } from '../actions/settings'
import { initWeb3 } from '../actions/web3'

function mapStateToProps(state) {
  const { sidebar: { sidebarWidth } } = state
  return {
    ...state,
    sidebarWidth,
  }
}

const mapDispatchToProps = dispatch => ({
  initializeSettings: () => dispatch(initializeSettings()),
  initWeb3: () => dispatch(initWeb3()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyLayout)
