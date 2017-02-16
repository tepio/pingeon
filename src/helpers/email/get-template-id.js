const config = require('smart-config');

module.exports = function (templateName) {
  const templatesMap = config.get('email.templatesMap') || {};
  return templatesMap[templateName] || templateName;
};
