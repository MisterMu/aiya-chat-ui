export default {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: [
        {
          title: 'Title',
          image_url: '',
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
}
