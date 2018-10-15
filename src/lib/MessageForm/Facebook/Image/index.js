import React from 'react'
import { Input } from 'antd'
import BaseMessageForm from '../../BaseMessageForm'
import InputField from '../../InputField'

class ImageMessageForm extends BaseMessageForm {
  inputChange = value => {
    const { message } = this.state
    let tmp = { ...message }
    tmp.attachment.payload.url = value
    this.setState({ message: tmp })
  }

  renderForm = () => {
    const { attachment } = this.state.message
    const { url } = attachment.payload
    return (
      <form onSubmit={this.onSubmit}>
        <InputField label="Image Url">
          <Input value={url} onChange={e => this.inputChange(e.target.value)} autoFocus />
        </InputField>
      </form>
    )
  }
}

export default ImageMessageForm
