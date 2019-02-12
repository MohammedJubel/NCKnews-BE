const articlesRouter = require('express').Router();
const {
  getArticles,
} = require('../controller/articles');

articlesRouter.route('/').get(getArticles);


module.exports = articlesRouter;
