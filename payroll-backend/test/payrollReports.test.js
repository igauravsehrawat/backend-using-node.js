const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../bin/www');

const should = chai.should();

const {
  insertJobGroupRates, insertWorkLogs,
} = require('./seedDB');

chai.use(chaiHTTP);

before(async () => {
  await insertJobGroupRates();
});
describe('Get payroll initially', () => {
  it('should have empty data', (done) => {
    chai.request(server).get('/payroll-reports/all')
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data.should.have.lengthOf(0);
        done();
      });
  });
});


describe('Get payroll after filling up DB', () => {
  before(async () => {
    await insertWorkLogs();
  });
  it('Should have array of length 4', (done) => {
    chai.request(server).get('/payroll-reports/all')
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data.should.have.lengthOf(4);
        done();
      });
  });
});
