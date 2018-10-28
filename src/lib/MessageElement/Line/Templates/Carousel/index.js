import React from 'react'
import PropTypes from 'prop-types'
import CarouselTemplateElement from './CarouselTemplateElement'
import { Flex } from '../../../styled'

const CarouselTemplates = props => {
  const { elements, imageRatio } = props
  if (!elements && !Array.isArray(elements)) {
    return null
  }
  return (
    <Flex>
      {elements.map((el, i) => (
        <React.Fragment key={i}>
          <CarouselTemplateElement data={el} imageRatio={imageRatio} />
        </React.Fragment>
      ))}
    </Flex>
  )
}

CarouselTemplates.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
      actions: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  imageRatio: PropTypes.oneOf(['rectangle', 'square']),
}

export default CarouselTemplates
