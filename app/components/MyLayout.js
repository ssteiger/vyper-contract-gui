// @flow
import React, { Component } from 'react'
import { Layout } from 'antd'

import Sidebar from '../containers/Sidebar'
import Settings from '../containers/Settings'
import Header from '../containers/Header'
import File from '../containers/File'

// TODO:
// type Props = {}

export default class MyLayout extends Component<Props> {
  componentWillMount() {
    this.props.initializeSettings()
    this.props.initWeb3()
  }

  mainView = () => {
    if (this.props.selectedFile._id && !this.props.settings.show) {
      return (
        <React.Fragment>
          <Header />
          <File />
        </React.Fragment>
      )
    }
    return (<Settings />)
  }

  render() {
    return (
      <Layout style={{ minHeight:'100vh' }}>
        <Sidebar />
        <Layout>
          <div style={{ marginLeft: this.props.sidebarWidth }}>
            { this.mainView() }
          </div>
        </Layout>
      </Layout>
    )
  }
}
