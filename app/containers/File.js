// @flow
import { connect } from 'react-redux'

import File from '../components/File'

function mapStateToProps(state) {
  return {
    ...state.selectedFile,
  }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(File)
