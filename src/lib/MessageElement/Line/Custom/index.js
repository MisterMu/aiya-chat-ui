import React from 'react'
import PropTypes from 'prop-types'
import { BubbleMessage } from '../../styled'
import { color } from '../../../../constants'

const { LINE } = color

const CustomElement = props => {
  const { data, onClick } = props
  return (
    <BubbleMessage color={LINE.bubbleColor} textColor={LINE.textColor} onClick={onClick}>
      {JSON.stringify(data, null, 4)}
    </BubbleMessage>
  )
}

CustomElement.propTypes = {
  data: PropTypes.any,
  onClick: PropTypes.func,
}

export default CustomElement
