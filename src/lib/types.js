import { messageTypes } from '../constants'

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
