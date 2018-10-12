import React from 'react'
import { Input } from 'antd'
import BaseMessageForm from '../../BaseMessageForm'

class TextMessageForm extends BaseMessageForm {
  renderForm() {
    const { text } = this.state.message
    return (
      <form onSubmit={this.onSubmit}>
        <Input value={text} onChange={e => this.inputChange('text', e.target.value)} />
      </form>
    )
  }
}

export default TextMessageForm
