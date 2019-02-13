const {
  fetchArticles, insertArticle,
} = require('../models/articles');

exports.getArticles = (req, res, next) => {
  const {
    author, topic, sort_by, order, limit, page,
  } = req.query;
  // console.log(req.query, '----------------log');
  // put author and topic in object as that is required format in knex.where
  const conditions = {};
  if (author) conditions['articles.author'] = author;
  else if (topic) conditions['articles.topic'] = topic;

  fetchArticles(conditions, sort_by, order, limit, page)
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
