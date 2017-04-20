async function send(email) {
  return [Object.assign({}, email, {
    status: 'sent',
    _id: '13lf45gw5',
    reject_reason: null
  })];
}

module.exports = { send };
