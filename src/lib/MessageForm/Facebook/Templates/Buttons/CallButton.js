import React from 'react'
import PropTypes from 'prop-types'
import { Input, Row, Col } from 'antd'

const CallButton = props => {
  const { data, updateBtn } = props
  return (
    <div>
      <Row gutter={8}>
        <Col span={12}>
          <Input value={data.title} placeholder="Title" onChange={e => updateBtn({ title: e.target.value })} />
        </Col>
        <Col span={12}>
          <Input
            value={data.payload}
            placeholder="Phone number"
            onChange={e => updateBtn({ payload: e.target.value })}
          />
        </Col>
      </Row>
    </div>
  )
}

CallButton.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
  }),
  updateBtn: PropTypes.func.isRequired,
}

export default CallButton
