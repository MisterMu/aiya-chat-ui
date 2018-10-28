import React from 'react'
import { Input } from 'antd'
import BaseMessageForm from '../../BaseMessageForm'
import InputField from '../../InputField'
import { isValidJSON } from '../../../../utils'

class CustomMessageForm extends BaseMessageForm {
  inputChange = value => {
    this.setState({ json: value })
  }

  validateMessage = () => {
    const { json } = this.state
    if (!isValidJSON(json)) {
      this.setState({ error: 'Invalid JSON!!' })
      return false
    }
    this.setState({ message: JSON.parse(json) })
    return true
  }

  renderForm = () => {
    const { json } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <InputField label="JSON">
          <React.Fragment>
            <Input.TextArea
              value={json}
              onChange={e => this.inputChange(e.target.value)}
              placeholder="Input JSON here.."
              autoFocus
              autosize
            />
          </React.Fragment>
        </InputField>
      </form>
    )
  }
}

export default CustomMessageForm
