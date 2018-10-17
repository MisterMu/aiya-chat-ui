import React from 'react'
import PropTypes from 'prop-types'
import { Select, Input, DatePicker, TimePicker } from 'antd'
import moment from 'moment'
import InputField from '../../../InputField'
import { Types } from '../../../../MessageObject/Line/quickReply'

const QuickReplyForm = props => {
  const { data, dataChange } = props
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
      </InputField>
      <InputField label="Image Url">
        <Input
          value={data.imageUrl}
          onChange={e => dataChange({ imageUrl: e.target.value })}
          placeholder="Image or Icon of quickreply.."
        />
      </InputField>

      {data.action.type === Types.POSTBACK && (
        <React.Fragment>
          <InputField label="Text">
            <Input
              value={data.action.text}
              onChange={e => dataChange({ text: e.target.value })}
              placeholder="Text when user tab a quick reply.."
            />
          </InputField>
          <InputField label="Data">
            <Input
              value={data.action.data}
              onChange={e => dataChange({ data: e.target.value })}
              placeholder="Data that send to webhook.."
            />
          </InputField>
        </React.Fragment>
      )}

      {data.action.type === Types.MESSAGE && (
        <React.Fragment>
          <InputField label="Text">
            <Input
              value={data.action.text}
              onChange={e => dataChange({ text: e.target.value })}
              placeholder="Text when user tab a quick reply.."
            />
          </InputField>
        </React.Fragment>
      )}

      {data.action.type === Types.DATE && (
        <React.Fragment>
          <InputField label="Mode">
            <Select
              value={data.action.mode}
              onChange={value => dataChange({ mode: value })}
              style={{ width: 180 }}
            >
              <Select.Option value="date">Date</Select.Option>
              <Select.Option value="time">Time</Select.Option>
              <Select.Option value="datetime">Date / Time</Select.Option>
            </Select>
          </InputField>
          <InputField label="Data">
            <Input
              value={data.action.data}
              onChange={e => dataChange({ data: e.target.value })}
              placeholder="Text when user tab a quick reply.."
            />
          </InputField>

          {data.action.mode === 'date' && (
            <React.Fragment>
              <InputField label="Initial">
                <DatePicker
                  format="DD/MM/YYYY"
                  defaultValue={moment(data.action.initial || undefined)}
                  onChange={val => dataChange({ initial: val.ISO_8601() })}
                  placeholder="Initial date in date picker.."
                />
              </InputField>
              <InputField label="Min">
                <DatePicker
                  format="DD/MM/YYYY"
                  defaultValue={moment(data.action.min || undefined)}
                  onChange={val => dataChange({ min: val.ISO_8601() })}
                  placeholder="Start date in date picker.."
                />
              </InputField>
              <InputField label="Max">
                <DatePicker
                  format="DD/MM/YYYY"
                  defaultValue={moment(data.action.max || undefined)}
                  onChange={val => dataChange({ max: val.ISO_8601() })}
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
                  onChange={val => dataChange({ min: val.ISO_8601() })}
                  placeholder="Start date in date picker.."
                />
              </InputField>
              <InputField label="Max">
                <TimePicker
                  minuteStep
                  format="HH:mm"
                  defaultValue={moment(data.action.max || undefined)}
                  onChange={val => dataChange({ max: val.ISO_8601() })}
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
                  onChange={val => dataChange({ initial: val.ISO_8601() })}
                  format="DD/MM/YYYY HH:mm"
                  placeholder="Initial date in date picker.."
                />
              </InputField>
              <InputField label="Min">
                <DatePicker
                  showTime={{ minuteStep: true }}
                  defaultValue={moment(data.action.min || undefined)}
                  onChange={val => dataChange({ min: val.ISO_8601() })}
                  format="DD/MM/YYYY HH:mm"
                  placeholder="Start date in date picker.."
                />
              </InputField>
              <InputField label="Max">
                <DatePicker
                  showTime={{ minuteStep: true }}
                  defaultValue={moment(data.action.max || undefined)}
                  onChange={val => dataChange({ max: val.ISO_8601() })}
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
}

export default QuickReplyForm
