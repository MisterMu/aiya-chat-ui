export default {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'generic',
      image_aspect_ratio: 'horizontal',
      elements: [
        {
          title: 'Title',
          image_url: '',
          subtitle: 'subtitle',
          default_action: undefined,
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
