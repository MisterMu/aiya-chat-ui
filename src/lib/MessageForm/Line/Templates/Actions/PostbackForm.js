import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input } from 'antd'

const PostbackForm = props => {
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
        <Input
          value={data.displayText}
          placeholder="Display Text"
          onChange={e => update({ displayText: e.target.value })}
        />
      </Col>
    </Row>
  )
}

PostbackForm.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    label: PropTypes.string,
    data: PropTypes.string,
    displayText: PropTypes.string,
  }),
  update: PropTypes.func,
}

export default PostbackForm
