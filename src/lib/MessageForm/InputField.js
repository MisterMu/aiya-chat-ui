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
  const { label, children } = props
  if (label) {
    return (
      <Row>
        <Col {...labelSize}>
          <label>{label}</label>
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
}

export default InputField
