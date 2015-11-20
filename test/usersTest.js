var request = require('request'),
    expect = require('chai').expect,
    baseUrl = 'http://localhost:3000';

describe('Users', function() {
  it('should show a sign up page on GET /signup', function (done) {
    request(baseUrl + '/signup', function (error, response, body) {
      console.log('RESPONSE', response);
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should show a log in page on GET /login', function (done) {
    request(baseUrl + '/login', function (err, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});