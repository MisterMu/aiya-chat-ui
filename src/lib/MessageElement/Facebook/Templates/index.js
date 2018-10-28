import React from 'react'
import PropTypes from 'prop-types'
import { Types } from '../../../MessageObject/Facebook/templates'
import { Types as BtnTypes } from '../../../MessageObject/Facebook/buttons'
import GenericTemplates from './Generic'

const { GENERIC } = Types

const TemplateElement = props => {
  const { payload, onClick } = props
  if (payload.template_type === GENERIC) {
    const elements = payload.elements
    const imageRatio = payload.image_aspect_ratio
    const dataElements = (elements || []).map(data => ({
      title: data.title,
      imageRatio,
      imageUrl: data.image_url,
      subtitle: data.subtitle,
      buttons: data.buttons.map(btn => btn.title || (btn.type === BtnTypes.SHARE ? 'Share' : 'Button')),
    }))
    return (
      <div onClick={onClick}>
        <GenericTemplates data={dataElements} />
      </div>
    )
  }
  return null
}

TemplateElement.propTypes = {
  payload: PropTypes.objectOf(PropTypes.any),
  onClick: PropTypes.func,
}

export default TemplateElement
