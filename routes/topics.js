const topicsRouter = require('express').Router();
const {
  getTopics, addTopics,
} = require('../controller/topics');
const { handle405 } = require('../errors');


topicsRouter.route('/')
  .get(getTopics)
  .post(addTopics)
  .all(handle405);


module.exports = topicsRouter;
