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
          this.setState({ height, width })
        })
        endUpload(fileUrl)
      }
      this.uploadFile(data, callback)
    }
  }

  inputChange = item => {}

  renderForm = () => {
    const { message } = this.state
    if (!message) {
      return null
    }

    const { height, width } = this.state
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
          updateActions={(actions, template) => this.inputChange({ actions, data: template })}
        />
      </form>
    )
  }
}

export default ImagemapForm
