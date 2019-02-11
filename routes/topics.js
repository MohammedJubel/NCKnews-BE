const topicsRouter = require('express').Router();
const {
  getTopics,
} = require('../controller/topics');

topicsRouter.route('/').get(getTopics);


module.exports = topicsRouter;
