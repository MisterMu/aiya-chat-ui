export default [
  {
    id: '#1',
    type: 'text',
    message: {
      text: 'Hello',
    },
  },
  {
    id: '#2',
    type: 'box',
    message: {
      text: 'I am FACEBOOK Chatbot!!',
      attachment: {
        type: 'image',
        payload: {
          url: 'http://fp2w.org/assets/ext/blob.jpg',
        },
      },
      quick_replies: [
        {
          content_type: 'text',
          title: 'Title1',
          payload: 'payload',
          image_url: 'http://fp2w.org/assets/ext/blob.jpg',
        },
        {
          content_type: 'text',
          title: 'Title2',
          payload: 'payload',
          image_url: 'https://i.imgur.com/C6iIw7J.jpg',
        },
      ],
    },
  },
]
