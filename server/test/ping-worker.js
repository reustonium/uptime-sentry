process.env.NODE_ENV = 'test';
let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let sinon = require('sinon');
let agenda = require('agenda');
let pingWorker = require('../app/ping-worker');

describe('PingWorker', () => {

  describe('Cancel Job', () => {
    it('should cancel an agenda job', () => {
      let jobId = 0;
      pingWorker.cancelJob(jobId);

    });
  });
});
