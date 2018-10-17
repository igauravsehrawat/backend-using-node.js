
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../bin/www');

const should = chai.should();
const expect = chai.expect();

chai.use(chaiHTTP);

describe('If server is boots up', () => {
  it('Render the homepage', (done) => {
    chai.request(server).get('/')
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
        res.text.should.include('Greeting');
      });
    done();
  });
});

describe('Get payroll initially', () => {
  it('should have empty data', (done) => {
    chai.request(server).get('/payroll-reports/all')
      .end((err, res) => {
        console.log(res.body.data);
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data.should.have.lengthOf(0);
        done();
      });
  });
});

describe('Get payroll after filling up DB', () => {
  it('Should have array of length 4', (done) => {
    chai.request(server).get('/payroll-reports/all')
      .end((err, res) => {
        console.log(res.body.data);
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data.should.have.lengthOf(4);
        done();
      });
  });
});
