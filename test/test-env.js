process.env.NODE_ENV = 'test';

const mocks = require('./global-mocks');
const assert = require('assert');
const sinon = require('sinon');
const mockery = require('mockery');
const request = require('supertest-promised');
const app = require('../src/app');

global.request = request(app);
global.mocks = mocks;
global.assert = assert;
global.app = app;
global.sinon = sinon;
global.mockery = mockery;
global.helpers = require('./helpers');
global.ctx = {};
