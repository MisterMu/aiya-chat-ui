export default {
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
}
