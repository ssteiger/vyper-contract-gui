// @flow
import React, { Component } from 'react'
import { Button, Upload, message, Icon } from 'antd'

// TODO:
// type Props = {}

const { Dragger } = Upload

export default class FileUpload extends Component<Props> {

  componentDidMount() {
    // hide ant-design related file-list
    $('.ant-upload-list').hide()
  }

  getBase64 = (file, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(file)
  }

  handleChange = (info: Object)  => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    const { fileUpload } = this.props
    if (info.file.status === 'done') {
      this.getBase64(info.file.originFileObj, filePath => this.setState({ loading: false }))
      if (info.file.name.slice('.vy'.length * -1) !== '.vy') {
        message.error('not a valid vyper file')
      } else {
        fileUpload(info.file.originFileObj)
      }
    }
  }

  render() {
    const { toggleUploadView, showUpload } = this.props

    return (
      <React.Fragment>
        <Button block onClick={toggleUploadView}>
          <Icon type='upload' />
          upload file
        </Button>
        <div style={{ display:showUpload ? 'block' : 'none' }} >
          <Dragger onChange={this.handleChange}>
            <p className='ant-upload-drag-icon'>
              <Icon type='inbox' />
            </p>
            <p className='ant-upload-text'>
              Click or drag file to this area to upload
            </p>
            <p className='ant-upload-hint'>
              Support for a single or bulk upload.
            </p>
          </Dragger>
        </div>
      </React.Fragment>
    )
  }
}
