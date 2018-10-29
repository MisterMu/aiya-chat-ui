export default {
  type: 'template',
  altText: 'this is a carousel template',
  template: {
    type: 'carousel',
    columns: [
      {
        thumbnailImageUrl: undefined,
        title: 'Title',
        text: 'Description',
        defaultAction: {
          type: 'message',
          text: 'Template Tapped',
        },
        actions: [
          {
            type: 'message',
            label: 'Button 1',
            text: 'Button 1 Tapped',
          },
          {
            type: 'message',
            label: 'Button 2',
            text: 'Button 2 Tapped',
          },
        ],
      },
    ],
    imageAspectRatio: 'rectangle',
  },
}
