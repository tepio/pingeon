const { version } = require('../../package.json');
const runTime = new Date();

module.exports = async() => ({ version, uptime: +(new Date()) - +runTime });
