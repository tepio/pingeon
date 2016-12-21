const RecipientProvider = require('../../recipient-profile/model');
const _ = require('lodash');
const Promise = require('bluebird');
const pushHelper = require('../../../helpers/push-send');

module.exports = async({ message, payload, recipientId }) => {
  const credentials = await getRecipientCredentials({ recipientId, message, payload });
  return await send(credentials);
};

async function getRecipientCredentials({ recipientId, message, payload }) {
  return await Promise.all(
    _(await RecipientProvider.find({ recipientId, providerType: 'push' }))
      .uniq('token')
      .map((pushProfile) => {
        return { recipientId, message, payload, ...pushProfile.toJSON() };
      })
      .value()
  );
}

function send(toSend) {
  return Promise.map(toSend, push => pushHelper.send(push));
}
