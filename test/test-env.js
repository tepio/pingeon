process.env.NODE_ENV = 'test';

import mocks from './global-mocks';
import assert from 'assert';
import sinon from 'sinon';
import mockery from 'mockery';
import request from 'supertest-promised';
import app from '../src/app';

global.request = request(app);
global.mocks = mocks;
global.assert = assert;
global.app = app;
global.sinon = sinon;
global.mockery = mockery;
global.helpers = require('./helpers');
global.ctx = {};
