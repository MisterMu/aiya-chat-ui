import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Icon } from 'antd'
import GenericForm from './GenericForm'
import templateObject from '../../../../MessageObject/Facebook/templates'
import { Flex, Toolbar, AddBtn } from '../../../styled'
import { swapArrayElement } from '../../../../../utils'

class GenericTemplateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  addTemplate = () => {
    const { elements, updateTemplate } = this.props
    const newTemplate = templateObject.generic
    if (newTemplate && newTemplate.attachment.payload) {
      const payload = newTemplate.attachment.payload
      const element = payload.elements && payload.elements[0]
      const tmp = element ? [...elements, element] : elements
      updateTemplate({ elements: tmp })
    }
  }

  updateTemplate = (item, index) => {
    const { elements, updateTemplate } = this.props
    let tmp = [...elements]
    tmp[index] = { ...tmp[index], ...item }
    updateTemplate({ elements: tmp })
  }

  delTemplate = indexToDelete => {
    const { elements, updateTemplate } = this.props
    let tmp = [...elements]
    tmp.splice(indexToDelete, 1)
    updateTemplate({ elements: tmp })
  }

  moveTemplate = (index, direction) => {
    const { elements, updateTemplate } = this.props
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
    updateTemplate({ elements: newTmp })
  }

  render() {
    const { elements, max } = this.props
    if (!elements) {
      return null
    }

    return (
      <React.Fragment>
        {elements.map((el, i) => (
          <React.Fragment key={i}>
            <Flex>
              <Divider orientation="left">{`Generic #${i + 1}`}</Divider>
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
            <GenericForm data={el} updateElement={item => this.updateTemplate(item, i)} />
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

GenericTemplateForm.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      image_url: PropTypes.string,
      default_action: PropTypes.shape({
        type: PropTypes.oneOf(['web_url']),
        url: PropTypes.string,
        webview_height_ratio: PropTypes.oneOf(['compact', 'tall', 'full']),
      }),
      buttons: PropTypes.arrayOf(PropTypes.object),
    }),
  ),
  updateTemplate: PropTypes.func.isRequired,
  max: PropTypes.number,
}

export default GenericTemplateForm
