const articlesRouter = require('express').Router();
const {
  getArticles,
} = require('../controller/topics');

articlesRouter.route('/');


module.exports = articlesRouter;
