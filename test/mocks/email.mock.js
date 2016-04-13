module.exports = function () {

  async function send(email) {
    return [{
      email, status: 'sent',
      _id: 'mocked',
      reject_reason: null
    }];
  }

  return { send };
};
