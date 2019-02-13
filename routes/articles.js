const articlesRouter = require('express').Router();
const {
  sendArticles, addArticle, sendArticleById,
} = require('../controller/articles');

articlesRouter
  .route('/')
  .get(sendArticles)
  .post(addArticle);

articlesRouter
  .route('/:article_id')
  .get(sendArticleById);
// .patch(patchArticleVotes);
// .delete(deleteArticleById)
// .all(handle405);


module.exports = articlesRouter;
