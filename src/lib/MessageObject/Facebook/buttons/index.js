import call from './call'
import postback from './postback'
import share from './share'
import url from './url'
import Types from './types'

export { Types }

export default {
  web_url: url,
  postback,
  phone_number: call,
  element_share: share,
}
