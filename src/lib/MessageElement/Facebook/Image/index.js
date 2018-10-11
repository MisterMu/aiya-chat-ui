// import React from 'react'
// import PropTypes from 'prop-types'

// const ImageMessage = props => {
//   const { url, altText } = props
//   return (
//     <div>
//       <img src={url} alt={altText} />
//     </div>
//   )
// }

// ImageMessage.propTypes = {
//   url: PropTypes.string,
//   altText: PropTypes.string,
// }

// export default ImageMessage

import React from 'react'
import PropTypes from 'prop-types'
import { BaseMessage } from '../../shared'

class ImageMessage extends BaseMessage {
  renderForm = () => {
    const { textInputValue } = this.state
    return (
      <input
        value={textInputValue}
        onChange={e => this.setState({ textInputValue: e.target.value })}
      />
    )
  }

  toJSON = () => {
    console.log('test')
  }

  renderUI = () => {
    const { url, altText } = this.props.message
    return (
      <div>
        <img src={url} alt={altText || 'msg'} />
      </div>
    )
  }
}

ImageMessage.propTypes = {
  ...BaseMessage.propTypes,
  message: PropTypes.object,
}

export default ImageMessage
