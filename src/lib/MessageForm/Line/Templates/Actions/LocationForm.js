import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input } from 'antd'

const LocationForm = props => {
  const { data, update } = props
  return (
    <Row gutter={8}>
      <Col span={12} style={{ marginBottom: 8 }}>
        <Input value={data.label} placeholder="Label" onChange={e => update({ label: e.target.value })} />
      </Col>
    </Row>
  )
}

LocationForm.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    label: PropTypes.string,
  }),
  update: PropTypes.func,
}

export default LocationForm
