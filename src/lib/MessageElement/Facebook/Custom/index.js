import React from 'react'
import PropTypes from 'prop-types'
import { BubbleMessage } from '../../styled'
import { color } from '../../../../constants'

const { FACEBOOK } = color

const CustomElement = props => {
  const { data, onClick } = props
  return (
    <BubbleMessage color={FACEBOOK.bubbleColor} textColor={FACEBOOK.textColor} onClick={onClick}>
      {JSON.stringify(data, null, 4)}
    </BubbleMessage>
  )
}

CustomElement.propTypes = {
  data: PropTypes.any,
  onClick: PropTypes.func,
}

export default CustomElement
