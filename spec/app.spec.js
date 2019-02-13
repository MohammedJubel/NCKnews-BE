
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

  describe('/all routes', () => {
    it('GET status 404: if non-existent route', () => request.get('/dsfdfssdf')
      .expect(404)
      .then((res) => {
        // console.log(res.body.msg);
        expect(res.body.msg).to.equal('Page not found');
      }));
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
      it('GET status: 200 and limits number of articles returned(Default = 10)', () => request
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          // console.log(body.articles);
          expect(body.articles).to.have.length(10);
          expect(body.articles[9].title).to.equal('Seven inspirational thought leaders from Manchester UK');
        }));
      it('GET status: 200 and limits number of articles returned by user input', () => request
        .get('/api/articles?limit=7')
        .expect(200)
        .then(({ body }) => {
          // console.log(body.articles);
          expect(body.articles).to.have.length(7);
          expect(body.articles[6].body).to.equal('I was hungry.');
        }));
      it('GET status: 200 and limits number of sorted articles (Default = 10)', () => request
        .get('/api/articles?sort_by=created_at')
        .expect(200)
        .then(({ body }) => {
          // console.log(body.articles);
          expect(body.articles).to.have.length(10);
          expect(body.articles[9].body).to.equal('Who are we kidding, there is only one, and it\'s Mitch!');
        }));
      it('GET status: 200 and limits number of sorted articles by user input', () => request
        .get('/api/articles?sort_by=created_at&limit=3')
        .expect(200)
        .then(({ body }) => {
          // console.log(body.articles);
          expect(body.articles).to.have.length(3);
          expect(body.articles[2].body).to.equal('some gifs');
        }));
      it('POST status:201 and accepts an object with title, body, topic and username properties and responds with the posted article', () => {
        // POST /api/articles
        const newArticle = {
          title: 'life hacks', body: 'Does owning a cat guarantee happiness? studies say yes', topic: 'cats', author: 'butter_bridge',
        };
        return request
          .post('/api/articles')
          .send(newArticle)
          .expect(201)
          .then(({ body }) => {
            expect(body).to.be.an('object');
            expect(body.article.article_id).to.eql(13);
            expect(body.article).to.have.keys('title', 'body', 'topic', 'author', 'article_id', 'created_at', 'votes');
            expect(body.article.title).to.eql('life hacks');
            expect(body.article.body).to.eql('Does owning a cat guarantee happiness? studies say yes');
            // console.log(body.article);
          });
      });
      // GET / api / articles /: article_id
      describe('GET / api / articles /: article_id', () => {
        it('GET status:200 and responds with an article object based on the article id', () => request
          .get('/api/articles/2')
          .expect(200)
          .then(({ body }) => {
            // console.log(body);
            expect(body.article).to.be.an('object');
          }));
        it('GET status:200 and responds with an article object based on the article id with the correct properties', () => request
          .get('/api/articles/3')
          .expect(200)
          .then(({ body }) => {
            // console.log(body);
            expect(body.article).to.contain.keys(
              'article_id',
              'title',
              'body',
              'votes',
              'topic',
              'author',
              'created_at',
            );
          }));
        it('GET status:400 and responds with an article object based on the article id with the correct properties', () => request
          .get('/api/articles/efsdsdfs')
          .expect(400)
          .then(({ body }) => {
            // console.log(body, '<-----body');
            expect(body.msg).to.equal('invalid input syntax for type integer');
          }));
      });
    });
  });
});
