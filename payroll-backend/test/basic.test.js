
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../bin/www');

const should = chai.should();

const {
  deleteJobGroupRates, deleteWorkLogs,
} = require('./seedDB');

chai.use(chaiHTTP);

before(async () => {
  await deleteJobGroupRates();
  await deleteWorkLogs();
});
describe('If server is boots up', () => {
  it('Render the homepage', (done) => {
    chai.request(server).get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.include('Greeting');
      });
    done();
  });
});
