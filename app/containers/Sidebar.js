// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Sidebar from '../components/Sidebar'
import * as SidebarActions from '../actions/sidebar'
import { filesFetchAll } from '../actions/files'
import { hideSettings } from '../actions/settings'
import { setSelectedFile } from '../actions/selectedFile'

function mapStateToProps(state) {
  const { files, selectedFile } = state
  return {
    files,
    selectedFile,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...SidebarActions,
    filesFetchAll,
    hideSettings,
    setSelectedFile: (file) => dispatch(setSelectedFile(file)),
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar)
