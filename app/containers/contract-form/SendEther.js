// @flow
import { connect } from 'react-redux'

import { sendEther } from '../../actions/contractForm'
import SendEther from '../../components/contract-form/SendEther'

function mapStateToProps(state) {
  return {
    file: state.selectedFile,
    web3: state.web3,
  }
}

const mapDispatchToProps = dispatch => ({
  sendEther: (ether) => dispatch(sendEther(ether)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendEther)
