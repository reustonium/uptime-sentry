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
    it('it should get all the jobs', (done) => {
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

});
