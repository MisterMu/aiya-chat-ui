import React from 'react'
import PropTypes from 'prop-types'

class CarouselTemplateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { elements, updateElements, max } = this.props
    if (!elements) {
      return null
    }
    return null
  }
}

CarouselTemplateForm.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      thumbnailImageUrl: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
      defaultAction: PropTypes.object,
      actions: PropTypes.arrayOf(PropTypes.object),
    }),
  ),
  updateElements: PropTypes.func.isRequired,
  max: PropTypes.number,
}

export default CarouselTemplateForm
