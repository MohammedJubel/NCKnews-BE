const {
  getArticles, insertArticle, getArticleById, patchArticleVote, removeArticle,
} = require('../models/articles');

exports.sendArticles = (req, res, next) => {
  const {
    author, topic, sort_by, order, limit, page,
  } = req.query;
  const conditions = {};
  if (author) conditions['articles.author'] = author;
  if (topic) conditions['articles.topic'] = topic;

  getArticles(conditions, sort_by, order, limit, page)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.sendArticle = (req, res, next) => {
  const newArticle = req.body;

  insertArticle(newArticle)
    .then(([article]) => {
      res.status(201).send({ article });
    })
    .catch(next);
};

exports.sendArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const conditions = {};
  if (article_id) conditions['articles.article_id'] = article_id;
  getArticleById({ conditions })
    .then(([article]) => {
      if (article) res.status(200).send({ article });
      else Promise.reject({ status: 400, msg: 'Article not found' });
    })
    .catch(next);
};

exports.sendPatchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  const conditions = {};
  if (article_id) conditions['articles.article_id'] = article_id;
  patchArticleVote(conditions, inc_votes)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.deleteArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const conditions = {};
  if (article_id) conditions['articles.article_id'] = article_id;
  removeArticle(conditions)
    .then(deleteArticle => res.status(204).send({ deleteArticle }))
    .catch(next);
};
