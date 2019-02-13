
process.env.NODE_ENV = 'test';
const { expect } = require('chai');

const supertest = require('supertest');
const connection = require('../db/connection');
const app = require('../app');

const request = supertest(app);


describe('/api', () => {
  beforeEach(() => connection.seed.run());
  // have rollback and migrate in seed file

  after(() => {
    connection.destroy();
  });

  describe('/topics', () => {
    // GET / api / topics
    it('GET status:200 and responds with an array of topic objects with correct properties', () => request
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        // console.log(body);
        expect(res.body.topics).to.be.an('array');
        expect(res.body.topics[0]).to.contain.keys('slug', 'description');
      }));
    it('POST status:201 and accepts an object with slug and description properties and responds with the posted topic object', () => {
      // POST /api/topics
      const newTopic = {
        slug: 'Footballer', description: 'Salah!',
      };
      return request
        .post('/api/topics')
        .send(newTopic)
        .expect(201)
        .then(({ body }) => {
          expect(body.topic).to.eql(newTopic);
          expect(body.topic).to.be.an('object');
          expect(body.topic).to.have.keys('description', 'slug');
          expect(body.topic.description).to.eql('Salah!');
          expect(body.topic.slug).to.eql('Footballer');
          // console.log(body.topic);
        });
    });
    describe('/articles', () => {
      // GET / api / articles
      it('GET status:200 and responds with an array of article objects with correct properties', () => request
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.articles).to.be.an('array');
          expect(body.articles[0]).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
        }));
      it('GET status:200 and responds with array of article filtered by username', () => request
        .get('/api/articles?author=rogersop')
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.articles).to.be.an('array');
          expect(body.articles[0].author).to.equal('rogersop');
        }));
      it('GET status:200 and responds with array of article filtered by topic', () => request
        .get('/api/articles?topic=cats')
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.articles).to.be.an('array');
          expect(body.articles[0].topic).to.equal('cats');
          expect(body.articles[0].created_at).to.equal('2002-11-19T12:21:54.171Z');
        }));
      it('GET status: 200 and returns sorted articles (Default by date)', () => request
        .get('/api/articles?sort_by=created_at')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an('array');
          expect(body.articles[0].created_at).to.equal('2018-11-15T12:21:54.171Z');
        }));
      it('GET status: 200 and returns sorted articles based on users chosen column', () => request
        .get('/api/articles?sort_by=article_id')
        .expect(200)
        .then(({ body }) => {
          // console.log(body.articles);
          expect(body.articles).to.be.an('array');
          expect(body.articles[0].article_id).to.equal(12);
        }));
      it('GET status: 200 and returns articles in order (Default by descending)', () => request
        .get('/api/articles?sort_by=article_id')
        .expect(200)
        .then(({ body }) => {
          // console.log(body.articles);
          expect(body.articles).to.be.an('array');
          expect(body.articles[0].article_id).to.equal(12);
        }));
      it('GET status: 200 and returns articles in order ascending', () => request
        .get('/api/articles?sort_by=article_id&order=asc')
        .expect(200)
        .then(({ body }) => {
          // console.log(body.articles);
          expect(body.articles).to.be.an('array');
          expect(body.articles[0].article_id).to.equal(1);
        }));
    });
  });
});
