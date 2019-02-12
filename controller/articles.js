const {
  fetchArticles,
} = require('../models/articles');

exports.getArticles = (req, res, next) => {
  const {
    author, topic, sort_by, order, limit, page,
  } = req.query;
  // console.log(req.query, '----------------log');
  const conditions = {};
  if (author) conditions['articles.author'] = author;
  if (topic) conditions['articles.topic'] = topic;

  fetchArticles(conditions, sort_by, order, limit, page)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(err => console.log(err) || next(err));
};
