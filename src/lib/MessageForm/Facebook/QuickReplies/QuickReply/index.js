import React from 'react'
import PropTypes from 'prop-types'
import { Select, Input } from 'antd'

import InputField from '../../../InputField'
import { InfoText, Flex } from '../../../styled'
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
              onChange={e => dataChange({ title: e.target.value })}
              placeholder="Text to show on quickreply button.."
            />
            <Flex style={{ justifyContent: 'space-between' }}>
              <InfoText>If title length longer than 20 characters it will be wrapped</InfoText>
              <InfoText>{(data.title && data.title.length) || 0} / 20</InfoText>
            </Flex>
          </InputField>
          <InputField label="Payload">
            <Input.TextArea
              value={data.payload}
              onChange={e => dataChange({ payload: e.target.value })}
              placeholder="Data that send to webhook.."
              autosize
            />
            <Flex style={{ justifyContent: 'flex-end' }}>
              <InfoText>{(data.payload && data.payload.length) || 0} / 1000</InfoText>
            </Flex>
          </InputField>
          <InputField label="Image Url">
            <Input
              value={data.image_url}
              onChange={e => dataChange({ image_url: e.target.value })}
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
