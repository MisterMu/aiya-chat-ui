import React from 'react'
import PropTypes from 'prop-types'

class BaseMessageForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: {},
    }
  }

  componentWillMount() {
    const { defaultValue } = this.props
    this.setState({ message: defaultValue })
  }

  onSubmit = e => {
    e && e.preventDefault()
    const { message } = this.state
    const { onSubmit } = this.props
    console.log('message', message)
    onSubmit && onSubmit(message)
  }

  inputChange = (key, value) => {
    let tmp = { ...this.state.message }
    tmp[key] = value
    this.setState({ message: tmp })
  }
}

BaseMessageForm.propTypes = {
  onSubmit: PropTypes.func,
  defaultValue: PropTypes.any,
}

export default BaseMessageForm
