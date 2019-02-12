const topicsRouter = require('express').Router();
const {
  getTopics, addTopics,
} = require('../controller/topics');

topicsRouter.route('/').get(getTopics).post(addTopics);


module.exports = topicsRouter;
