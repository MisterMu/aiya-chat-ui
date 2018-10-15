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

  renderForm = () => {
    const { originalContentUrl, previewImageUrl } = this.state.message
    return (
      <form onSubmit={this.onSubmit}>
        <InputField label="Preview Image">
          <Input
            value={originalContentUrl}
            onChange={e => this.inputChange('originalContentUrl', e.target.value)}
            autoFocus
          />
        </InputField>
        <InputField label="Full Image">
          <Input
            value={previewImageUrl}
            onChange={e => this.inputChange('previewImageUrl', e.target.value)}
          />
        </InputField>
      </form>
    )
  }
}

export default ImageMessageForm
