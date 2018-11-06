import React from 'react'
import PropTypes from 'prop-types'
import { Types } from '../../../MessageObject/Line/templates'
import CarouselTemplates from './Carousel'

const { CAROUSEL } = Types

const TemplateElement = props => {
  const { data, onClick } = props
  if (!data) {
    return null
  }

  const type = data.type
  if (type === CAROUSEL) {
    const elements = data.columns.map(el => ({
      imageUrl: el.thumbnailImageUrl,
      title: el.title,
      text: el.text,
      actions: el.actions.map(action => action.label),
    }))
    return (
      <div onClick={onClick}>
        <CarouselTemplates elements={elements} imageRatio={data.imageAspectRatio || 'rectangle'} />
      </div>
    )
  }
  return null
}

TemplateElement.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
}

export default TemplateElement
