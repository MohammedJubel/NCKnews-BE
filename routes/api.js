const apiRouter = require('express').Router();
const topicsRouter = require('./topics');
const articlesRouter = require('./articles');
const commentsRouter = require('./comments');
const usersRouter = require('./users');
const endPointsObj = require('../models/endpoints');
const { handle405 } = require('../errors');

const getEndPoints = (req, res, next) => {
  res.status(200).send(endPointsObj);
};

apiRouter.route('/')
  .get(getEndPoints)
  .all(handle405);


apiRouter.use('/topics', topicsRouter);

apiRouter.use('/articles', articlesRouter);

apiRouter.use('/comments', commentsRouter);

apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
