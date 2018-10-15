import React from 'react'
import PropTypes from 'prop-types'

import { messageTypes } from '../../../constants'
import Text from './Text'

const { TEXT, IMAGE, AUDIO, VIDEO, FILE } = messageTypes

const FacebookForm = props => {
  const { type } = props
  switch (type) {
    case TEXT:
      return <Text {...props} />
    default:
      return null
  }
}

FacebookForm.propTypes = {
  type: PropTypes.oneOf([TEXT, IMAGE, AUDIO, VIDEO, FILE]),
  onSubmit: PropTypes.func,
  defaultValue: PropTypes.any,
  closeForm: PropTypes.func,
}

export default FacebookForm
