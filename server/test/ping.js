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
        status: 'up',
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

    it('should not POST with a missing status parameter', (done) => {
      let ping = {
        jobId: 1,
        responseTime: 101
      };

      chai.request(server)
        .post('/ping')
        .send(ping)
        .end((err, res) => {
          res.should.have.property('status').eql(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('status');
          res.body.errors.status.should.have.property('kind').eql('required');
          done();
        });
    });

    it('should not POST with a missing responseTime parameter', (done) => {
      let ping = {
        status: 'up',
        jobId: 1
      };

      chai.request(server)
        .post('/ping')
        .send(ping)
        .end((err, res) => {
          res.should.have.property('status').eql(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('responseTime');
          res.body.errors.responseTime.should.have.property('kind').eql('required');
          done();
        });
    });

    it('should POST a new ping', (done) => {
      let ping = {
        status: 'up',
        jobId: '1',
        responseTime: 101
      };

      chai.request(server)
        .post('/ping')
        .send(ping)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Ping successfully added');
          res.body.ping.should.have.property('status').eql('up');
          res.body.ping.should.have.property('jobId').eql('1');
          res.body.ping.should.have.property('responseTime').eql(101);
          done();
        });
    });
  });
});
