import React from 'react'
import { Button, Divider } from 'antd'
import { GroupMessageEditor, GroupMessageDisplay } from 'aiya-chat-ui'
import groupFb from './data/groupFb'
import groupLine from './data/groupLine'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      channel: 'facebook',
      dataList: groupFb,
    }
  }

  toggleChannel = () => {
    const { channel } = this.state
    const newChannel = channel === 'facebook' ? 'line' : 'facebook'
    const newMessages = channel === 'facebook' ? groupLine : groupFb
    this.setState({ channel: newChannel, dataList: newMessages })
  }

  render() {
    const { dataList, channel } = this.state
    return (
      <div>
        <Button onClick={this.toggleChannel}>Switch Channel</Button>
        <Divider orientation="left">{channel}</Divider>
        <GroupMessageEditor
          dataList={dataList}
          channel={channel}
          onUpdate={groups => this.setState({ dataList: groups })}
          enableCustomElement
        />
        <Divider />
        <section>
          <h3>data</h3>
          <pre>{JSON.stringify(dataList, null, 2)}</pre>
        </section>
        <Divider />
        <GroupMessageDisplay dataList={dataList} channel={channel} />
      </div>
    )
  }
}

export default App
