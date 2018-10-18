import React from 'react'
import { Divider, Button, Alert } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
      message: {},
      error: '',
    }
  }

  componentWillMount() {
    const { defaultValue } = this.props
    this.setState({ message: defaultValue })
  }

  onSubmit = e => {
    e && e.preventDefault()
    if (!this.validateMessage()) {
      return null
    }
    this.setState({ error: '' })
    const { message } = this.state
    const { onSubmit } = this.props
    onSubmit && onSubmit(message)
  }

  validateMessage = () => {
    return true
  }

  inputChange = () => {}

  renderForm = () => {}

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
  onSubmit: PropTypes.func,
  defaultValue: PropTypes.any,
  closeForm: PropTypes.func,
}

export default BaseMessageForm
