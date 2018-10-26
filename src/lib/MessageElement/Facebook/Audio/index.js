import React from 'react'
import PropTypes from 'prop-types'

const AudioElement = props => {
  const { url, onClick } = props
  return (
    <audio controls onClick={onClick}>
      <source src={url} />
    </audio>
  )
}

AudioElement.propTypes = {
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default AudioElement
