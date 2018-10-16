import { messageTypes } from '../constants'
import { FacebookMessage, LineMessage } from '../lib/MessageObject'
import _ from 'lodash'

const { TEXT, IMAGE } = messageTypes

export function getFacebookMessageObject(type) {
  let obj = {}
  if (type === TEXT) {
    obj = FacebookMessage.Text
  } else if (type === IMAGE) {
    obj = FacebookMessage.Image
  }
  return _.cloneDeep(obj)
}

export function getLineMessageObject(type) {
  let obj = {}
  if (type === TEXT) {
    obj = LineMessage.Text
  } else if (type === IMAGE) {
    obj = LineMessage.Image
  }
  return _.cloneDeep(obj)
}
