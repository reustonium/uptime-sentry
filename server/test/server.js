process.env.NODE_ENV = 'production';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
const stream = require('stream');

chai.use(chaiHttp);

describe('production server', () => {

  it('should use morgan', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        done();
      });
  });
});
