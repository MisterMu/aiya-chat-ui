import React from 'react'
import PropTypes from 'prop-types'
import { Input, Divider, Icon } from 'antd'
import styled from 'styled-components'
import { Flex, IconButton } from '../styled'

const ImageContainer = styled.div`
  width: 320px;
  height: 320px;
  background-image: ${props => `url(${props.url})`};
  background-repeat: no-repeat;
  background-position: center center;
  background-color: rgba(0, 0, 0, 0.85);
  background-size: contain;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
`

class UploadFileInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      file: undefined,
      fileUrl: '',
    }
  }

  inputChange = e => {
    this.setState({ inputValue: e.target.value })
  }

  setPreviewImage = fileUrl => {
    this.setState({ fileUrl, inputValue: fileUrl })
  }

  onClose = () => {
    const { onReset } = this.props
    onReset && onReset()
    this.setState({ inputValue: '', file: undefined, fileUrl: '' })
  }

  endEditing = e => {
    const { onUpload } = this.props
    e.target.blur()
    const { inputValue } = this.state
    this.setPreviewImage(inputValue)
    onUpload && onUpload({ uploadType: 'url', data: inputValue })
  }

  upload = e => {
    const { onUpload } = this.props
    e.preventDefault()
    let file = e.target.files[0]
    onUpload && onUpload({ uploadType: 'file', data: file, endUpload: this.setPreviewImage })
  }

  componentWillMount() {
    const { defaultValue } = this.props
    this.setState({ fileUrl: defaultValue, inputValue: defaultValue })
  }

  render() {
    const { inputValue, file, fileUrl } = this.state
    return (
      <React.Fragment>
        {fileUrl && (
          <div>
            <Input
              placeholder="Input file url here..."
              value={inputValue}
              onChange={this.inputChange}
              onPressEnter={this.endEditing}
              onBlur={this.endEditing}
              style={{ marginBottom: 8 }}
            />
            <Flex>
              <ImageContainer url={fileUrl} />
              <IconButton onClick={this.onClose}>
                <Icon type="close-circle" theme="filled" className="danger-icon" />
              </IconButton>
            </Flex>
          </div>
        )}
        {!fileUrl && (
          <div
            style={{
              marginTop: 16,
              marginBottom: 16,
              padding: 16,
              border: '1px solid rgba(0, 0, 0, 0.5)',
              borderStyle: 'dashed',
            }}
          >
            <Input
              placeholder="Input file url here..."
              value={inputValue}
              onChange={this.inputChange}
              onPressEnter={this.endEditing}
              onBlur={this.endEditing}
              disabled={!!file}
            />
            <Divider style={{ marginTop: 8, marginBottom: 8 }}>OR</Divider>
            <input type="file" onChange={this.upload} disabled={fileUrl} />
          </div>
        )}
      </React.Fragment>
    )
  }
}

UploadFileInput.propTypes = {
  onUpload: PropTypes.func,
  onReset: PropTypes.func,
  defaultValue: PropTypes.string,
}

export default UploadFileInput
