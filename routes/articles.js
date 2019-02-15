const articlesRouter = require('express').Router();
const {
  sendArticles, sendArticle, sendArticleById, sendPatchArticle, deleteArticleById,
} = require('../controller/articles');
const {
  sendCommentsById, sendNewCommentById,
} = require('../controller/comments');


articlesRouter
  .route('/')
  .get(sendArticles)
  .post(sendArticle);
// .all(handle405);

articlesRouter
  .route('/:article_id')
  .get(sendArticleById)
  .patch(sendPatchArticle)
  .delete(deleteArticleById);


articlesRouter
  .route('/:article_id/comments')
  .get(sendCommentsById)
  .post(sendNewCommentById);

module.exports = articlesRouter;
