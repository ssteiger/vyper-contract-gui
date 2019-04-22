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
    const { initializeSettings, initWeb3 } = this.props
    initializeSettings()
    initWeb3()
  }

  mainView = () => {
    const { selectedFile, settings }  = this.props
    if (selectedFile._id && !settings.show) {
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
    const { sidebarWidth } = this.props

    return (
      <Layout style={{ minHeight:'100vh' }}>
        <Sidebar />
        <Layout>
          <div style={{ marginLeft: sidebarWidth }}>
            { this.mainView() }
          </div>
        </Layout>
      </Layout>
    )
  }
}
