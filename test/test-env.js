process.env.NODE_ENV = 'test';

import assert from 'assert';
import sinon from 'sinon';
import mockery from 'mockery';
import request from 'supertest-promised';
import app from '../src/app';

global.request = request(app);
global.assert = assert;
global.app = app;
global.sinon = sinon;
global.mockery = mockery;
global.mocks = require('./global-mocks');
global.helpers = require('./helpers');
global.ctx = {};

global.mocks.register();
