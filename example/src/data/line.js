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
      type: 'text',
      text: 'I am LINE Chatbot!!',
    },
  },
  {
    id: '#3',
    type: 'box',
    message: {
      type: 'image',
      originalContentUrl: 'http://fp2w.org/assets/ext/blob.jpg',
      previewImageUrl: 'http://fp2w.org/assets/ext/blob.jpg',
      quickReply: {
        items: [
          {
            type: 'action',
            imageUrl: undefined,
            action: {
              type: 'message',
              label: 'Message 1',
              text: 'message 1',
            },
          },
          {
            type: 'action',
            imageUrl: undefined,
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
]
