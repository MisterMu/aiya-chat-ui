import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Icon } from 'antd'
import CarouselForm from './CarouselForm'
import templateObject from '../../../../MessageObject/Line/templates'
import { Flex, Toolbar, AddBtn } from '../../../styled'
import { swapArrayElement } from '../../../../../utils'

class CarouselTemplateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  addTemplate = () => {
    const { elements, updateElements } = this.props
    const newTemplate = templateObject.carousel
    if (newTemplate && newTemplate.template) {
      const template = newTemplate.template
      const element = template.columns && template.columns[0]
      const tmp = element ? [...elements, element] : elements
      updateElements(tmp)
    }
  }

  updateTemplate = (item, index) => {
    const { elements, updateElements } = this.props
    let tmp = [...elements]
    tmp[index] = { ...tmp[index], ...item }
    updateElements(tmp)
  }

  delTemplate = indexToDelete => {
    const { elements, updateElements } = this.props
    let tmp = [...elements]
    tmp.splice(indexToDelete, 1)
    updateElements(tmp)
  }

  moveTemplate = (index, direction) => {
    const { elements, updateElements } = this.props
    if (!elements) {
      return null
    }
    let tmp = [...elements]
    let swapTo = 0
    if (direction === 'up') {
      swapTo = index - 1
    } else if (direction === 'down') {
      swapTo = index + 1
    } else {
      return null
    }
    const newTmp = swapArrayElement([...tmp], index, swapTo)
    updateElements({ elements: newTmp })
  }

  render() {
    const { elements, max, uploadFile } = this.props
    if (!elements) {
      return null
    }
    return (
      <React.Fragment>
        {elements.map((el, i) => (
          <React.Fragment key={i}>
            <Flex>
              <Divider orientation="left">{`Carousel #${i + 1}`}</Divider>
              <Toolbar>
                {i !== 0 && (
                  <Icon type="up-circle" className="primary-icon" onClick={() => this.moveTemplate(i, 'up')} />
                )}
                {i !== elements.length - 1 && (
                  <Icon type="down-circle" className="primary-icon" onClick={() => this.moveTemplate(i, 'down')} />
                )}
                {i !== 0 && (
                  <Icon
                    type="close-circle"
                    theme="filled"
                    className="danger-icon"
                    onClick={() => this.delTemplate(i)}
                  />
                )}
              </Toolbar>
            </Flex>
            <CarouselForm data={el} updateElement={item => this.updateTemplate(item, i)} uploadFile={uploadFile} />
          </React.Fragment>
        ))}
        <Divider />
        {elements.length < (max || Number.POSITIVE_INFINITY) && (
          <AddBtn onClick={this.addTemplate}>
            <span>
              <Icon type="plus-circle" /> Add Template
            </span>
          </AddBtn>
        )}
      </React.Fragment>
    )
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
  uploadFile: PropTypes.func,
}

export default CarouselTemplateForm
