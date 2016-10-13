const sh = require('shelljs');
const _ = require('lodash');

const branch = _.trim(process.env.GIT_BRANCH, 'origin/');

if (branch === 'dev' || /build-/.test(branch)) sh.exec('npm run deploy:staging');
if (branch === 'master' || /release-/.test(branch)) sh.exec('npm run deploy:production');

