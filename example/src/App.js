import React from 'react'
import { Button, Divider } from 'antd'
import { MessageEditor } from 'aiya-chat-ui'
import fbMessages from './data/facebook'
import lineMessages from './data/line'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      channel: 'facebook',
      dataList: fbMessages,
    }
  }

  toggleChannel = () => {
    const { channel } = this.state
    const newChannel = channel === 'facebook' ? 'line' : 'facebook'
    const newMessages = channel === 'facebook' ? lineMessages : fbMessages
    this.setState({ channel: newChannel, dataList: newMessages })
  }

  render() {
    const { dataList, channel } = this.state
    return (
      <div>
        <Button onClick={this.toggleChannel}>Switch Channel</Button>
        <Divider orientation="left">{channel}</Divider>
        <MessageEditor
          channel={channel}
          dataList={dataList}
          onUpdate={(obj, action) => this.setState({ dataList: obj })}
        />
        <Divider />
        <section>
          <h3>data</h3>
          <pre>{JSON.stringify(dataList, null, 2)}</pre>
        </section>
      </div>
    )
  }
}

export default App
