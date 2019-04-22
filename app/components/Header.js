// @flow
import React, { Component } from 'react'
import { Layout, Row, Typography, Button, Menu, Dropdown, Icon, } from 'antd'
import Accounts from '../containers/Accounts'

// TODO:
// type Props = {}

export default class MyHeader extends Component<Props> {

  onClickMenu = ({key}: Object)  => {
    switch (key) {
      case 'settings':
        this.props.showSettings()
        break
      case 'recompile':
        this.props.fileReCompile(this.props.file)
        break
      case 'delete':
        this.props.fileRemove(this.props.file)
        break
    }
  }

  render() {
    const { Header } = Layout
    const ButtonGroup = Button.Group
    const { Title } = Typography

    const menu = (
      <Menu onClick={this.onClickMenu}>
        <Menu.Item key='settings' style={{color: '#1890ff'}}>
          <Icon type='setting' />
          Settings
        </Menu.Item>
        <Menu.Item key='recompile' style={{color: '#52c41a'}}>
          <Icon type='reload' />
          Re-compile File
        </Menu.Item>
        <Menu.Item key='delete' style={{color: '#f5222d'}}>
          <Icon type='delete' />
          Remove File
        </Menu.Item>
      </Menu>
    )

    //console.log('Header this.props:')
    //console.log(this.props)

    return (
      <Header style={{
        position:'fixed',
        height:'auto',
        width:'calc(100% - 200px)',
        paddingLeft:this.props.sidebarWidth,
        padding:'0 24px',
        background:'#fff',
        borderBottom:'1px solid rgb(232, 232, 232)',
        zIndex:10,
      }}>
        <Row>
          <div style={{ float: 'left' }}>
            <Row>
              <Title style={{ marginTop:'20px' }} level={4}>{this.props.file.name}</Title>
              {/*<Text style={{ lineHeight: 'normal' }}>{this.props.file.path}</Text>*/}
            </Row>
          </div>
          <div style={{ float: 'right' }}>
            <Accounts />
            <ButtonGroup>
              <Button onClick={() => this.onClickMenu({key: 'recompile'})}>
                <Icon type='reload' />
              </Button>
              <Dropdown overlay={menu}>
                <Button>
                  Actions <Icon type='down' />
                </Button>
              </Dropdown>
            </ButtonGroup>
          </div>
        </Row>
      </Header>
    );
  }
}
