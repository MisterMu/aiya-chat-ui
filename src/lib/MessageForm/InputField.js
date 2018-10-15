import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'

const labelSize = {
  span: 4,
}

const inputSize = {
  span: 20,
}

const InputField = props => {
  const { label, style, children } = props
  if (label) {
    return (
      <Row style={{ marginBottom: 8, ...style }}>
        <Col {...labelSize}>
          <label style={{ textTransform: 'capitalize' }}>{label}:</label>
        </Col>
        <Col {...inputSize}>{children}</Col>
      </Row>
    )
  } else {
    return children
  }
}

InputField.propTypes = {
  children: PropTypes.any.isRequired,
  label: PropTypes.string,
  style: PropTypes.object,
}

export default InputField
