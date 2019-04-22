// @flow
import React, { Component } from 'react'
import { Button, Upload, message, Icon } from 'antd'

// TODO:
// type Props = {}

const Dragger = Upload.Dragger

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export default class FileUpload extends Component<Props> {

  componentDidMount() {
    $('.ant-upload-list').hide()
  }

  handleChange = (info: Object)  => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => this.setState({ loading: false }))
      if (info.file.name.slice('.vy'.length * -1) !== '.vy') {
        message.error('not a valid vyper file')
      } else {
        this.props.fileUpload(info.file.originFileObj)
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
