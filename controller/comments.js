const {
  getCommentsByArticleId, getCommentByArticleId,
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
      // console.log(comments, '<---comments');
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

// exports.sendArticle = (req, res, next) => {
//   const newArticle = req.body;

//   insertArticle(newArticle)
//     .then(([article]) => {
//       res.status(201).send({ article });
//     })
//     .catch(err => console.log(err) || next(err));
// };


// exports.sendArticle = (req, res, next) => {
//   const newArticle = req.body;

//   getCommentByArticleId(newArticle)
//     .then(([article]) => {
//       res.status(201).send({ article });
//     })
//     .catch(err => console.log(err) || next(err));
// };
