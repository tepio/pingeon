const RecipientProvider = require('../../recipient-profile/model');
const Notification = require('../../notification/model');
const _ = require('lodash');
const Promise = require('bluebird');
const pushHelper = require('../../../helpers/push-send');

module.exports = async({ message, payload, recipientId }) => {

  async function createNotifications({ recipientId, message, payload }) {
    return await Promise.all(
      _(await RecipientProvider.find({ recipientId, providerType: 'push' }))
        .uniq('address')
        .map(({ recipientId, address, platform, deviceId }) => {
          return Notification.create({ recipientId, address, platform, deviceId, message, payload });
        })
        .value()
    );
  }

  function send(toSend) {
    return Promise.map(toSend, push => pushHelper.send(push));
  }

  const pushes = await createNotifications({ recipientId, message, payload });

  return await send(pushes);
};
