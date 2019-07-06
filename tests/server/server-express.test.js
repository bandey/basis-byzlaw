const superAgent = require('supertest');

const config = require('../../config/config.js');
config.set('loggerMode', 'none');

const serverExpress = require('../../server/server-express.js');
serverExpress.set('port', config.get('serverPort'));

let server;
beforeAll(done => {
  server = serverExpress.listen(serverExpress.get('port'), () => done());
});

afterAll(done => {
  server.close(() => done());
});

test('get /', done => {
  superAgent(serverExpress).get('/')
    .expect(200)
    .expect('Content-Type', /text\/html/)
    .expect(/Hello/)
    .end((err, res) => {
      expect(err).toBeFalsy();
      done();
    });
});

test('get not existing path', done => {
  superAgent(serverExpress).get('/not-existing-path')
    .expect(404)
    .expect('Content-Type', /text\/html/)
    .expect(/ERROR 404/)
    .end((err, res) => {
      expect(err).toBeFalsy();
      done();
    });
});
