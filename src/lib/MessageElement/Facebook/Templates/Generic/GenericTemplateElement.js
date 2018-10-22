import React from 'react'
import PropTypes from 'prop-types'
import { TemplateContainer, TextContainer, ImageCover, ButtonContainer, TemplateButton } from '../styled'

const GenericTemplateElement = props => {
  const { title, imageRatio, imageUrl, subtitle, buttons } = props.data
  return (
    <TemplateContainer>
      <ImageCover imageUrl={imageUrl} ratio={imageRatio} />
      <TextContainer>
        <h3>{title}</h3>
        <pre>{subtitle}</pre>
      </TextContainer>
      <ButtonContainer>
        {buttons.map((btn, i) => (
          <TemplateButton key={i}>
            <span>{btn}</span>
          </TemplateButton>
        ))}
      </ButtonContainer>
    </TemplateContainer>
  )
}

GenericTemplateElement.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    imageRatio: PropTypes.string,
    imageUrl: PropTypes.string,
    subtitle: PropTypes.string,
    buttons: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
}

export default GenericTemplateElement
