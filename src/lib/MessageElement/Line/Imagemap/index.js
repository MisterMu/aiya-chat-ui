import React from 'react'
import PropTypes from 'prop-types'
import { ImageContainer } from '../../styled'
import defaultImage from '../../../../assets/img/NO_IMG_AVAILABLE.png'

const ImagemapElement = props => {
  const { url, onClick } = props
  return (
    <ImageContainer onClick={onClick}>
      <img src={url || defaultImage} width={320} alt="ImagemapMessage" />
    </ImageContainer>
  )
}

ImagemapElement.propTypes = {
  url: PropTypes.string,
  onClick: PropTypes.func,
}

export default ImagemapElement
