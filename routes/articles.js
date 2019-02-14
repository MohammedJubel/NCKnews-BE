const articlesRouter = require('express').Router();
const {
  sendArticles, addArticle, sendArticleById, sendPatchArticle,
} = require('../controller/articles');

articlesRouter
  .route('/')
  .get(sendArticles)
  .post(addArticle);

articlesRouter
  .route('/:article_id')
  .get(sendArticleById)
  .patch(sendPatchArticle);
// .delete(deleteArticleById)
// .all(handle405);


module.exports = articlesRouter;
