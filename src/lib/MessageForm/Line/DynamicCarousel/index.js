import React from 'react'
import { Divider, Input, Select, Switch } from 'antd'
import BaseMessageForm from '../../BaseMessageForm'
import InputField from '../../InputField'
import { methodTypes } from '../../../../constants'
import { UploadFile, KeyValue } from '../../../../components/Input'
import ActionsForm, { ActionForm } from '../Templates/Actions'

class DynamicCarousel extends BaseMessageForm {
  defaultActionStateChange = checked => {
    if (checked) {
      this.inputChange({
        defaultAction: {
          type: 'message',
          text: 'Template Tapped',
        },
      })
    } else {
      this.inputChange({ defaultAction: undefined })
    }
  }

  onUpload = ({ uploadType, data, endUpload }) => {
    if (uploadType === 'url') {
      this.inputChange({ thumbnailImageUrl: data })
    } else if (uploadType === 'file') {
      const callback = fileUrl => {
        this.inputChange({ thumbnailImageUrl: fileUrl })
        endUpload(fileUrl)
      }
      this.uploadFile(data, callback)
    }
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

  extraChange = item => {
    const { extra } = this.state
    if (item.element != null) {
      const tmp = { ...extra, element: item.element }
      this.setState({ extra: tmp })
    } else {
      const tmp = { ...extra, request: { ...extra.request, ...item } }
      this.setState({ extra: tmp })
    }
  }

  inputChange = item => {
    const { message } = this.state
    const columns = message.template.columns
    const data = columns && columns[0]

    if (item.altText) {
      const tmp = { ...message, altText: item.altText }
      this.setState({ message: tmp })
      delete item.altText
    }
    if (item.imageAspectRatio) {
      const tmp = { ...message.template, imageAspectRatio: item.imageAspectRatio }
      this.setState({ message: { ...message, template: tmp } })
    }

    const tmp = { ...data, ...item }

    this.setState({
      message: {
        ...message,
        template: {
          ...message.template,
          columns: [tmp],
        },
      },
    })
  }

  validateMessage = () => {
    const { message } = this.state
    const { altText, template } = message
    if (!altText) {
      this.setState({ error: 'Alt Text is required!!' })
      return false
    }
    const columns = template && template.columns
    return columns.every((el, i) => {
      if (!el.text) {
        this.setState({ error: `Carousel #${i + 1}: Text is required!!` })
        return false
      }
      return true
    })
  }

  renderForm = () => {
    const { message, extra } = this.state
    if (!extra || !message || !message.template) {
      return null
    }

    const request = extra.request
    const data = message.template.columns && message.template.columns[0]
    return (
      <form onSubmit={this.onSubmit}>
        <Divider orientation="left">Request</Divider>
        <InputField label="Uri">
          <Input
            addonBefore={
              <Select value={request.method} style={{ width: 100 }} onChange={val => this.extraChange({ method: val })}>
                {Object.keys(methodTypes).map(key => (
                  <Select.Option key={key} value={methodTypes[key]}>
                    {methodTypes[key]}
                  </Select.Option>
                ))}
              </Select>
            }
            value={request.uri}
            onChange={e => this.extraChange({ uri: e.target.value })}
            placeholder="Request Link.."
          />
        </InputField>
        <InputField label="Headers">
          <KeyValue data={request.headers} onChange={val => this.extraChange({ headers: val })} />
        </InputField>
        <InputField label="Variables">
          <KeyValue data={request.variables} onChange={val => this.extraChange({ variables: val })} />
        </InputField>
        <InputField label="Element">
          <Input value={extra.element} onChange={e => this.extraChange({ element: e.target.value })} />
        </InputField>
        <Divider orientation="left">Message</Divider>
        <InputField label="Title">
          <Input value={data.title} onChange={e => this.inputChange({ title: e.target.value })} />
        </InputField>
        <InputField label="Text">
          <Input.TextArea value={data.text} onChange={e => this.inputChange({ text: e.target.value })} autosize />
        </InputField>
        <InputField label="Image">
          <UploadFile
            defaultValue={data.thumbnailImageUrl}
            onUpload={this.onUpload}
            onReset={() => this.inputChange({ thumbnailImageUrl: '' })}
          />
        </InputField>
        <InputField label="Default Action">
          <Switch
            defaultChecked={!!data.defaultAction}
            onChange={this.defaultActionStateChange}
            style={{ marginBottom: 8, width: 44 }}
          />
          {data.defaultAction && (
            <ActionForm
              data={data.defaultAction}
              updateAction={item => this.inputChange({ defaultAction: { ...data.defaultAction, ...item } })}
            />
          )}
        </InputField>
        <ActionsForm data={data.actions} updateActions={btns => this.inputChange({ actions: btns })} max={3} />
      </form>
    )
  }
}

export default DynamicCarousel
