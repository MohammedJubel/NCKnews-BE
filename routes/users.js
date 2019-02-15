const usersRouter = require('express').Router();
const { sendUsers, sendUser, sendUserByUsername } = require('../controller/users');

usersRouter.route('/')
  .get(sendUsers)
  .post(sendUser);

usersRouter.route('/:username')
  .get(sendUserByUsername);

module.exports = usersRouter;
