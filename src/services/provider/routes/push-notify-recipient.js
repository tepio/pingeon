const multiDB = require('mongoose-multi-connect');
const _ = require('lodash');
const Promise = require('bluebird');
const pushHelper = require('../../../helpers/push-send');

module.exports = async({ message, payload, recipientId }, params) => {
  const locationGroup = _.get(params, 'locationGroup');
  const credentials = await getRecipientCredentials({ recipientId, message, payload, locationGroup });
  return await send(credentials, locationGroup);
};

async function getRecipientCredentials({ recipientId, message, payload, locationGroup }) {
  const RecipientProfile = multiDB.getModel('recipientprofiles', locationGroup);
  return await Promise.all(
    _(await RecipientProfile.find({ recipientId, providerType: 'push' }))
      .uniq('token')
      .map((pushProfile) => {
        return { recipientId, message, payload, ...pushProfile.toJSON() };
      })
      .value()
  );
}

function send(toSend, locationGroup) {
  return Promise.map(toSend, push => pushHelper.send(Object.assign({ locationGroup }, push)));
}
