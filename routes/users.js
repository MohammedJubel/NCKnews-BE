const usersRouter = require('express').Router();
const { sendUsers, sendUser, sendUserByUsername } = require('../controller/users');
const { handle405 } = require('../errors');

usersRouter.route('/')
  .get(sendUsers)
  .post(sendUser)
  .all(handle405);


usersRouter.route('/:username')
  .get(sendUserByUsername)
  .all(handle405);

module.exports = usersRouter;
