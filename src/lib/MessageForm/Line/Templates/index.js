import React from 'react'
import { Input, Select, Radio } from 'antd'
import InputField from '../../InputField'
import BaseMessageForm from '../../BaseMessageForm'
import { Types } from '../../../MessageObject/Line/templates'
import CarouselTemplateForm from './Carousel'

const { CAROUSEL } = Types

class TemplateForm extends BaseMessageForm {
  inputChange = item => {
    const { message } = this.state
    let tmp = { ...message }
    if (item.altText) {
      const altText = item.altText
      delete item.altText
      tmp = { ...tmp, altText, template: { ...tmp.template, ...item } }
    }
    tmp = { ...tmp, template: { ...tmp.template, ...item } }
    this.setState({ message: tmp })
  }

  validateMessage = () => {
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
          />
        )}
      </form>
    )
  }
}

export default TemplateForm
