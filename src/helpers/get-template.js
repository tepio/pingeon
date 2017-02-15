const templatesMap = require('smart-config').get('email.templatesMap');

module.exports = function (templateName) {
  return templatesMap[templateName] || templateName;
};
