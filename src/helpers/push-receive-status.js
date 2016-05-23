const debug = require('debug')('app:helpers:push-receive-status');
const AWS = require('aws-sdk');
const async = require('async');
const extend = require('deep-extend');
const _ = require('lodash');

const RECEIVE_STATUS_INTERVAL = 100;
const RECEIVE_STATUS_TIMES = 3;

const config = require('config');
const { key, secret, region } = config.get('push');

AWS.config.update({ accessKeyId: key, secretAccessKey: secret, region });
const pushLogs = new AWS.CloudWatchLogs();
const awsUtils = require('../helpers/aws-utils');

function get({ providerMessageId, platformApplicationArn }) {
  return new Promise(resolve => {
    const logGroupName = awsUtils.getLogGroup(platformApplicationArn);

    async.retry({ times: RECEIVE_STATUS_TIMES, interval: RECEIVE_STATUS_INTERVAL }, (cb) => {

      const params = {
        filterPattern: `{ ($.notification.messageId = "${providerMessageId}") }`,
        limit: 1,
        startTime: 0
      };

      async.parallel({
        success: (cb) => pushLogs.filterLogEvents(extend(params, { logGroupName }),
          (err, res) => {
            if (err) debug(err);
            cb(null, res);
          }),
        failure: (cb) => pushLogs.filterLogEvents(extend(params, { logGroupName: logGroupName + '/Failure' }),
          (err, res) => {
            if (err) debug(err);
            cb(null, res);
          })
      }, (err, res) => {
        if (err) return cb(err);

        const success = _.get(res, 'success.events[0]');
        const failure = _.get(res, 'failure.events[0]');

        const receiveStatus = success || failure;
        if (!receiveStatus) return cb('retry');

        return resolve({ received: !!success, receiveStatus });
      });
    }, () => {
    });
  });
}

module.exports = { get };
