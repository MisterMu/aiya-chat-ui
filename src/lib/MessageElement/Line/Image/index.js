import React from 'react'
import PropTypes from 'prop-types'
import { ImageContainer } from '../../styled'
import defaultImage from '../../../../assets/img/NO_IMG_AVAILABLE.png'

const ImageElement = props => {
  const { url, onClick } = props
  return (
    <ImageContainer onClick={onClick}>
      <img src={url || defaultImage} width={320} height={320} alt="ImageMessage" />
    </ImageContainer>
  )
}

ImageElement.propTypes = {
  url: PropTypes.string,
  onClick: PropTypes.function,
}

export default ImageElement
