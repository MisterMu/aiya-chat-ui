import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Select, Input } from 'antd'

const labelSize = { span: 4 }
const inputSize = { span: 20 }

const MapActionForm = props => {
  const { data, updateAction } = props
  console.log(data)
  if (!data) {
    return null
  }
  return (
    <div style={{ marginTop: 16 }}>
      <Row gutter={8} style={{ marginBottom: 8 }}>
        <Col {...labelSize}>
          <label>Type:</label>
        </Col>
        <Col {...inputSize}>
          <Select value={data.type} onChange={val => updateAction({ type: val })}>
            <Select.Option value="message">Message</Select.Option>
            <Select.Option value="uri">Uri</Select.Option>
          </Select>
        </Col>
      </Row>
      {data.type === 'message' && (
        <Row gutter={8} style={{ marginBottom: 8 }}>
          <Col {...labelSize}>
            <label>Text:</label>
          </Col>
          <Col {...inputSize}>
            <Input value={data.text} onChange={e => updateAction({ text: e.target.value })} />
          </Col>
        </Row>
      )}
      {data.type === 'uri' && (
        <Row gutter={8} style={{ marginBottom: 8 }}>
          <Col {...labelSize}>
            <label>Link:</label>
          </Col>
          <Col {...inputSize}>
            <Input value={data.linkUri} onChange={e => updateAction({ linkUri: e.target.value })} />
          </Col>
        </Row>
      )}
    </div>
  )
}

MapActionForm.propTypes = {
  data: PropTypes.object,
  updateAction: PropTypes.func.isRequried,
}

export default MapActionForm
