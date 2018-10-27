import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Row, Col, Input, Select, DatePicker } from 'antd'

const { TimePicker } = DatePicker

const format = {
  date: 'YYYY-MM-DD',
  time: 'HH:mm',
  datetime: 'YYYY-MM-DD HH:mm',
}

const objToDateStr = (obj, mode) => {
  if (mode === 'date') {
    return obj.format(format.date)
  }
  if (mode === 'time') {
    return obj.format(format.time)
  }
  if (mode === 'datetime') {
    return `${obj.format(format.date)}t${obj.format(format.time)}`
  }
  return null
}

const DateForm = props => {
  const { data, update } = props
  return (
    <Row gutter={8}>
      <Col span={12} style={{ marginBottom: 8 }}>
        <Input value={data.label} placeholder="Label" onChange={e => update({ label: e.target.value })} />
      </Col>
      <Col span={12} style={{ marginBottom: 8 }}>
        <Input value={data.data} placeholder="Data" onChange={e => update({ data: e.target.value })} />
      </Col>
      <Col span={12} style={{ marginBottom: 8 }}>
        <Select
          value={data.mode}
          onChange={val => update({ mode: val, initial: undefined, max: undefined, min: undefined })}
        >
          <Select.Option value="date">Date</Select.Option>
          <Select.Option value="time">Time</Select.Option>
          <Select.Option value="datetime">DateTime</Select.Option>
        </Select>
      </Col>
      <Col span={12} style={{ marginBottom: 8 }}>
        {(data.mode === 'date' || data.mode === 'datetime') && (
          <DatePicker
            showTime={data.mode === 'datetime' ? { minuteStep: true } : undefined}
            format={format[data.mode]}
            placeholder="Initial"
            defaultValue={moment(data.initial || undefined)}
            onChange={obj => update({ initial: objToDateStr(obj, data.mode) })}
          />
        )}
        {data.mode === 'time' && (
          <TimePicker
            minuteStep
            format={format.time}
            placeholder="Initial"
            defaultValue={moment(data.initial || undefined)}
            onChange={obj => update({ initial: objToDateStr(obj, data.mode) })}
          />
        )}
      </Col>
      <Col span={12} style={{ marginBottom: 8 }}>
        {(data.mode === 'date' || data.mode === 'datetime') && (
          <DatePicker
            showTime={data.mode === 'datetime' ? { minuteStep: true } : undefined}
            format={format[data.mode]}
            placeholder="Min"
            defaultValue={moment(data.min || undefined)}
            onChange={obj => update({ min: objToDateStr(obj, data.mode) })}
          />
        )}
        {data.mode === 'time' && (
          <TimePicker
            minuteStep
            format={format.time}
            placeholder="Min"
            defaultValue={moment(data.min || undefined)}
            onChange={obj => update({ min: objToDateStr(obj, data.mode) })}
          />
        )}
      </Col>
      <Col span={12} style={{ marginBottom: 8 }}>
        {(data.mode === 'date' || data.mode === 'datetime') && (
          <DatePicker
            showTime={data.mode === 'datetime' ? { minuteStep: true } : undefined}
            format={format[data.mode]}
            placeholder="Max"
            defaultValue={moment(data.max || undefined)}
            onChange={obj => update({ max: objToDateStr(obj, data.mode) })}
          />
        )}
        {data.mode === 'time' && (
          <TimePicker
            minuteStep
            format={format.time}
            placeholder="Max"
            defaultValue={moment(data.max || undefined)}
            onChange={obj => update({ max: objToDateStr(obj, data.mode) })}
          />
        )}
      </Col>
    </Row>
  )
}

DateForm.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    label: PropTypes.string,
    data: PropTypes.string,
    mode: PropTypes.oneOf(['date', 'time', 'datetime']),
    initial: PropTypes.string,
    max: PropTypes.string,
    min: PropTypes.string,
  }),
  update: PropTypes.func,
}

export default DateForm
