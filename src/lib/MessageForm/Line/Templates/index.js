import React from 'react'
import { Input, Select, Radio } from 'antd'
import InputField from '../../InputField'
import BaseMessageForm from '../../BaseMessageForm'
import { Types } from '../../../MessageObject/Line/templates'
import CarouselTemplateForm from './Carousel'
import actionValidator from './Carousel/actionValidator'

const { CAROUSEL } = Types

class TemplateForm extends BaseMessageForm {
  inputChange = item => {
    const { message } = this.state
    let tmp = { ...message }
    if (item.altText) {
      const altText = item.altText
      tmp = { ...tmp, altText }
      delete item.altText
    }
    tmp = { ...tmp, template: { ...tmp.template, ...item } }
    this.setState({ message: tmp })
  }

  messageParser = message => {
    const template = { ...message.template }
    let tmp = template.columns.map(element => {
      let el = { ...element }
      if (element.thumbnailImageUrl === '') {
        el.thumbnailImageUrl = undefined
      }
      if (element.title === '') {
        el.title = undefined
      }
      const actions = el.actions.map(action => {
        let tmp = { ...action }
        if (tmp.displayText === '') {
          tmp.displayText = undefined
        }
        return tmp
      })
      el.actions = actions
      return el
    })
    return {
      ...message,
      template: {
        ...message.template,
        columns: tmp,
      },
    }
  }

  validateMessage = () => {
    const { message } = this.state
    const { altText, template } = message
    if (!altText) {
      this.setState({ error: 'Alt Text is required!!' })
      return false
    }
    if (template.type === CAROUSEL) {
      const columns = template && template.columns
      return columns.every((el, i) => {
        if (el.title && el.title.length > 40) {
          this.setState({ error: `Carousel #${i + 1}: Title must be no longer than 40 character!!` })
          return false
        }
        if (!el.text) {
          this.setState({ error: `Carousel #${i + 1}: Text is required!!` })
          return false
        }
        if (!el.title && !el.thumbnailImageUrl && el.text.length > 120) {
          this.setState({ error: `Carousel #${i + 1}: Text must be no longer than 120 character!!` })
          return false
        }
        if ((el.title || el.thumbnailImageUrl) && el.text.length > 60) {
          this.setState({ error: `Carousel #${i + 1}: Text must be no longer than 60 character!!` })
          return false
        }
        if (el.thumbnailImageUrl && el.thumbnailImageUrl.substr(0, 8) !== 'https://') {
          this.setState({ error: `Carousel #${i + 1}: Image url schema must be a https!!` })
          return false
        }
        if (el.defaultAction) {
          const defaultActionValidate = actionValidator(el.defaultAction, true)
          if (defaultActionValidate && defaultActionValidate !== 'pass') {
            this.setState({ error: `Carousel #${i + 1}: Default Action ${defaultActionValidate}` })
            return false
          }
        }
        return el.actions.every((action, j) => {
          const actionValidate = actionValidator(action, false)
          if (actionValidate && actionValidate !== 'pass') {
            this.setState({ error: `Carousel #${i + 1}: Actions #${j + 1} ${actionValidate}` })
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
    if (!message || !message.template) {
      return null
    }

    const template = message.template
    return (
      <form onSubmit={this.onSubmit}>
        <InputField label="Template Type">
          <Select style={{ width: 180 }} value={template.type} onChange={val => this.inputChange({ type: val })}>
            {Object.keys(Types).map(key => (
              <Select.Option key={key} value={Types[key]}>
                {Types[key]}
              </Select.Option>
            ))}
          </Select>
        </InputField>
        <InputField label="Alt Text">
          <Input value={message.altText} onChange={e => this.inputChange({ altText: e.target.value })} />
        </InputField>
        <InputField label="Image Ratio">
          <Radio.Group
            value={template.imageAspectRatio}
            onChange={e => this.inputChange({ imageAspectRatio: e.target.value })}
          >
            <Radio value="rectangle">Rectangle</Radio>
            <Radio value="square">Square</Radio>
          </Radio.Group>
        </InputField>
        {template.type === CAROUSEL && (
          <CarouselTemplateForm
            elements={template.columns}
            updateElements={elements => this.inputChange({ columns: elements })}
            max={10}
            uploadFile={this.uploadFile}
          />
        )}
      </form>
    )
  }
}

export default TemplateForm
