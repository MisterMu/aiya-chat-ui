import React from 'react'
import { Input } from 'antd'
import { UploadFile } from '../../../../components/Input'
import { getImageSize } from '../../../../utils'
import BaseMessageForm from '../../BaseMessageForm'
import InputField from '../../InputField'
import ActionAreaForm from './ActionAreaForm'

class ImagemapForm extends BaseMessageForm {
  onUpload = ({ uploadType, data, endUpload }) => {
    if (uploadType === 'url') {
      this.inputChange({ baseUrl: data })
    } else if (uploadType === 'file') {
      const callback = fileUrl => {
        this.inputChange({ baseUrl: fileUrl })
        getImageSize(fileUrl, ({ height, width }) => {
          const baseSize = {
            height,
            width,
          }
          this.inputChange({ baseSize })
        })
        endUpload(fileUrl)
      }
      this.uploadFile(data, callback)
    }
  }

  inputChange = item => {
    const { message } = this.state
    const tmp = { ...message, ...item }
    this.setState({ message: tmp })
  }

  validateMessage = () => {
    const { message } = this.state
    if (!message.baseUrl) {
      this.setState({ error: 'Image is required!!' })
      return false
    }
    if (message.baseUrl.substr(0, 8) !== 'https://') {
      this.setState({ error: 'Image url schema must be a https!!' })
      return false
    }
    if (!message.altText) {
      this.setState({ error: 'Alt Text is required!!' })
      return false
    }
    if (message.altText.length > 400) {
      this.setState({ error: 'Alt Text must be no longer than 400 character!!' })
      return false
    }
    if (!message.actions) {
      this.setState({ error: 'Grid Actions is required!!' })
      return false
    }
    return message.actions.every((action, i) => {
      if (action.type === 'message') {
        if (!action.text) {
          this.setState({ error: `Grid #${i + 1}: Text is required!!` })
          return false
        }
        if (action.text.length > 400) {
          this.setState({ error: `Grid #${i + 1}: Text must be no longer than 400 character!!` })
          return false
        }
        return true
      } else if (action.type === 'uri') {
        if (!action.linkUri) {
          this.setState({ error: `Grid #${i + 1}: Link is required!!` })
          return false
        }
        if (action.linkUri.length > 1000) {
          this.setState({ error: `Grid #${i + 1}: Link must be no longer than 1000 character!!` })
          return false
        }
        return true
      }
      return false
    })
  }

  extraChange = item => {
    const { extra } = this.state
    const tmp = { ...extra, ...item }
    this.setState({ extra: tmp })
  }

  updateActions = (actions, template) => {
    this.inputChange({ actions })
    if (template) {
      this.extraChange({ data: { template } })
    }
  }

  renderForm = () => {
    const { message, extra } = this.state
    if (!message) {
      return null
    }

    const { height, width } = message.baseSize
    return (
      <form onSubmit={this.onSubmit}>
        <InputField label="Alt Text">
          <Input
            value={message.altText}
            placeholder="Name this imagemap.."
            onChange={e => this.inputChange({ altText: e.target.value })}
          />
        </InputField>
        <InputField label="Image">
          <UploadFile
            defaultValue={message.baseUrl}
            onUpload={obj => this.onUpload(obj)}
            onReset={() => this.inputChange({ baseUrl: '' })}
          />
        </InputField>
        <ActionAreaForm
          maxHeight={height}
          maxWidth={width}
          template={extra.data && extra.data.template}
          defaultActions={message.actions}
          updateActions={this.updateActions}
        />
      </form>
    )
  }
}

export default ImagemapForm
