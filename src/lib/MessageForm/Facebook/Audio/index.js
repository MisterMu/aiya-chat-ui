import React from 'react'
import { Input } from 'antd'
import BaseMessageForm from '../../BaseMessageForm'
import InputField from '../../InputField'

class AudioMessageForm extends BaseMessageForm {
  inputChange = value => {
    const { message } = this.state
    let tmp = {
      ...message,
      attachment: {
        type: 'audio',
        payload: {
          url: value,
        },
      },
    }
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
    const { message } = this.state
    if (!(message && message.attachment && message.attachment.payload)) {
      return null
    }

    const payload = { ...message.attachment.payload }

    return (
      <form onSubmit={this.onSubmit}>
        <InputField label="Audio Url">
          <Input value={payload.url} onChange={e => this.inputChange(e.target.value)} autoFocus />
        </InputField>
      </form>
    )
  }
}

export default AudioMessageForm
