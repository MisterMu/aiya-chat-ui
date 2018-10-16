import React from 'react'
import PropTypes from 'prop-types'
import { Select, Input } from 'antd'

import InputField from '../../../InputField'
import { Types } from '../../../../MessageObject/Facebook/quickReply'

const QuickReplyForm = props => {
  const { data, dataChange } = props
  if (!data) {
    return null
  }
  return (
    <div style={{ marginBottom: 8 }}>
      <InputField label="Type">
        <Select
          defaultValue={data.content_type}
          onChange={value => dataChange({ content_type: value })}
          style={{ width: 180 }}
        >
          {Object.keys(Types).map(key => (
            <Select.Option value={Types[key]} key={key}>
              <span>{Types[key]}</span>
            </Select.Option>
          ))}
        </Select>
      </InputField>
      {data.content_type === Types.TEXT && (
        <React.Fragment>
          <InputField label="Title">
            <Input
              value={data.title}
              onChange={e => dataChange({ title: e.target.value || undefined })}
              placeholder="Text to show on quickreply button.."
            />
          </InputField>
          <InputField label="Payload">
            <Input
              value={data.payload}
              onChange={e => dataChange({ payload: e.target.value || undefined })}
              placeholder="Data that send to webhook.."
            />
          </InputField>
          <InputField label="Image Url">
            <Input
              value={data.image_url}
              onChange={e => dataChange({ image_url: e.target.value || undefined })}
              placeholder="Image or Icon of quickreply.."
            />
          </InputField>
        </React.Fragment>
      )}
    </div>
  )
}

QuickReplyForm.propTypes = {
  data: PropTypes.object.isRequired,
  dataChange: PropTypes.func.isRequired,
}

export default QuickReplyForm
