
process.env.NODE_ENV = 'test';
const { expect } = require('chai');

const supertest = require('supertest');
const connection = require('../db/connection');
const app = require('../app');

const request = supertest(app);

console.log(connection);
describe('/api', () => {
  beforeEach(() => connection.migrate.rollback()
    .then(() => connection.migrate.latest())
    .then(() => connection.seed.run()));

  after(() => {
    connection.destroy();
  });

  describe('/topics', () => {
    // GET / api / topics
    it('GET status:200 responds with an array of topic objects with correct properties', () => request
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        // console.log(body);
        expect(res.body.topics).to.be.an('array');
        expect(res.body.topics[0]).to.contain.keys('slug', 'description');
      }));
  });
});
