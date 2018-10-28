import React from 'react'
import PropTypes from 'prop-types'
import { Select, Input } from 'antd'
import InputField from '../../../InputField'
import { InfoText, Flex } from '../../../styled'
import { Types } from '../../../../MessageObject/Facebook/quickReply'
import { UploadFile } from '../../../../../components/Input'

const QuickReplyForm = props => {
  const { data, dataChange, uploadFile } = props
  const onUpload = ({ uploadType, data, endUpload }) => {
    if (uploadType === 'url') {
      dataChange({ image_url: data })
    } else if (uploadType === 'file') {
      const callback = fileUrl => {
        dataChange({ image_url: fileUrl })
        endUpload(fileUrl)
      }
      uploadFile(data, callback)
    }
  }
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
            <UploadFile
              defaultValue={data.image_url}
              onUpload={onUpload}
              onReset={() => dataChange({ image_url: '' })}
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
  uploadFile: PropTypes.func.isRequired,
}

export default QuickReplyForm
