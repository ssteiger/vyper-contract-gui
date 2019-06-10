// @flow
import React, { Component } from 'react'
// TODO: currently this is not used
// import ReactResizeDetector from 'react-resize-detector'

import { Layout, Menu, Icon } from 'antd'
import FileUpload from '../containers/FileUpload'
import vyperLogo from '../static/vyper-logo-transparent.svg'

// TODO:
// type Props = {}

export default class Sidebar extends Component<Props> {
  componentWillMount() {
    const { filesFetchAll, resizeSidebarWidth } = this.props
    filesFetchAll()
    resizeSidebarWidth(200)
    this.setState({ collapsed: false })
  }

  onCollapse = (collapsed: Boolean) => {
    this.setState({ collapsed })
  }

  onClickMenuItem = (file) => {
    const {
      setSelectedFile,
      hideSettings,
      loadContractBalances,
    } = this.props

    setSelectedFile(file)
    hideSettings()
    loadContractBalances(file)

    // run every x seconds
    const seconds = 8
    clearInterval(this.cron)
    this.cron = setInterval(() => {
      loadContractBalances(file)
    }, seconds*1000)
  }

  render() {
    const { Sider } = Layout

    const { onClickMenuItem } = this
    const { files } = this.props

    return (
      <React.Fragment>
        <img
          id='logo'
          src={vyperLogo}
          alt='vyperLogo'
          style={{
            position:'fixed',
            width:'200px',
            backgroundColor:'#fff',
            borderRight:'1px solid rgb(232, 232, 232)',
          }}
        />
        <Sider
          //collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          theme='light'
          style={{
            position:'fixed',
            left:0,
            marginTop:'173px',
          }}
        >
          <FileUpload />
          {/* <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} /> */}
          <Menu
            defaultSelectedKeys={['0']}
            mode='inline'
            style={{
              height:'calc(100vh - 200px)',
              overflowY:'scroll',
            }}
          >
            {
              files.map((file, key) => {
                return (
                  <Menu.Item key={`menu-item-${key}`} onClick={() => onClickMenuItem(file)}>
                    <Icon type='file' />
                    <span>{file.name}</span>
                  </Menu.Item>
                )
              })
            }
            {/*
            <SubMenu key='sub2' title={<span><Icon type='team' /><span>Team</span></span>}>
              <Menu.Item key='k1'>Team 1</Menu.Item>
              <Menu.Item key='k2'>Team 2</Menu.Item>
            </SubMenu>
            */}
          </Menu>
        </Sider>
      </React.Fragment>
    )
  }
}
