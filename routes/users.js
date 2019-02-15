const usersRouter = require('express').Router();
const { sendUsers, postUser, fetchUserByUsername } = require('../controller/users');

usersRouter.route('/')
  .get(sendUsers);


module.exports = usersRouter;
