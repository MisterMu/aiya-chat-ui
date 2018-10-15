import React from 'react'
import PropTypes from 'prop-types'
import { ImageContainer } from '../../styled'
import defaultImage from '../../../../assets/img/NO_IMG_AVAILABLE.png'

const ImageMessage = props => {
  const { url } = props
  return (
    <ImageContainer>
      <img src={url || defaultImage} width={320} height={320} alt="ImageMessage" />
    </ImageContainer>
  )
}

ImageMessage.propTypes = {
  url: PropTypes.string,
}

export default ImageMessage
