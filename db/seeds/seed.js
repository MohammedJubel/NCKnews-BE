const {
  articleData, commentData, topicData, userData,
} = require('../data');


exports.seed = (knex, Promise) => knex.migrate
  .rollback()
  .then(() => knex.migrate.latest())
  .then(() => knex.insert(topicData).into('topics'))
  .then(() => knex('users').insert(userData));
