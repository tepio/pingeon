process.env.NODE_ENV = 'test';

import assert from 'assert';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import request from 'supertest-promised';
import app from '../src/app';

chai.use(sinonChai);

global.request = request(app);
global.assert = assert;
global.app = app;
global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
global.ctx = {};
