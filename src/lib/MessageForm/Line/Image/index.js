import React from 'react'
import { Input } from 'antd'
import BaseMessageForm from '../../BaseMessageForm'
import InputField from '../../InputField'

class ImageMessageForm extends BaseMessageForm {
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
    if (originalUrl.substr(0, 5) !== 'https') {
      this.setState({ error: 'Full Image url must be a https!!' })
      return false
    }
    if (previewUrl.substr(0, 5) !== 'https') {
      this.setState({ error: 'Preview Image url must be a https!!' })
      return false
    }
    return true
  }

  renderForm = () => {
    const { originalContentUrl, previewImageUrl } = this.state.message
    return (
      <form onSubmit={this.onSubmit}>
        <InputField label="Preview Image">
          <Input
            value={previewImageUrl}
            onChange={e => this.inputChange('previewImageUrl', e.target.value)}
          />
        </InputField>
        <InputField label="Full Image">
          <Input
            value={originalContentUrl}
            onChange={e => this.inputChange('originalContentUrl', e.target.value)}
            autoFocus
          />
        </InputField>
      </form>
    )
  }
}

export default ImageMessageForm
