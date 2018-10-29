import React from 'react'
import PropTypes from 'prop-types'
import { Input, Switch } from 'antd'
import InputField from '../../../InputField'
import ActionsForm, { ActionForm } from '../Actions'
import actionObject from '../../../../MessageObject/Line/actions'
import { UploadFile } from '../../../../../components/Input'

class CarouselForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultActionState: false,
    }
  }

  onUpload = ({ uploadType, data, endUpload }) => {
    const { updateElement, uploadFile } = this.props
    if (uploadType === 'url') {
      updateElement({ thumbnailImageUrl: data })
    } else if (uploadType === 'file') {
      const callback = fileUrl => {
        updateElement({ thumbnailImageUrl: fileUrl })
        endUpload(fileUrl)
      }
      uploadFile(data, callback)
    }
  }

  defaultActionStateChange = checked => {
    const { updateElement } = this.props
    if (checked) {
      const tmp = actionObject.message
      updateElement({ defaultAction: tmp })
    } else {
      updateElement({ defaultAction: undefined })
    }
    this.setState({ defaultActionState: checked })
  }

  componentWillMount() {
    const { data } = this.props
    if (data.defaultAction) {
      this.setState({ defaultActionState: true })
    }
  }

  render() {
    const { defaultActionState } = this.state
    const { data, updateElement } = this.props
    if (!data) {
      return null
    }
    return (
      <React.Fragment>
        <InputField label="Title">
          <Input value={data.title} onChange={e => updateElement({ title: e.target.value })} />
        </InputField>
        <InputField label="Text">
          <Input value={data.text} onChange={e => updateElement({ text: e.target.value })} />
        </InputField>
        <InputField label="Image">
          <UploadFile
            defaultValue={data.thumbnailImageUrl}
            onUpload={this.onUpload}
            onReset={() => updateElement({ thumbnailImageUrl: '' })}
          />
        </InputField>
        <InputField label="Default Action">
          <Switch
            style={{ marginBottom: 8, width: 44 }}
            defaultChecked={defaultActionState}
            onChange={this.defaultActionStateChange}
          />
          {defaultActionState && (
            <ActionForm
              data={data.defaultAction}
              updateAction={item => updateElement({ defaultAction: { ...data.defaultAction, ...item } })}
            />
          )}
        </InputField>
        <ActionsForm data={data.actions} updateActions={actions => updateElement({ actions })} max={3} />
      </React.Fragment>
    )
  }
}

CarouselForm.propTypes = {
  data: PropTypes.shape({
    thumbnailImageUrl: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    defaultAction: PropTypes.object,
    actions: PropTypes.arrayOf(PropTypes.object),
  }),
  updateElement: PropTypes.func,
  uploadFile: PropTypes.func,
}

export default CarouselForm
