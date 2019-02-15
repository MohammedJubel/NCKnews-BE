const { getUsers, insertUser, getUserByUsername } = require('../models/users');

exports.sendUsers = (req, res, next) => {
  getUsers()
    .then(users => res.status(200).send({ users }))
    .catch(next);
};

exports.sendUser = (req, res, next) => {
  insertUser(req.body)
    .then(([user]) => res.status(201).send({ user }))
    .catch(next);
};

exports.sendUserByUsername = (req, res, next) => {
  const { username } = req.params;
  const conditions = {};
  if (username) conditions['users.username'] = username;
  getUserByUsername(conditions)
    .then(([user]) => {
      res.status(200).send({ user });
    })
    .catch(next);
};
