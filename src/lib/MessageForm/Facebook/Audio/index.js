import React from 'react'
import { Input } from 'antd'
import BaseMessageForm from '../../BaseMessageForm'
import InputField from '../../InputField'

class AudioMessageForm extends BaseMessageForm {
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
      this.setState({ error: 'Audio Url is required!!' })
      return false
    }
    return true
  }

  renderForm = () => {
    const { attachment } = this.state.message
    const { url } = attachment && attachment.payload
    return (
      <form onSubmit={this.onSubmit}>
        <InputField label="Audio Url">
          <Input value={url} onChange={e => this.inputChange(e.target.value)} autoFocus />
        </InputField>
      </form>
    )
  }
}

export default AudioMessageForm
