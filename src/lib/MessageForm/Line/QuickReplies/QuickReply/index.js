import React from 'react'
import PropTypes from 'prop-types'
import { Select, Input, DatePicker, TimePicker } from 'antd'
import moment from 'moment'
import InputField from '../../../InputField'
import { Types } from '../../../../MessageObject/Line/quickReply'
import { Flex, InfoText } from '../../../styled'
import { UploadFile } from '../../../../../components/Input'

const QuickReplyForm = props => {
  const { data, dataChange, uploadFile } = props
  const onUpload = ({ uploadType, data, endUpload }) => {
    if (uploadType === 'url') {
      dataChange({ imageUrl: data })
    } else if (uploadType === 'file') {
      const callback = fileUrl => {
        dataChange({ imageUrl: fileUrl })
        endUpload(fileUrl)
      }
      uploadFile(data, callback)
    }
  }

  if (!data || !data.action) {
    return null
  }
  return (
    <div style={{ marginBottom: 8 }}>
      <InputField label="Action Type">
        <Select
          defaultValue={data.action && data.action.type}
          onChange={value => dataChange({ type: value })}
          style={{ width: 180 }}
        >
          {Object.keys(Types).map(key => (
            <Select.Option value={Types[key]} key={key}>
              <span>{Types[key]}</span>
            </Select.Option>
          ))}
        </Select>
      </InputField>
      <InputField label="Label">
        <Input
          value={data.action.label}
          onChange={e => dataChange({ label: e.target.value })}
          placeholder="Text to show on quickreply button.."
        />

        <Flex style={{ justifyContent: 'flex-end' }}>
          <InfoText>{(data.action.label && data.action.label.length) || 0} / 20</InfoText>
        </Flex>
      </InputField>
      <InputField label="Image Url">
        <UploadFile defaultValue={data.imageUrl} onUpload={onUpload} onReset={() => dataChange({ imageUrl: '' })} />
      </InputField>

      {data.action.type === Types.POSTBACK && (
        <React.Fragment>
          <InputField label="Display Text">
            <Input.TextArea
              value={data.action.displayText}
              onChange={e => dataChange({ displayText: e.target.value })}
              placeholder="Text when user tab a quick reply.."
              autosize
            />
            <Flex style={{ justifyContent: 'flex-end' }}>
              <InfoText>{(data.action.displayText && data.action.displayText.length) || 0} / 300</InfoText>
            </Flex>
          </InputField>
          <InputField label="Data">
            <Input.TextArea
              value={data.action.data}
              onChange={e => dataChange({ data: e.target.value })}
              placeholder="Data that send to webhook.."
              autosize
            />
            <Flex style={{ justifyContent: 'flex-end' }}>
              <InfoText>{(data.action.data && data.action.data.length) || 0} / 300</InfoText>
            </Flex>
          </InputField>
        </React.Fragment>
      )}

      {data.action.type === Types.MESSAGE && (
        <React.Fragment>
          <InputField label="Text">
            <Input.TextArea
              value={data.action.text}
              onChange={e => dataChange({ text: e.target.value })}
              placeholder="Text when user tab a quick reply.."
              autosize
            />
            <Flex style={{ justifyContent: 'flex-end' }}>
              <InfoText>{(data.action.text && data.action.text.length) || 0} / 300</InfoText>
            </Flex>
          </InputField>
        </React.Fragment>
      )}

      {data.action.type === Types.URI && (
        <React.Fragment>
          <InputField label="Link">
            <Input
              value={data.action.uri}
              onChange={e => dataChange({ uri: e.target.value })}
              placeholder="Link to open when user tap a quick reply.."
            />
          </InputField>
        </React.Fragment>
      )}

      {data.action.type === Types.DATE && (
        <React.Fragment>
          <InputField label="Mode">
            <Select value={data.action.mode} onChange={value => dataChange({ mode: value })} style={{ width: 180 }}>
              <Select.Option value="date">Date</Select.Option>
              <Select.Option value="time">Time</Select.Option>
              <Select.Option value="datetime">Date / Time</Select.Option>
            </Select>
          </InputField>
          <InputField label="Data">
            <Input.TextArea
              value={data.action.data}
              onChange={e => dataChange({ data: e.target.value })}
              placeholder="Data that send to webhook.."
              autosize
            />
            <Flex style={{ justifyContent: 'flex-end' }}>
              <InfoText>{(data.action.data && data.action.data.length) || 0} / 300</InfoText>
            </Flex>
          </InputField>

          {data.action.mode === 'date' && (
            <React.Fragment>
              <InputField label="Initial">
                <DatePicker
                  format="DD/MM/YYYY"
                  defaultValue={moment(data.action.initial || undefined)}
                  onChange={val => dataChange({ initial: val.format('YYYY-MM-DD') })}
                  placeholder="Initial date in date picker.."
                />
              </InputField>
              <InputField label="Min">
                <DatePicker
                  format="DD/MM/YYYY"
                  defaultValue={moment(data.action.min || undefined)}
                  onChange={val => dataChange({ min: val.format('YYYY-MM-DD') })}
                  placeholder="Start date in date picker.."
                />
              </InputField>
              <InputField label="Max">
                <DatePicker
                  format="DD/MM/YYYY"
                  defaultValue={moment(data.action.max || undefined)}
                  onChange={val => dataChange({ max: val.format('YYYY-MM-DD') })}
                  placeholder="End date in date picker.."
                />
              </InputField>
            </React.Fragment>
          )}

          {data.action.mode === 'time' && (
            <React.Fragment>
              <InputField label="Initial">
                <TimePicker
                  minuteStep
                  format="HH:mm"
                  defaultValue={moment(data.action.initial || undefined)}
                  onChange={val => dataChange({ initial: val.format('HH:mm') })}
                  placeholder="Initial date in date picker.."
                />
              </InputField>
              <InputField label="Min">
                <TimePicker
                  minuteStep
                  format="HH:mm"
                  defaultValue={moment(data.action.min || undefined)}
                  onChange={val => dataChange({ min: val.format('HH:mm') })}
                  placeholder="Start date in date picker.."
                />
              </InputField>
              <InputField label="Max">
                <TimePicker
                  minuteStep
                  format="HH:mm"
                  defaultValue={moment(data.action.max || undefined)}
                  onChange={val => dataChange({ max: val.format('HH:mm') })}
                  placeholder="End date in date picker.."
                />
              </InputField>
            </React.Fragment>
          )}

          {data.action.mode === 'datetime' && (
            <React.Fragment>
              <InputField label="Initial">
                <DatePicker
                  showTime={{ minuteStep: true }}
                  defaultValue={moment(data.action.initial || undefined)}
                  onChange={val => dataChange({ initial: `${val.format('YYYY-MM-DD')}t${val.format('HH:mm')}` })}
                  format="DD/MM/YYYY HH:mm"
                  placeholder="Initial date in date picker.."
                />
              </InputField>
              <InputField label="Min">
                <DatePicker
                  showTime={{ minuteStep: true }}
                  defaultValue={moment(data.action.min || undefined)}
                  onChange={val => dataChange({ min: `${val.format('YYYY-MM-DD')}T${val.format('HH:mm')}` })}
                  format="DD/MM/YYYY HH:mm"
                  placeholder="Start date in date picker.."
                />
              </InputField>
              <InputField label="Max">
                <DatePicker
                  showTime={{ minuteStep: true }}
                  defaultValue={moment(data.action.max || undefined)}
                  onChange={val => dataChange({ max: `${val.format('YYYY-MM-DD')}T${val.format('HH:mm')}` })}
                  format="DD/MM/YYYY HH:mm"
                  placeholder="End date in date picker.."
                />
              </InputField>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  )
}

QuickReplyForm.propTypes = {
  data: PropTypes.object.isRequired,
  dataChange: PropTypes.func.isRequired,
  uploadFile: PropTypes.func,
}

export default QuickReplyForm
