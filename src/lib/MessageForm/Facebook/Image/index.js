import React from 'react'
import { UploadFile } from '../../../../components/Input'
import BaseMessageForm from '../../BaseMessageForm'
import InputField from '../../InputField'

class ImageMessageForm extends BaseMessageForm {
  onUpload = ({ uploadType, data, endUpload }) => {
    if (uploadType === 'url') {
      this.inputChange(data)
    } else if (uploadType === 'file') {
      const callback = fileUrl => {
        this.inputChange(fileUrl)
        endUpload(fileUrl)
      }
      this.uploadFile(data, callback)
    }
  }

  inputChange = value => {
    const { message } = this.state
    let tmp = { ...message }
    tmp.attachment.payload.url = value
    this.setState({ message: tmp })
  }

  validateMessage = () => {
    const { message } = this.state
    const { url } = message.attachment && message.attachment.payload
    if (!url) {
      this.setState({ error: 'Image Url is required!!' })
      return false
    }
    return true
  }

  renderForm = () => {
    const { attachment } = this.state.message
    const { url } = attachment && attachment.payload
    return (
      <form onSubmit={this.onSubmit}>
        <InputField label="Image">
          <UploadFile defaultValue={url} onUpload={this.onUpload} onReset={() => this.inputChange('')} />
        </InputField>
      </form>
    )
  }
}

export default ImageMessageForm
