import { messageTypes } from '../constants'
import { FacebookMessage, LineMessage } from '../lib/MessageObject'
import _ from 'lodash'

const { TEXT, IMAGE, AUDIO, TEMPLATES, QUICKREPLIES } = messageTypes

export function getFacebookMessageObject(type) {
  let obj = {}
  if (type === TEXT) {
    obj = FacebookMessage.Text
  } else if (type === IMAGE) {
    obj = FacebookMessage.Image
  } else if (type === AUDIO) {
    obj = FacebookMessage.Audio
  } else if (type === TEMPLATES) {
    obj = FacebookMessage.Templates.generic
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
  } else if (type === AUDIO) {
    obj = LineMessage.Audio
  } else if (type === QUICKREPLIES) {
    obj = { quickReply: { items: [LineMessage.QuickReply.message] } }
  }
  return _.cloneDeep(obj)
}

export function swapArrayElement(array, firstIndex, secondIndex) {
  let x = 0
  let y = 0
  if (firstIndex < secondIndex) {
    x = firstIndex
    y = secondIndex
  } else if (firstIndex > secondIndex) {
    x = secondIndex
    y = firstIndex
  }
  return array[x] && array[y]
    ? [...array.slice(0, x), array[y], ...array.slice(x + 1, y), array[x], ...array.slice(y + 1)]
    : array
}
