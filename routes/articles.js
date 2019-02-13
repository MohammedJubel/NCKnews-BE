const articlesRouter = require('express').Router();
const {
  getArticles, addArticle,
} = require('../controller/articles');

articlesRouter.route('/').get(getArticles).post(addArticle);


module.exports = articlesRouter;
