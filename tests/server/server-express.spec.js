const test = require('tape-catch'); // use tape-catch in common test cases
// const test = require('tape'); // use pure tape in case of unexpected exeption to locate it source

// 'npm test' in package.json pipes output to tap-notify and tap-dot => output must be raw tap
// 'node tests/test.js' => output can be decorated by tap-diff
if (!process.env.npm_package_name) { // was launched not from 'npm run'
  const tapDiff = require('tap-diff');
  test.createStream().pipe(tapDiff()).pipe(process.stdout);
}

const superAgent = require('supertest');

const config = require('../../config/config.js');
config.set('loggerMode', 'none');

const serverExpress = require('../../server/server-express.js');
serverExpress.set('port', config.get('serverPort'));

test('server-express', (t) => t.end()); // simply show title message

const server = serverExpress.listen(serverExpress.get('port'), () => { // run server

  test('.get /', {timeout: 5000}, (t) => {
    superAgent(serverExpress).get('/')
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .expect(/Hello/)
      .end((err, res) => {
        t.error(err, 'show Hello');
        t.end();
      });
  });

  test('.get not existing path', {timeout: 5000}, (t) => {
    superAgent(serverExpress).get('/not-existing-path')
      .expect(404)
      .expect('Content-Type', /text\/html/)
      .expect(/ERROR 404/)
      .end((err, res) => {
        t.error(err, 'show Error');
        t.end();
      });
  });

  test('.teardown', (t) => {
    t.end();
    server.close(() => process.exit()); // shutdown server
  });

});