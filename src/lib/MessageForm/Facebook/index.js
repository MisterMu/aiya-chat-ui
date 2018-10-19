import React from 'react'
import PropTypes from 'prop-types'

import { messageTypes } from '../../../constants'
import Text from './Text'
import Image from './Image'
import Audio from './Audio'
import QuickReplies from './QuickReplies'

const { TEXT, IMAGE, AUDIO, VIDEO, FILE, QUICKREPLIES } = messageTypes

const FacebookForm = props => {
  const { type } = props
  if (type === TEXT) {
    return <Text {...props} />
  } else if (type === IMAGE) {
    return <Image {...props} />
  } else if (type === AUDIO) {
    return <Audio {...props} />
  } else if (type === QUICKREPLIES) {
    return <QuickReplies {...props} />
  }
  return null
}

FacebookForm.propTypes = {
  type: PropTypes.oneOf([TEXT, IMAGE, AUDIO, VIDEO, FILE, QUICKREPLIES]),
  onSubmit: PropTypes.func,
  defaultValue: PropTypes.any,
  closeForm: PropTypes.func,
}

export default FacebookForm
