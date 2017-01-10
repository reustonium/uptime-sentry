process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Job = require('../app/model/job');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Jobs', () => {
  beforeEach((done) => {
    Job.remove({}, (err) => {
      done();
    });
  });

  describe('/GET job', () => {
    it('should get all the jobs', (done) => {
      chai.request(server)
        .get('/job')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST job', () => {
    it('should not POST a job with a missing URL paramter', (done) => {
      let job = {
        freq: 60
      }

      chai.request(server)
        .post('/job')
        .send(job)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('url');
            res.body.errors.url.should.have.property('kind').eql('required');
          done();
        });
    });

    it('should POST a job', (done) => {
      let job = {
        url: "http://google.com",
        freq: 60
      }

      chai.request(server)
        .post('/job')
        .send(job)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('Job successfully added');
            res.body.job.should.have.property('url');
            res.body.job.should.have.property('freq');
          done();
        });
    });
  });

  describe('/GET/:id job', () => {
    it('should get a job with a given id', (done) => {
      let job = new Job({
        url: "http://google.com",
        freq: 60
      });

      job.save((err, job) => {
        chai.request(server)
          .get('/job/' + job.id)
          .send(job)
          .end((err, res) => {
              res.should.have.status(200);
              res.should.be.a('object');
              res.body.should.have.property('url');
              res.body.should.have.property('freq');
              res.body.should.have.property('_id').eql(job.id);
              res.body.should.have.property('status');
            done();
          });
      });

    });
  });
});
