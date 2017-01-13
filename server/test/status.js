process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Status = require('../app/model/status');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Status', () => {
  beforeEach((done) => {
    Status.remove({}, (err) => {
      done();
    });
  });

  describe('/POST status', () => {
    it('should not post with a missing jobId parameter', (done) => {
      let status = {
        statusEvent: 'UP',
        statusTime: new Date("1/1/2017")
      };

      chai.request(server)
        .post('/status')
        .send(status)
        .end((err, res) => {
          res.should.have.property('status').eql(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('jobId');
          res.body.errors.jobId.should.have.property('kind').eql('required');
          done();
        });
    });

    it('should not POST with a missing statusTime parameter', (done) => {
      let status = {
        jobId: 1,
        statusEvent: 'UP'
      };

      chai.request(server)
        .post('/status')
        .send(status)
        .end((err, res) => {
          res.should.have.property('status').eql(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('statusTime');
          res.body.errors.statusTime.should.have.property('kind').eql('required');
          done();
        });
    });

    it('should not POST with a missing statusEvent parameter', (done) => {
      let status = {
        jobId: 1,
        statusTime: new Date("1/1/2017")
      };

      chai.request(server)
        .post('/status')
        .send(status)
        .end((err, res) => {
          res.should.have.property('status').eql(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('statusEvent');
          res.body.errors.statusEvent.should.have.property('kind').eql('required');
          done();
        });
    });

    it('should POST a new status', (done) => {
      let status = {
        jobId: '1',
        statusEvent: 'UP',
        statusTime: new Date("1/1/2017")
      };

      chai.request(server)
        .post('/status')
        .send(status)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Status successfully added');
          res.body.status.should.have.property('jobId').eql('1');
          res.body.status.should.have.property('statusTime');
          res.body.status.should.have.property('statusEvent').eql('UP');
          done();
        });
    });
  });
});
