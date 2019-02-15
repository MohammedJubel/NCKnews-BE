
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
        });
    });
    describe('400 error - null description', () => {
      it('POST status:400 and gives error when description property is null (i.e - missing)', () => {
        const newTopic = { slug: 'Salah!' };
        return request
          .post('/api/topics')
          .send(newTopic)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('violates not null violation');
          });
      });
      describe('/articles', () => {
        // GET / api / articles
        it('GET status:200 and responds with an array of article objects with correct properties', () => request
          .get('/api/articles')
          .expect(200)
          .then(({ body }) => {
            // console.log(body.articles[0], '<------LOG');
            expect(body.articles).to.be.an('array');
            expect(body.articles[0]).to.contain.keys('article_id', 'title', 'body', 'votes', 'topic', 'author', 'created_at', 'comment_count');
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
            title: 'latest discovery', body: 'Does owning a cat guarantee happiness? studies say yes', topic: 'cats', author: 'butter_bridge',
          };
          return request
            .post('/api/articles')
            .send(newArticle)
            .expect(201)
            .then(({ body }) => {
              expect(body).to.be.an('object');
              expect(body.article.article_id).to.eql(13);
              expect(body.article).to.have.keys('title', 'body', 'topic', 'author', 'article_id', 'created_at', 'votes');
              expect(body.article.title).to.eql('latest discovery');
              expect(body.article.body).to.eql('Does owning a cat guarantee happiness? studies say yes');
              // console.log(body.article);
            });
        });
      });
      // GET / api / articles /: article_id
      describe('GET / api / articles /: article_id', () => {
        it('GET status:200 and responds with an article object based on the article id', () => request
          .get('/api/articles/7')
          .expect(200)
          .then(({ body }) => {
            // console.log(body);
            expect(body.article).to.be.an('object');
          }));
        it('GET status:200 and responds with an article object based on the article id with the correct properties', () => request
          .get('/api/articles/3')
          .expect(200)
          .then(({ body }) => {
            // console.log(body, '<--------BODY');
            expect(body.article).to.contain.keys(
              'article_id',
              'title',
              'body',
              'votes',
              'topic',
              'author',
              'created_at',
              'comment_count',
            );
          }));
        it('GET status:400 and responds with an article object based on the article id with the correct properties', () => request
          .get('/api/articles/efsdsdfs')
          .expect(400)
          .then(({ body }) => {
            console.log(body, '<-----body');
            expect(body.msg).to.equal('invalid input syntax for type integer');
          }));
      });
      describe('PATCH /api/articles/:article_id', () => {
        it('PATCH status:200 and updates the current article vote property by 1', () => request
          .patch('/api/articles/2')
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body }) => {
            // console.log(body);
            expect(body.article).to.be.an('object');
            expect(body.article.votes).to.equal(1);
          }));
        it('PATCH status:200 and decrements the current articles vote property(100) by 100', () => request
          .patch('/api/articles/1')
          .send({ inc_votes: -100 })
          .expect(200)
          .then(({ body }) => {
            // console.log(body);
            expect(body.article).to.be.an('object');
            expect(body.article.votes).to.equal(0);
          }));
        it('PATCH status:200 and decrements the current articles vote property(0) by 100', () => request
          .patch('/api/articles/3')
          .send({ inc_votes: -100 })
          .expect(200)
          .then(({ body }) => {
            // console.log(body);
            expect(body.article).to.be.an('object');
            expect(body.article.votes).to.equal(-100);
          }));
      });
      // why cant you delete certain articles? i.e 1 and 6?
      describe('DELETE /api/articles/:article_id', () => {
        it('DELETE status:204 and deletes the given article by`article_id. Should have no content', () => request
          .delete('/api/articles/7')
          .expect(204)
          .then(({ body }) => {
            // console.log(body);
            expect(body).to.not.contain.keys('article');
          }));
      });
      // Does it need to return array of comments?
      describe('GET /api/articles/:article_id/comments', () => {
        it('GET status:200 and responds with an array of comments based on the article id with the correct properties', () => request
          .get('/api/articles/6/comments')
          .expect(200)
          .then(({ body }) => {
            // console.log(body, '<----body');
            expect(body.comments).to.be.an('array');
            expect(body.comments[0]).to.contain.keys(
              'comment_id',
              'votes',
              'created_at',
              'author',
              'body',
            );
          }));
        it('GET status: 200 and returns sorted comments by article_id(Default by date)', () => request
          .get('/api/articles/1/comments')
          .expect(200)
          .then(({ body }) => {
            // console.log(body, '--------this');
            expect(body.comments[0].created_at).to.equal('2016-11-22T12:36:03.389Z');
          }));
        it('GET status: 200 and returns sorted comments by article_id based on users sort_by input', () => request
          .get('/api/articles/1/comments?sort_by=comment_id')
          .expect(200)
          .then(({ body }) => {
            // console.log(body, '--------this');
            expect(body.comments[0].comment_id).to.equal(18);
          }));
        it('GET status: 200 and returns comments by article_id in order (Default by descending', () => request
          .get('/api/articles/1/comments')
          .expect(200)
          .then(({ body }) => {
            // console.log(body.comments, '-------1nd');
            expect(body.comments[0].comment_id).to.equal(2);
          }));
        it('GET status: 200 and returns comments by article_id in order ascending', () => request
          .get('/api/articles/1/comments?order=asc')
          .expect(200)
          .then(({ body }) => {
            // console.log(body.comments, '-------2nd');
            expect(body.comments[0].comment_id).to.equal(18);
          }));
        it('GET status: 200 and limits number of articles returned(Default = 10)', () => request
          .get('/api/articles/1/comments')
          .expect(200)
          .then(({ body }) => {
            // console.log(body.comments);
            expect(body.comments).to.have.length(10);
            expect(body.comments[9].body).to.equal('Ambidextrous marsupial');
          }));
        it('GET status: 200 and limits number of comments by article_id returned by user input', () => request
          .get('/api/articles/1/comments?limit=7')
          .expect(200)
          .then(({ body }) => {
            // console.log(body.comments);
            expect(body.comments).to.have.length(7);
            expect(body.comments[6].body).to.equal('Delicious crackerbreads');
          }));
        it('GET status: 200 and returns limited number of comments by page (Default limit = 10, page = 1)', () => request
          .get('/api/articles/1/comments?page=1')
          .expect(200)
          .then(({ body }) => {
            // console.log(body.comments, '<-----this');
            expect(body.comments).to.have.length(10);
            expect(body.comments[9].body).to.equal('Ambidextrous marsupial');
          }));
        it('GET status: 200 and returns limited number of comments by page based on user input(Default limit = 5, page = 2)', () => request
          .get('/api/articles/1/comments?limit=5&page=2')
          .expect(200)
          .then(({ body }) => {
            // console.log(body);
            expect(body.comments).to.have.length(5);
            expect(body.comments[0].body).to.equal('Lobster pot');
          }));
        describe('POST /api/articles/:article_id/comments', () => {
          it('POST / status:201 responds with posted comment object', () => request
            .post('/api/articles/5/comments')
            .send({
              author: 'butter_bridge', body: 'Hakuna Matata',
            })
            .expect(201)
            .then(({ body }) => {
              expect(body.comment.body).to.eql('Hakuna Matata');
              expect(body.comment).to.have.keys(
                'comment_id',
                'author',
                'article_id',
                'votes',
                'body',
                'created_at',
              );
            }));
        });
        describe('PATCH /api/comments/:comment_id', () => {
          it('PATCH status: 200 and increments the current articles vote property by 1', () => request
            .patch('/api/comments/2')
            .send({ inc_votes: 1 })
            .expect(200)
            .then(({ body }) => {
              expect(body.comment).to.be.an('object');
              expect(body.comment.votes).to.equal(15);
            }));
          it('PATCH status: 200 and decrements the current articles vote property by 1', () => request
            .patch('/api/comments/2')
            .send({ inc_votes: -1 })
            .expect(200)
            .then(({ body }) => {
              expect(body.comment).to.be.an('object');
            }));
        });
        describe('DELETE /api/comments/:comment_id', () => {
          it('DELETE status: 204 and deletes the given comment by Comment_id', () => request
            .delete('/api/comments/7')
            .expect(204));
        });
        describe('GET /api/users', () => {
          it('GET status:200 responds with array of user objects', () => request
            .get('/api/users')
            .expect(200)
            .then(({ body }) => {
              expect(body.users).to.be.an('array');
            }));
          it('GET status:200 responds with array of user objects with the correct properties', () => request
            .get('/api/users')
            .expect(200)
            .then(({ body }) => {
              // console.log(body);
              expect(body.users[0]).to.contain.keys('username', 'avatar_url', 'name');
            }));
        });
        describe('POST /api/users', () => {
          it('POST status:201 and responds with posted user object', () => request
            .post('/api/users')
            .send({ username: 'Pokemaster', avatar_url: 'https://cdn.bulbagarden.net/upload/5/54/Ash_SM.png', name: 'Ash Ketchup' })
            .expect(201)
            .then(({ body }) => {
              expect(body.user).to.be.an('object');
            }));
          it('POST status:201 and responds with posted user object with the correct properties', () => request
            .post('/api/users')
            .send({ username: 'Pokemaster', avatar_url: 'https://cdn.bulbagarden.net/upload/5/54/Ash_SM.png', name: 'Ash Ketchup' })
            .expect(201)
            .then(({ body }) => {
              expect(body.user).to.eql({
                username: 'Pokemaster',
                avatar_url: 'https://cdn.bulbagarden.net/upload/5/54/Ash_SM.png',
                name: 'Ash Ketchup',
              });
            }));
        });
        describe('GET /api/users/:username', () => {
          it('GET status:200 and responds with an user object by username', () => request
            .get('/api/users/rogersop')
            .expect(200)
            .then(({ body }) => {
              expect(body.user).to.be.an('object');
            }));
          it('GET status:200 and responds with an user object by username with the correct properties', () => request
            .get('/api/users/rogersop')
            .expect(200)
            .then(({ body }) => {
              expect(body.user).to.be.an('object');
              expect(body.user).to.contain.keys(
                'username',
                'avatar_url',
                'name',
              );
            }));
        });
      });
    });
  });
});
