const {
  getCommentsByArticleId, getCommentByArticleId, patchCommentVote, removeComment,
} = require('../models/comments');


exports.sendCommentsById = (req, res, next) => {
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
      if (comments) res.status(200).send({ comments });
      else return Promise.reject({ status: 400, msg: 'Article not found' });
    })
    .catch(next);
};
exports.sendNewCommentById = (req, res, next) => {
  const { article_id } = req.params;
  const newComment = req.body;

  getCommentByArticleId({ article_id, ...newComment })
    .then(([comment]) => res.status(201).send({ comment }))
    .catch((err) => {
      next(err);
    });
};

exports.sendPatchComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  const conditions = {};
  if (comment_id) conditions['comments.comment_id'] = comment_id;
  patchCommentVote(conditions, inc_votes)
    .then(([comment]) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  const conditions = {};
  if (comment_id) conditions['comments.comment_id'] = comment_id;
  removeComment(conditions)
    .then(() => {
      res.status(204).send({});
    })
    .catch(next);
};
