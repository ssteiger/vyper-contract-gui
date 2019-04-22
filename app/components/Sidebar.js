// @flow
import React, { Component } from 'react'
// TODO: currently this is not used
import ReactResizeDetector from 'react-resize-detector'

import { Layout, Menu, Icon } from 'antd'
import FileUpload from '../containers/FileUpload'
import vyperLogo from '../static/vyper-logo-transparent.svg'

// TODO:
// type Props = {}

export default class Sidebar extends Component<Props> {

  componentWillMount() {
    this.props.filesFetchAll()
    this.props.resizeSidebarWidth(200)
    // TODO: this is not the redux way
    this.setState({ collapsed: false })
  }

  onCollapse = (collapsed: Boolean) => {
    this.setState({ collapsed })
  }

  onClickMenuItem = (file) => {
    this.props.loadContractBalances(file)
    this.props.hideSettings()

    // https://medium.com/@machadogj/timers-in-react-with-redux-apps-9a5a722162e8
    // https://stackoverflow.com/questions/49971046/how-to-dispatch-actions-via-a-timer-using-redux
    // TODO: this is not optimal, need to put this somewhere else (in its own function)
    //       also when the selectedFile is updated (for ex. deleted,) the file data changes,
    //       but this is not re-run
    clearInterval(this.cron)
    // run every x seconds
    const seconds = 8
    const loadContractBalances = (file) => this.props.loadContractBalances(file)
    this.cron = setInterval(function() {loadContractBalances(file)}, seconds*1000)
  }

  render() {
    const { Sider } = Layout
    const SubMenu = Menu.SubMenu

    const { files } = this.props
    const onClickMenuItem = this.onClickMenuItem

    return (
      <React.Fragment>
        <img
          id='logo'
          src={vyperLogo}
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
          {/*<ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />*/}
          <Menu
            defaultSelectedKeys={['0']}
            mode='inline'
            style={{
              height:'calc(100vh - 200px)',
              overflowY:'scroll',
            }}
          >
            {
              files.map(function (file, key) {
                return (
                  <Menu.Item key={key} onClick={() => onClickMenuItem(file)}>
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
