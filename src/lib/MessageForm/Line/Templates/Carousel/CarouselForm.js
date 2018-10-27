import React from 'react'
import PropTypes from 'prop-types'
import { Input, Switch } from 'antd'
import InputField from '../../../InputField'
import ActionsForm, { ActionForm } from '../Actions'
import actionObject from '../../../../MessageObject/Line/actions'

class CarouselForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultActionState: false,
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
        <InputField label="Image Url">
          <Input value={data.thumbnailImageUrl} onChange={e => updateElement({ thumbnailImageUrl: e.target.value })} />
        </InputField>
        <InputField label="Default Action">
          <Switch
            style={{ marginBottom: 8 }}
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
}

export default CarouselForm
