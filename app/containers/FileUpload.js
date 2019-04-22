// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import FileUpload from '../components/FileUpload'
import { fileUpload } from '../actions/files'
import { toggleUploadView } from '../actions/sidebar'

function mapStateToProps(state) {
  return {
    ...state.sidebar,
    toggleUploadView,
    loading: false
  }
}

const mapDispatchToProps = dispatch => ({
  fileUpload: (file) => dispatch(fileUpload(file)),
  toggleUploadView: () => dispatch(toggleUploadView()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FileUpload)
