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
  {
    id: '#3',
    type: 'box',
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          image_aspect_ratio: 'horizontal',
          elements: [
            {
              title: 'Title1',
              image_url: 'http://fp2w.org/assets/ext/blob.jpg',
              subtitle: 'subtitle',
              default_action: {
                type: 'web_url',
                url: 'www.google.com',
                webview_height_ratio: 'tall',
              },
              buttons: [
                {
                  type: 'postback',
                  title: 'Postback Button',
                  payload: 'payload',
                },
              ],
            },
          ],
        },
      },
    },
  },
]
