const ajv = require('ajv')();

const schema = {
  required: ['providers'],
  properties: {
    recipients: { type: 'array' },
    providers: {
      minProperties: 1,
      type: 'object',
      properties: {
        email: {
          type: 'object',
          properties: {
            template: { type: 'string' },
            vars: { type: 'object' },
            addresses: {
              type: 'array',
              items: { type: 'string' }
            }
          },
          push: {
            type: 'object',
            required: ['message'],
            properties: {
              message: { type: 'string' },
              payload: { type: 'object' },
              tokens: {
                type: 'array',
                items: { type: 'string' }
              }
            }
          },
          pubsub: {
            type: 'object',
            required: ['message'],
            properties: {
              message: { type: 'string' },
              prefix: { type: 'string' },
              channels: {
                type: 'array',
                items: { type: 'string' }
              }
            }
          }
        }
      }
    }
  }
};

module.exports = ({ data }) => {
  const isValid = ajv.validate(schema, data);
  return { isValid, errorMessage: ajv.errorsText() };
};
