import React from 'react'
import PropTypes from 'prop-types'
import { Input, Switch, Select } from 'antd'
import InputField from '../../../InputField'
import ButtonsForm from '../Buttons'
import { UploadFile } from '../../../../../components/Input'

class GenericForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultActionState: false,
    }
  }

  onUpload = ({ uploadType, data, endUpload }) => {
    const { updateElement, uploadFile } = this.props
    if (uploadType === 'url') {
      updateElement({ image_url: data })
    } else if (uploadType === 'file') {
      const callback = fileUrl => {
        updateElement({ image_url: fileUrl })
        endUpload(fileUrl)
      }
      uploadFile(data, callback)
    }
  }

  defaultActionStateChange = checked => {
    const { updateElement } = this.props
    if (checked) {
      const tmp = {
        type: 'web_url',
        webview_height_ratio: 'tall',
        url: '',
      }
      updateElement({ default_action: tmp })
    } else {
      updateElement({ default_action: undefined })
    }
    this.setState({ defaultActionState: checked })
  }

  componentWillMount() {
    const { data } = this.props
    if (data.default_action) {
      this.setState({ defaultActionState: true })
    }
  }

  render() {
    const { data, updateElement } = this.props
    if (!data) {
      return null
    }

    const { defaultActionState } = this.state
    return (
      <React.Fragment>
        <InputField label="Title">
          <Input value={data.title} onChange={e => updateElement({ title: e.target.value })} />
        </InputField>
        <InputField label="Subtitle">
          <Input.TextArea value={data.subtitle} onChange={e => updateElement({ subtitle: e.target.value })} autosize />
        </InputField>
        <InputField label="Image">
          <UploadFile
            defaultValue={data.image_url}
            onUpload={this.onUpload}
            onReset={() => updateElement({ image_url: '' })}
          />
        </InputField>
        <InputField label="Default Action">
          <Switch defaultChecked={defaultActionState} onChange={this.defaultActionStateChange} />
          {defaultActionState && (
            <React.Fragment>
              <Select
                style={{ width: 180, marginTop: 8, display: 'block' }}
                value={data.default_action.webview_height_ratio}
                onChange={val =>
                  updateElement({ default_action: { ...data.default_action, webview_height_ratio: val } })
                }
              >
                <Select.Option value="compact">Compact</Select.Option>
                <Select.Option value="tall">Tall</Select.Option>
                <Select.Option value="full">Full</Select.Option>
              </Select>
              <Input
                style={{ marginTop: 8 }}
                value={data.default_action.url}
                onChange={e => updateElement({ default_action: { ...data.default_action, url: e.target.value } })}
                placeholder="Link Url that'll open when Template has been tap"
              />
            </React.Fragment>
          )}
        </InputField>
        <ButtonsForm data={data.buttons} updateButtons={btns => updateElement({ buttons: btns })} max={3} />
      </React.Fragment>
    )
  }
}

GenericForm.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    image_url: PropTypes.string,
    default_action: PropTypes.shape({
      type: PropTypes.oneOf(['web_url']),
      url: PropTypes.string,
      webview_height_ratio: PropTypes.oneOf(['compact', 'tall', 'full']),
    }),
    buttons: PropTypes.arrayOf(PropTypes.object),
  }),
  updateElement: PropTypes.func.isRequired,
  uploadFile: PropTypes.func,
}

export default GenericForm
