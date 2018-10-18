import React from 'react'
import { Input } from 'antd'
import BaseMessageForm from '../../BaseMessageForm'
import InputField from '../../InputField'
import { InfoText } from '../../styled'

class TextMessageForm extends BaseMessageForm {
  inputChange = value => {
    const { message } = this.state
    let tmp = { ...message }
    tmp.text = value
    this.setState({ message: tmp })
  }

  validateMessage = () => {
    const { message } = this.state
    const text = (message && message.text) || ''
    if (text.length > 2000) {
      return false
    }
    return true
  }

  renderForm = () => {
    const { text } = this.state.message
    return (
      <form onSubmit={this.onSubmit}>
        <InputField label="Text">
          <React.Fragment>
            <Input.TextArea
              value={text}
              onChange={e => this.inputChange(e.target.value)}
              placeholder="Text message.."
              autoFocus
              autosize
            />
            <div style={{ textAlign: 'right' }}>
              <InfoText>{text.length} / 2000</InfoText>
            </div>
          </React.Fragment>
        </InputField>
      </form>
    )
  }
}

export default TextMessageForm
