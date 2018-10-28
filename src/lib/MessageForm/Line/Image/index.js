import React from 'react'
import BaseMessageForm from '../../BaseMessageForm'
import InputField from '../../InputField'
import { UploadFile } from '../../../../components/Input'

class ImageMessageForm extends BaseMessageForm {
  onUpload = (key, { uploadType, data, endUpload }) => {
    if (uploadType === 'url') {
      this.inputChange(key, data)
    } else if (uploadType === 'file') {
      const callback = fileUrl => {
        this.inputChange(key, fileUrl)
        endUpload(fileUrl)
      }
      this.uploadFile(data, callback)
    }
  }

  inputChange = (key, value) => {
    const { message } = this.state
    let tmp = { ...message }
    tmp[key] = value
    this.setState({ message: tmp })
  }

  validateMessage = () => {
    const { message } = this.state
    const originalUrl = (message && message.originalContentUrl) || ''
    const previewUrl = (message && message.previewImageUrl) || ''
    if (!originalUrl || !previewUrl) {
      this.setState({ error: 'Preview Image and Full Image url is required!!' })
      return false
    }
    if (originalUrl.substr(0, 8) !== 'https://') {
      this.setState({ error: 'Full Image url schema must be a https!!' })
      return false
    }
    if (previewUrl.substr(0, 8) !== 'https://') {
      this.setState({ error: 'Preview Image url schema must be a https!!' })
      return false
    }
    return true
  }

  renderForm = () => {
    const { originalContentUrl, previewImageUrl } = this.state.message
    return (
      <form onSubmit={this.onSubmit}>
        <InputField label="Preview Image">
          <UploadFile
            defaultValue={previewImageUrl}
            onUpload={obj => this.onUpload('previewImageUrl', obj)}
            onReset={() => this.inputChange('previewImageUrl', '')}
          />
        </InputField>
        <InputField label="Full Image">
          <UploadFile
            defaultValue={originalContentUrl}
            onUpload={obj => this.onUpload('originalContentUrl', obj)}
            onReset={() => this.inputChange('originalContentUrl', '')}
          />
        </InputField>
      </form>
    )
  }
}

export default ImageMessageForm
