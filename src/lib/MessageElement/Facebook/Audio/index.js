import React from 'react'
import PropTypes from 'prop-types'
import { BubbleMessage } from '../../styled'
import { color } from '../../../../constants'

const { FACEBOOK } = color

const AudioElement = props => {
  const { url, onClick } = props
  return (
    <BubbleMessage color={FACEBOOK.bubbleColor} textColor={FACEBOOK.textColor} onClick={onClick}>
      <audio controls>
        <source src={url} />
      </audio>
    </BubbleMessage>
  )
}

AudioElement.propTypes = {
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default AudioElement
