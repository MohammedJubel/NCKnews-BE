const {
  fetchArticles,
} = require('../models/topics');

exports.getArticles = (req, res, next) => fetchArticles()
  .then((articles) => {
    res.status(200).send({ articles });
  })
  .catch(err => console.log(err) || next(err));
