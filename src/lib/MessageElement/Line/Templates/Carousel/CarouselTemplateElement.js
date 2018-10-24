import React from 'react'
import PropTypes from 'prop-types'
import { TemplateContainer, ImageContainer, TextContainer, ButtonContainer } from '../styled'

const CarouselTemplateElement = props => {
  const { data, imageRatio } = props
  if (!data) {
    return null
  }

  const { title, text, imageUrl, actions } = data
  return (
    <TemplateContainer>
      {imageUrl && <ImageContainer ratio={imageRatio} imageUrl={imageUrl} />}
      <TextContainer>
        {title && <h3>{title}</h3>}
        <pre>{text}</pre>
      </TextContainer>
      {actions.map((label, i) => (
        <ButtonContainer key={i}>
          <span>{label}</span>
        </ButtonContainer>
      ))}
    </TemplateContainer>
  )
}

CarouselTemplateElement.propTypes = {
  data: PropTypes.shape({
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.string),
  }),
  imageRatio: PropTypes.oneOf(['rectangle', 'square']),
}

export default CarouselTemplateElement
