export default {
  post: {
    tags: ['Admin operations'], // operation's tag.
    operationId: 'Create New Admin', // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: 'Todos were obtained', // response desc.
        content: {
          // content-type
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Todo', // Todo model
            },
          },
        },
      },
    },
  },
};
