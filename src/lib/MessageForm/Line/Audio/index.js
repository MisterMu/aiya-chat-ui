import React from 'react'
import { Input } from 'antd'
import InputField from '../../InputField'
import BaseMessageForm from '../../BaseMessageForm'

class AudioMessageForm extends BaseMessageForm {
  inputChange = value => {
    const { message } = this.state
    let tmp = { ...message }
    tmp.originalContentUrl = value
    this.setState({ message: tmp })
  }

  validateMessage = () => {
    const { message } = this.state
    const originalUrl = (message && message.originalContentUrl) || ''
    if (!originalUrl) {
      this.setState({ error: 'Audio url is required!!' })
      return false
    }
    if (originalUrl.substr(0, 8) !== 'https://') {
      this.setState({ error: 'Audio url schema must be a https!!' })
      return false
    }
    return true
  }

  renderForm = () => {
    const { originalContentUrl } = this.state.message
    return (
      <form onSubmit={this.onSubmit}>
        <InputField label="Audio Url">
          <Input value={originalContentUrl} onChange={e => this.inputChange(e.target.value)} />
        </InputField>
      </form>
    )
  }
}

export default AudioMessageForm
