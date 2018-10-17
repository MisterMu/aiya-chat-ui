import React from 'react'
import PropTypes from 'prop-types'
import { Select, Input } from 'antd'

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

          {/* --- Need Moment package to completed this ---
          <InputField label="Initial">
            <DatePicker
              defaultValue={new Date(data.action.initial)}
              onChange={val => dataChange({ initial: val.toISOString() })}
            />
          </InputField>
          <InputField label="Max">
            <Input value={data.action.data} onChange={e => dataChange({ data: e.target.value })} />
          </InputField>
          <InputField label="Min">
            <Input value={data.action.data} onChange={e => dataChange({ data: e.target.value })} />
          </InputField>
          ---------------------------------------------- */}
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
