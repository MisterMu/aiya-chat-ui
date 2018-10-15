import React from 'react'
import { Input } from 'antd'
import BaseMessageForm from '../../BaseMessageForm'
import InputField from '../../InputField'

class ImageMessageForm extends BaseMessageForm {
  inputChange = value => {
    const { message } = this.state
    let tmp = { ...message }
    tmp.originalContentUrl = value
    this.setState({ message: tmp })
  }

  renderForm = () => {
    const { originalContentUrl } = this.state.message
    return (
      <form onSubmit={this.onSubmit}>
        <InputField label="Url">
          <Input
            value={originalContentUrl}
            onChange={e => this.inputChange(e.target.value)}
            autoFocus
          />
        </InputField>
      </form>
    )
  }
}

export default ImageMessageForm
