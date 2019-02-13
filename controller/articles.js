const {
  getArticles, insertArticle, getArticleById,
} = require('../models/articles');

exports.sendArticles = (req, res, next) => {
  const {
    author, topic, sort_by, order, limit, page,
  } = req.query;
  // console.log(req.query, '----------------log');
  // put author and topic in object as that is required format in knex.where
  const conditions = {};
  if (author) conditions['articles.author'] = author;
  else if (topic) conditions['articles.topic'] = topic;

  getArticles(conditions, sort_by, order, limit, page)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(err => console.log(err) || next(err));
};

exports.addArticle = (req, res, next) => {
  const newArticle = req.body;

  insertArticle(newArticle)
    .then(([article]) => {
      res.status(201).send({ article });
    })
    .catch(err => console.log(err) || next(err));
};

exports.sendArticleById = (req, res, next) => {
  const { article_id } = req.params;
  // console.log(article_id, '<--- id');
  const conditions = {};
  if (article_id) conditions.article_id = article_id;
  getArticleById({ conditions })
    .then(([article]) => {
      // console.log(article, '<-----controller');
      if (article) res.status(200).send({ article });
      else Promise.reject({ status: 400, msg: 'Article not found' });
      // Promise.reject or next
    })
    .catch(next);
};
