import React from 'react'
import { Divider, Input, Select, Switch } from 'antd'
import BaseMessageForm from '../../BaseMessageForm'
import InputField from '../../InputField'
import { methodTypes } from '../../../../constants'
import { UploadFile, KeyValue } from '../../../../components/Input'
import ButtonsForm from '../Templates/Buttons'

class DynamicTemplateForm extends BaseMessageForm {
  defaultActionStateChange = checked => {
    if (checked) {
      this.inputChange({
        default_action: {
          type: 'web_url',
          url: '',
          webview_height_ratio: 'tall',
        },
      })
    } else {
      this.inputChange({ default_action: undefined })
    }
  }
  onUpload = ({ uploadType, data, endUpload }) => {
    if (uploadType === 'url') {
      this.inputChange({ image_url: data })
    } else if (uploadType === 'file') {
      const callback = fileUrl => {
        this.inputChange({ image_url: fileUrl })
        endUpload(fileUrl)
      }
      this.uploadFile(data, callback)
    }
  }

  extraChange = item => {
    const { extra } = this.state
    if (item.element != null) {
      const tmp = { ...extra, ...item }
      this.setState({ extra: tmp })
    } else {
      const tmp = { ...extra, request: { ...extra.request, ...item } }
      this.setState({ extra: tmp })
    }
  }

  inputChange = item => {
    const { message } = this.state
    const payload = message.attachment && message.attachment.payload
    const data = payload && payload.elements && payload.elements[0]

    const tmp = { ...data, ...item }

    this.setState({
      message: {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: [tmp],
          },
        },
      },
    })
  }

  renderForm = () => {
    const { message, extra } = this.state
    if (!extra || !message) {
      return null
    }

    const request = extra.request
    const payload = message.attachment && message.attachment.payload
    const data = payload && payload.elements && payload.elements[0]
    return (
      <form onSubmit={this.onSubmit}>
        <Divider orientation="left">Request</Divider>
        <InputField label="Uri">
          <Input
            value={request.uri}
            onChange={e => this.extraChange({ uri: e.target.value })}
            addonBefore={
              <Select value={request.method} style={{ width: 100 }} onChange={val => this.extraChange({ method: val })}>
                {Object.keys(methodTypes).map(key => (
                  <Select.Option key={key} value={methodTypes[key]}>
                    {methodTypes[key]}
                  </Select.Option>
                ))}
              </Select>
            }
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
        <InputField label="Subtitle">
          <Input.TextArea
            value={data.subtitle}
            onChange={e => this.inputChange({ subtitle: e.target.value })}
            autosize
          />
        </InputField>
        <InputField label="Image">
          <UploadFile
            defaultValue={data.image_url}
            onUpload={this.onUpload}
            onReset={() => this.inputChange({ image_url: '' })}
          />
        </InputField>
        <InputField label="Default Action">
          <Switch defaultChecked={!!data.default_action} onChange={this.defaultActionStateChange} />
          {data.default_action && (
            <React.Fragment>
              <Select
                style={{ width: 180, marginTop: 8, display: 'block' }}
                value={data.default_action.webview_height_ratio}
                onChange={val =>
                  this.inputChange({ default_action: { ...data.default_action, webview_height_ratio: val } })
                }
              >
                <Select.Option value="compact">Compact</Select.Option>
                <Select.Option value="tall">Tall</Select.Option>
                <Select.Option value="full">Full</Select.Option>
              </Select>
              <Input
                style={{ marginTop: 8 }}
                value={data.default_action.url}
                onChange={e => this.inputChange({ default_action: { ...data.default_action, url: e.target.value } })}
                placeholder="Link Url that'll open when Template has been tap"
              />
            </React.Fragment>
          )}
        </InputField>
        <ButtonsForm data={data.buttons} updateButtons={btns => this.inputChange({ buttons: btns })} max={3} />
      </form>
    )
  }
}

export default DynamicTemplateForm
