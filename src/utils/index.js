import { messageTypes } from '../constants'
import { FacebookMessage, LineMessage } from '../lib/MessageObject'
import _ from 'lodash'

const { TEXT, IMAGE, QUICKREPLIES } = messageTypes

export function getFacebookMessageObject(type) {
  let obj = {}
  if (type === TEXT) {
    obj = FacebookMessage.Text
  } else if (type === IMAGE) {
    obj = FacebookMessage.Image
  } else if (type === QUICKREPLIES) {
    obj = { quick_replies: [FacebookMessage.QuickReply.text] }
  }
  return _.cloneDeep(obj)
}

export function getLineMessageObject(type) {
  let obj = {}
  if (type === TEXT) {
    obj = LineMessage.Text
  } else if (type === IMAGE) {
    obj = LineMessage.Image
  } else if (type === QUICKREPLIES) {
    obj = { quickReply: { items: [LineMessage.QuickReply.message] } }
  }
  return _.cloneDeep(obj)
}
