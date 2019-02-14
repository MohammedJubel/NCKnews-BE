const articlesRouter = require('express').Router();
const {
  sendArticles, sendArticle, sendArticleById, sendPatchArticle, deleteArticleById,
} = require('../controller/articles');

articlesRouter
  .route('/')
  .get(sendArticles)
  .post(sendArticle);

articlesRouter
  .route('/:article_id')
  .get(sendArticleById)
  .patch(sendPatchArticle)
  .delete(deleteArticleById);
// .all(handle405);


module.exports = articlesRouter;
