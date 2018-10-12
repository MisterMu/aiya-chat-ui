import Facebook from './Facebook'
import Line from './Line'
import { messageTypes } from '../../constants'

const { TEXT } = messageTypes

const getFacebookMessage = type => {
  switch (type) {
    case TEXT:
      return Facebook.Text
    default:
      return { type }
  }
}

const getLineMessage = type => {
  switch (type) {
    case TEXT:
      return Line.Text
    default:
      return { type }
  }
}

export { getFacebookMessage, getLineMessage }
