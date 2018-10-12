import React from 'react'
import { Button, Divider } from 'antd'
import { MessagesEditor } from 'aiya-chat-ui'
import fbMessages from './data/facebook'
import lineMessages from './data/line'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      channel: 'facebook',
      messages: fbMessages,
    }
  }

  toggleChannel = () => {
    const { channel } = this.state
    const newChannel = channel === 'facebook' ? 'line' : 'facebook'
    const newMessages = channel === 'facebook' ? lineMessages : fbMessages
    this.setState({ channel: newChannel, messages: newMessages })
  }

  render() {
    const { messages, channel } = this.state
    return (
      <div>
        <Button onClick={this.toggleChannel}>Switch Channel</Button>
        <Divider orientation="left">{channel}</Divider>
        <MessagesEditor
          channel={channel}
          messages={messages}
          onUpdate={(obj, action) => this.setState({ messages: obj })}
        />
        <Divider />
        <section>
          <h3>data</h3>
          <pre>{JSON.stringify(messages, null, 2)}</pre>
        </section>
      </div>
    )
  }
}

export default App
