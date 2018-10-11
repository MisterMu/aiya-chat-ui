import React from 'react'
import PropTypes from 'prop-types'

// const TextMessage = props => {
//   const { text } = props
//   return <BubbleMessage>{text}</BubbleMessage>
// }

class BaseMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textInputValue: 'as',
      _message: {},
    }
  }

  renderForm = () => {
    const { textInputValue } = this.state
    return (
      <form onSubmit={this.onSave}>
        <input
          value={textInputValue}
          onChange={e => this.setState({ textInputValue: e.target.value })}
        />
      </form>
    )
  }

  renderUI = () => {
    return null
  }

  inputChange = (key, value) => {
    let tmp = { ...this.state._message }
    tmp[key] = value
    this.onChange(tmp)
    this.setState({ _message: tmp })
  }

  onSave = () => {}

  toJSON = () => {}

  onChange = message => {
    const { onChange } = this.props
    onChange && onChange(message)
  }

  componentWillMount() {
    const { message } = this.props
    this.setState({ _message: message })
  }

  render() {
    return (
      <React.Fragment>
        <div>{this.renderUI()}</div>
      </React.Fragment>
    )
    // const { isEdit } = this.props
    // if (isEdit) {
    //   return this.renderForm()
    // } else {
    //   return this.renderUI()
    // }
  }
}

BaseMessage.propTypes = {
  // title: PropTypes.string,
  message: PropTypes.object,
  onChange: PropTypes.func,
  // isEdit: PropTypes.bool,
}

export default BaseMessage
