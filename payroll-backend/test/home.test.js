const request = require('supertest');
const expect = require('expect');
const server = require('../bin/www');

describe('If server is boots up', () => {
  it('Render the homepage', () => {
    request(server).get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.text).toContain('Greeting');
      });
  });
});
