import FacebookForm from './Facebook'
import LineForm from './Line'
import { messageTypes } from '../../constants'

const { TEXT } = messageTypes

const getFacebookForm = type => {
  switch (type) {
    case TEXT:
      return FacebookForm.Text
    default:
      return null
  }
}

const getLineForm = type => {
  switch (type) {
    case TEXT:
      return LineForm.Text
    default:
      return null
  }
}

export { getFacebookForm, getLineForm }
