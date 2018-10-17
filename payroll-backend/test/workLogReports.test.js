const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../bin/www');

const should = chai.should();

chai.use(chaiHTTP);

describe('Post request for uploading without file', () => {
  it('should fail', (done) => {
    chai.request(server).post('/worklog-reports')
      .end((err, res) => {
        res.should.have.status(422);
      });
    done();
  });
});

describe('Post request for uploading with correct payload', () => {
  it('should pass', (done) => {
    chai.request(server).post('/worklog-reports')
      .attach('workLogReport', fs.readFileSync(path.join(__dirname, 'sample.csv')), 'sample.csv')
      .end((err, res) => {
        res.should.have.status(201);
      });
    done();
  });
});
