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
]
