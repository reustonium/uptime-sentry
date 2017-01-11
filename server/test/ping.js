process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Ping = require('../app/model/ping');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Ping', () => {
  beforeEach((done) => {
    Ping.remove({}, (err) => {
      done();
    });
  });

  describe('/POST ping', () => {
    it('should not post with a missing jobId parameter', (done) => {
      let ping = {
        status: 200,
        responseTime: 134
      };

      chai.request(server)
        .post('/ping')
        .send(ping)
        .end((err, res) => {
          res.should.have.property('status').eql(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('jobId');
          res.body.errors.jobId.should.have.property('kind').eql('required');
          done();
        });
    });
  });
});
