export default [
  {
    id: '#1',
    type: 'text',
    message: {
      type: 'text',
      text: 'Hello',
    },
  },
  {
    id: '#2',
    type: 'text',
    message: {
      text: 'I am LINE Chatbot!!',
    },
  },
  {
    id: '#3',
    type: 'box',
    message: {
      type: 'image',
      originalContentUrl: 'https://fp2w.org/assets/ext/blob.jpg',
      previewImageUrl: 'https://fp2w.org/assets/ext/blob.jpg',
      quickReply: {
        items: [
          {
            type: 'action',
            imageUrl: 'https://fp2w.org/assets/ext/blob.jpg',
            action: {
              type: 'message',
              label: 'Message 1',
              text: 'message 1',
            },
          },
          {
            type: 'action',
            imageUrl: 'https://i.imgur.com/C6iIw7J.jpg',
            action: {
              type: 'message',
              label: 'Message 2',
              text: 'message 2',
            },
          },
        ],
      },
    },
  },
  {
    id: '#4',
    type: 'box',
    message: {
      type: 'imagemap',
      baseUrl: '',
      altText: '',
      baseSize: {
        height: 1040,
        width: 1040,
      },
      actions: [
        {
          type: 'message',
          text: 'Hi',
          area: {
            x: 0,
            y: 0,
            width: 520,
            height: 1040,
          },
        },
        {
          type: 'message',
          text: 'Hello',
          area: {
            x: 520,
            y: 0,
            width: 520,
            height: 1040,
          },
        },
      ],
    },
  },
]
