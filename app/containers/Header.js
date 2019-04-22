// @flow
import { connect } from 'react-redux'

import Header from '../components/Header'
import { showSettings } from '../actions/settings'
import { fileReCompile, fileRemove } from '../actions/files'

function mapStateToProps(state) {
  return {
    file: state.selectedFile,
    showSettings,
    fileReCompile,
    fileRemove,
  }
}

const mapDispatchToProps = dispatch => ({
  showSettings: () => dispatch(showSettings()),
  fileReCompile: (file) => dispatch(fileReCompile(file)),
  fileRemove: (file) => dispatch(fileRemove(file)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
