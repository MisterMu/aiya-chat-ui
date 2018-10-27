import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import actionObject, { Types } from '../../../../MessageObject/Line/actions'
import PostbackForm from './PostbackForm'
import MessageForm from './MessageForm'
import UriForm from './UriForm'
import DateForm from './DateForm'
import CameraForm from './CameraForm'
import CameraRollForm from './CameraRollForm'
import LocationForm from './LocationForm'

const { POSTBACK, MESSAGE, URI, DATE, CAMERA, CAMERAROLL, LOCATION } = Types

class ActionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  updateActionType = type => {
    const { updateAction } = this.props
    const newAction = actionObject[type]
    updateAction(newAction)
  }

  render() {
    const { data, updateAction } = this.props
    if (!data) {
      return null
    }
    return (
      <div>
        <Select style={{ width: 180, marginBottom: 8 }} value={data.type} onChange={this.updateActionType}>
          {Object.keys(Types).map(key => (
            <Select.Option key={key} value={Types[key]}>
              {Types[key]}
            </Select.Option>
          ))}
        </Select>
        {data.type === POSTBACK && <PostbackForm data={data} update={updateAction} />}
        {data.type === MESSAGE && <MessageForm data={data} update={updateAction} />}
        {data.type === URI && <UriForm data={data} update={updateAction} />}
        {data.type === DATE && <DateForm data={data} update={updateAction} />}
        {data.type === CAMERA && <CameraForm data={data} update={updateAction} />}
        {data.type === CAMERAROLL && <CameraRollForm data={data} update={updateAction} />}
        {data.type === LOCATION && <LocationForm data={data} update={updateAction} />}
      </div>
    )
  }
}

ActionForm.propTypes = {
  data: PropTypes.object,
  updateAction: PropTypes.func.isRequired,
}

export default ActionForm
