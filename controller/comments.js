const {
  getCommentsByArticleId,
} = require('../models/comments');


exports.sendCommentsByArticleId = (req, res, next) => {
  const {
    sort_by, order, limit, page,
  } = req.query;
  const { article_id } = req.params;
  const conditions = {};
  if (article_id) conditions['articles.article_id'] = article_id;
  getCommentsByArticleId({
    conditions, sort_by, order, limit, page,
  })
    .then((comments) => {
      // console.log(comments, '<---comments');
      if (comments) res.status(200).send({ comments });
      else return Promise.reject({ status: 400, msg: 'Article not found' });
    })
    .catch(next);
};
