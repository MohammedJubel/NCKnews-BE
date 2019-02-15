const usersRouter = require('express').Router();
const { sendUsers, sendUser, fetchUserByUsername } = require('../controller/users');

usersRouter.route('/')
  .get(sendUsers)
  .post(sendUser);

module.exports = usersRouter;
