// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Sidebar from '../components/Sidebar'
import * as SidebarActions from '../actions/sidebar'
import { filesFetchAll } from '../actions/files'
import { setSelectedFile } from '../actions/selectedFile'
import { hideSettings } from '../actions/settings'
import { loadContractBalances } from '../actions/contractForm'

function mapStateToProps(state) {
  return {
    files: state.files,
    selectedFile: state.selectedFile,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...SidebarActions,
    filesFetchAll,
    hideSettings,
    setSelectedFile: (file) => dispatch(setSelectedFile(file)),
    loadContractBalances: (file) => dispatch(loadContractBalances(file)),
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar)
