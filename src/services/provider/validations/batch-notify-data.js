const ajv = require('ajv')();

const schema = {
  required: ['message', 'recipients'],
  properties: {
    message: { type: 'string' },
    recipients: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['provider', 'data'],
        properties: { provider: { enum: ['fanout', 'email', 'push'] } },
        oneOf: [
          {
            properties: {
              provider: { type: 'string', constant: 'fanout' },
              data: { type: 'object', required: ['channel'] }
            }
          },
          {
            properties: {
              provider: { type: 'string', constant: 'email' },
              data: { type: 'object', required: ['template'] }
            }
          },
          {
            properties: {
              provider: { type: 'string', constant: 'push' },
              data: {
                type: 'object', oneOf: [
                  { required: ['receiverId'] },
                  { required: ['token'] }
                ]
              }
            }
          }
        ]
      }
    }
  }
};

module.exports = ({ data }) => {
  const isValid = ajv.validate(schema, data);
  return { isValid, errorMessage: ajv.errorsText() };
};

