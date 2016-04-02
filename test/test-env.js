process.env.NODE_ENV = 'test';

import assert from 'assert';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../src/app';
import fetcher from '../src/helpers/fetcher';

chai.use(sinonChai);

global.assert = assert;
global.app = app;
global.fetcher = fetcher;
global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
