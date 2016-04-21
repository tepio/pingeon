const RecipientProvider = require('../../recipient-provider/model');
const Notification = require('../../notification/model');
const _ = require('lodash');

module.exports = (app) => async(data, props) => {
  const pushHelper = require('../../../helpers/push-send')(app);

  async function createNotifications({ recipientId, message, payload }) {
    return await Promise.all(
      _(await RecipientProvider.find({ recipientId, providerType: 'push' }))
        .uniq('token')
        .map(({ recipientId, address, platform, deviceId }) => {
          return Notification.create({ recipientId, address, platform, deviceId, message, payload });
        })
        .value()
    );
  }

  function sendNotifications(toSend) {
    _.each(toSend, push => pushHelper.send(push));
  }

  const { message, payload } = data;
  const { recipientId } = props;

  return _(await createNotifications({ recipientId, message, payload }))
    .tap(sendNotifications)
    .value();

};
