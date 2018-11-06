import { Types } from '../../../../MessageObject/Line/actions'

const { POSTBACK, MESSAGE, URI, DATE } = Types

export default (action, isDefaultAction) => {
  if (!action) {
    return null
  }
  if (!action.label && !isDefaultAction) {
    return 'Label is required!!'
  }
  if (action.label && action.label.length > 20) {
    return 'Label must be no longer than 20 character!!'
  }
  if (action.data && action.data.length > 300) {
    return 'Data must be no longer than 300 character!!'
  }
  if (action.type === POSTBACK) {
    if (!action.data) {
      return 'Data is required!!'
    }
    if (action.displayText && action.displayText.length > 300) {
      return 'Display Text must be no longer than 300 character!!'
    }
  } else if (action.type === MESSAGE) {
    if (!action.text) {
      return 'Text is required!!'
    }
    if (action.text.length > 300) {
      return 'Text must be no longer than 300 character!!'
    }
  } else if (action.type === URI) {
    const regEx = /(^https:\/\/|^http:\/\/|^line:\/\/|^tel:\/\/)/g
    if (!action.uri) {
      return 'URI Link is required!!'
    }
    if (!regEx.test(action.uri)) {
      return 'URI link schema must be one of http, https, line, tel!!'
    }
    if (action.uri.length > 1000) {
      return 'URI link must be no longer than 1000 character!!'
    }
  } else if (action.type === DATE) {
    if (!action.data) {
      return 'Data is required!!'
    }
  }

  return 'pass'
}
