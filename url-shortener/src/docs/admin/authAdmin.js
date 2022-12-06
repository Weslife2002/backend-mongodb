export default {
  post: {
    tags: ['Admin operations'], // operation's tag.
    operationId: 'Authenticate Admin', // unique operation id.
    consumes: ['application/json'],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              username: {
                type: 'string',
                example: 'duytan',
              },
              password: {
                type: 'string',
                example: '1234567',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Successfully create new admin', // response desc.
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Successfully create new admin!',
                },
                data: {
                  type: 'object',
                  properties: {
                    username: {
                      type: 'string',
                      example: 'duytan',
                    },
                  },
                },
              },
            },
          },
        },
      },
      402: {
        description: 'Missing required parameters', // response desc.
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Create admin failed!',
                },
                error: {
                  type: 'string',
                  example: 'Missing required parameters.',
                },
              },
            },
          },
        },
      },
      500: {
        description: 'Internal error', // response desc.
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Something went wrong!',
                },
                error: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  },
};
