import React from 'react'
import { Select, Modal, Radio } from 'antd'
import BaseMessageForm from '../../BaseMessageForm'
import InputField from '../../InputField'
import { Types } from '../../../MessageObject/Facebook/templates'
import { Types as BtnTypes } from '../../../MessageObject/Facebook/buttons'
import GenericTemplateForm from './GenericTemplate'

const { GENERIC } = Types

class TemplateForm extends BaseMessageForm {
  handleTypesChange = type => {
    Modal.confirm({
      title: `Change Template Type to "${type}"`,
      content: 'If type has been change, currently data will be reset.',
      onOk: () => {
        this.inputChange({ template_type: type })
      },
    })
  }

  inputChange = item => {
    const { message } = this.state
    this.setState({
      message: {
        ...message,
        attachment: {
          type: 'template',
          payload: {
            ...message.attachment.payload,
            ...item,
          },
        },
      },
    })
  }

  validateMessage = () => {
    const { message } = this.state
    const payload = { ...message.attachment.payload }
    const templateType = payload.template_type
    if (templateType === GENERIC) {
      const elements = payload.elements
      return elements.every((el, i) => {
        if (!el.title) {
          this.setState({ error: `Generic #${i + 1}: Title is required!!` })
          return false
        }
        if (el.title.length > 80) {
          this.setState({ error: `Generic #${i + 1}: Title must be no longer than 80 character!!` })
          return false
        }
        if (el.subtitle && el.subtitle.length > 80) {
          this.setState({ error: `Generic #${i + 1}: Subtitle must be no longer than 80 character!!` })
        }
        return el.buttons.every((btn, j) => {
          if (!btn.title && btn.type !== BtnTypes.SHARE) {
            this.setState({ error: `Generic #${i + 1}: Button #${j + 1} must have a title!!` })
            return false
          }
          if (btn.title && btn.title.length > 20) {
            this.setState({
              error: `Generic #${i + 1}: Button #${j + 1}'s title must be no longer than 20 character!!`,
            })
            return false
          }
          if (btn.payload && btn.payload.length > 1000) {
            this.setState({
              error: `Generic #${i + 1}: Button #${j + 1}'s title must be no longer than 1000 character!!`,
            })
            return false
          }
          return true
        })
      })
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
        <InputField label="Type">
          <Select value={payload.template_type} style={{ width: 180 }} onChange={this.handleTypesChange}>
            {Object.keys(Types).map((key, i) => (
              <Select.Option key={i} value={Types[key]}>
                <span>{Types[key]}</span>
              </Select.Option>
            ))}
          </Select>
        </InputField>
        <InputField label="Image Ratio">
          <Radio.Group
            value={payload.image_aspect_ratio}
            onChange={e => this.inputChange({ image_aspect_ratio: e.target.value })}
          >
            <Radio value="horizontal">Horizontal</Radio>
            <Radio value="square">Square</Radio>
          </Radio.Group>
        </InputField>
        {payload.template_type === GENERIC && (
          <GenericTemplateForm elements={payload.elements} updateTemplate={this.inputChange} max={10} />
        )}
      </form>
    )
  }
}

export default TemplateForm
