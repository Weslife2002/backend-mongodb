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
          urlList: [{
            type: 'ObjectId',
            ref: 'url',
          }],
        },
      },
      // Todo input model
      TodoInput: {
        type: 'object', // data type
        properties: {
          title: {
            type: 'string', // data type
            description: "Todo's title", // desc
            example: 'Coding in JavaScript', // example of a title
          },
          completed: {
            type: 'boolean', // data type
            description: 'The status of the todo', // desc
            example: false, // example of a completed value
          },
        },
      },
      // error model
      Error: {
        type: 'object', // data type
        properties: {
          message: {
            type: 'string', // data type
            description: 'Error message', // desc
            example: 'Not found', // example of an error message
          },
          internal_code: {
            type: 'string', // data type
            description: 'Error internal code', // desc
            example: 'Invalid parameters', // example of an error internal code
          },
        },
      },
    },
  },
};
