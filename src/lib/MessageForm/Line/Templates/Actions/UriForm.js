import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input } from 'antd'

const UriForm = props => {
  const { data, update } = props
  return (
    <Row gutter={8}>
      <Col span={12}>
        <Input value={data.label} placeholder="Label" onChange={e => update({ label: e.target.value })} />
      </Col>
      <Col span={12}>
        <Input value={data.uri} placeholder="Link" onChange={e => update({ uri: e.target.value })} />
      </Col>
    </Row>
  )
}

UriForm.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    label: PropTypes.string,
    uri: PropTypes.string,
  }),
  update: PropTypes.func,
}

export default UriForm
