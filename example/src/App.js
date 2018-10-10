import React from 'react'
import { MessageReader } from 'aiya-chat-ui'
import fbMessages from './data/facebook'
import lineMessages from './data/line'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        {fbMessages.map((message, key) => (
          <React.Fragment key={key}>
            <MessageReader message={message} channel="facebook" />
          </React.Fragment>
        ))}
      </div>
    )
  }
}

export default App
