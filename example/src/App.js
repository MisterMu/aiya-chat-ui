import React from 'react'
import { FacebookEditor } from 'aiya-chat-ui'
import fbMessages from './data/facebook'
import lineMessages from './data/line'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: fbMessages,
    }
  }

  render() {
    const { messages } = this.state
    return (
      <div>
        <h3>facebook</h3>
        <FacebookEditor
          data={messages}
          onUpdate={(obj, action) => this.setState({ messages: obj })}
        />
        <section>
          <h3>data</h3>
          <pre>{JSON.stringify(messages, null, 2)}</pre>
        </section>
      </div>
    )
  }
}

export default App
