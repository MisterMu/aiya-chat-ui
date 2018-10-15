import React from 'react'
import { Input } from 'antd'
import BaseMessageForm from '../../BaseMessageForm'
import InputField from '../../InputField'

class TextMessageForm extends BaseMessageForm {
  inputChange = value => {
    const { message } = this.state
    let tmp = { ...message }
    tmp.text = value
    this.setState({ message: tmp })
  }

  renderForm = () => {
    const { text } = this.state.message
    return (
      <form onSubmit={this.onSubmit}>
        <InputField label="Text">
          <Input value={text} onChange={e => this.inputChange(e.target.value)} autoFocus />
        </InputField>
      </form>
    )
  }
}

export default TextMessageForm
