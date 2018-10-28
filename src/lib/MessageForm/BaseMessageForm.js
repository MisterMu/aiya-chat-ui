import React from 'react'
import { Divider, Button, Alert } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { methodTypes } from '../../constants'
import _ from 'lodash'

const Flex = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`

class BaseMessageForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      extra: {},
      message: {},
      error: '',
    }
  }

  componentWillMount() {
    const { objectMsg } = this.props
    const message = objectMsg.message
    const extra = {
      request: objectMsg.request,
      mapping: objectMsg.mapping,
      element: objectMsg.element,
    }
    this.setState({ message, extra })
  }

  onSubmit = e => {
    e && e.preventDefault()
    if (!this.validateMessage()) {
      return null
    }
    this.setState({ error: '' })
    const { message, extra } = this.state
    const { onSubmit } = this.props
    onSubmit && onSubmit(message, !_.isEmpty(extra) && extra)
  }

  validateMessage = () => {
    return true
  }

  inputChange = () => {}

  renderForm = () => {}

  uploadFile = (file, cb) => {
    const { onUpload } = this.props
    onUpload && onUpload(file, cb)
  }

  render() {
    const { closeForm } = this.props
    const { error } = this.state
    return (
      <React.Fragment>
        {this.renderForm()}
        <Divider style={{ marginBottom: 16 }} />
        {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}
        <Flex style={{ justifyContent: 'flex-end' }}>
          <Button onClick={closeForm} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={this.onSubmit} type="primary">
            Save
          </Button>
        </Flex>
      </React.Fragment>
    )
  }
}

BaseMessageForm.propTypes = {
  objectMsg: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.oneOf(['text', 'box']),
    message: PropTypes.object,
    request: PropTypes.shape({
      method: PropTypes.oneOf(Object.keys(methodTypes).map(key => methodTypes[key])),
      uri: PropTypes.string,
      headers: PropTypes.object,
      variables: PropTypes.object,
    }),
    mapping: PropTypes.string,
    element: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
  onUpload: PropTypes.func,
  closeForm: PropTypes.func,
}

export default BaseMessageForm
