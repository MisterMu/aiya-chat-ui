import { messageTypes } from '../constants'
import { FacebookMessage, LineMessage } from '../lib/MessageObject'

const { TEXT, AUDIO, IMAGE, VIDEO, FILE } = messageTypes

export function getFacebookMessageType(message) {
  if (message.text) {
    return TEXT
  } else if (message.attachment) {
    if (message.attachment.type === 'audio') {
      return AUDIO
    } else if (message.attachment.type === 'video') {
      return VIDEO
    } else if (message.attachment.type === 'image') {
      return IMAGE
    } else if (message.attachment.type === 'file') {
      return FILE
    }
  }
}

export function getLineMessageType(message) {
  if (message.type === 'text') {
    return TEXT
  } else if (message.type === 'audio') {
    return AUDIO
  } else if (message.type === 'image') {
    return IMAGE
  } else if (message.type === 'video') {
    return VIDEO
  }
}

export function getFacebookMessageObject(type) {
  switch (type) {
    case TEXT:
      return FacebookMessage.Text
    case IMAGE:
      return FacebookMessage.Image
    default:
      return {}
  }
}

export function getLineMessageObject(type) {
  switch (type) {
    case TEXT:
      return LineMessage.Text
    case IMAGE:
      return LineMessage.Image
    default:
      return {}
  }
}

export function isEmptyObject(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}
