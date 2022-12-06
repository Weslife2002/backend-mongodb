export default {
  components: {
    schemas: {
      Admin: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            required: true,
            unique: true,
            index: true,
          },
          password: {
            type: 'string',
            required: true,
          },
        },
      },
      User: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            unique: true,
            index: true,
            required: true,
          },
          country: {
            type: 'string',
          },
          nativeUser: {
            type: 'boolean',
          },
          connectFacebook: {
            type: 'boolean',
          },
          connectGoogle: {
            type: 'boolean',
          },
          password: {
            type: 'string',
          },
          urlList: {
            // NOTE: check here
            type: 'ObjectId List',
            ref: 'url',
          },
        },
      },
      URL: {
        type: 'object', // data type
        properties: {
          originalUrl: {
            type: 'string', // data type
          },
          shortenUrl: {
            type: 'string',
            index: true,
          },
          clickNo: {
            type: 'number', // data type
          },
        },
      },
    },
  },
};
