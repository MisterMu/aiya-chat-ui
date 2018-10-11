# aiya-chat-ui

> facebook and line messaging ui with react

[![NPM](https://img.shields.io/npm/v/aiya-chat-ui.svg)](https://www.npmjs.com/package/aiya-chat-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save aiya-chat-ui
```

## Usage

```jsx
import React, { Component } from 'react'
import { MessageReader } from 'aiya-chat-ui'

class Example extends Component {
  render() {
    const { channel, message } = this.props
    return <MessageReader channel={channel} message={message} />
  }
}
```

## License

MIT © [MisterMu](https://github.com/MisterMu)
