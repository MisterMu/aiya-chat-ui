import React from 'react'
import PropTypes from 'prop-types'

const ImageMessage = props => {
  const { url, altText } = props
  return (
    <div>
      <img src={url} alt={altText} />
    </div>
  )
}

ImageMessage.propTypes = {
  url: PropTypes.string,
  altText: PropTypes.string,
}

export default ImageMessage
